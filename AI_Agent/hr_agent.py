import json
import re
from datetime import datetime
from pathlib import Path
from collections import Counter

DATA_DIR = Path("data")
CAND_FILE = DATA_DIR / "candidates.json"
jobs_FILE = DATA_DIR / "positions.json"  # changed file name to avoid invalid name
SHORT_FILE = DATA_DIR / "shortlists.json"

# ---------- helpers ----------
def load_json(path):
    if not path.exists():
        return []
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def parse_date(s):
    return datetime.strptime(s, "%Y-%m-%d").date()

# ---------- parse_query ----------
def parse_query(text):
    t = text.lower()
    skill_set = []
    for s in ["React","JS","JavaScript","Python","SQL","Vue","Angular","Git","HTML","CSS","TS","TypeScript"]:
        if re.search(r"\b" + re.escape(s.lower()) + r"\b", t):
            skill_set.append(s)

    location = None
    for city in ["casablanca","rabat","marrakech","fes"]:
        if city in t:
            location = city.capitalize()
            break

    minExp = None
    maxExp = None
    m_exp = re.search(r"(\d+)\s*[-–to]+\s*(\d+)", t)
    if m_exp:
        minExp = int(m_exp.group(1))
        maxExp = int(m_exp.group(2))

    topN = 5
    m_top = re.search(r"find\s+(\d+)", t)
    if m_top:
        topN = int(m_top.group(1))

    return {
        "skills": skill_set,
        "location": location,
        "minExp": minExp,
        "maxExp": maxExp,
        "topN": topN
    }

# ---------- scoring ----------
def score_candidate(candidate, filters):
    score = 0
    reasons = []
    req_skills = filters.get("skills", [])
    skill_matches = 0
    for s in req_skills:
        if s.lower() in [cs.lower() for cs in candidate.get("skills", [])]:
            skill_matches += 1
    score += 2 * skill_matches
    if skill_matches:
        reasons.append(f"{'+'.join(req_skills)} match (+{2*skill_matches})")
    if filters.get("location") and candidate.get("location","").lower() == filters["location"].lower():
        score += 1
        reasons.append(f"{candidate['location']} (+1)")
    minExp = filters.get("minExp")
    maxExp = filters.get("maxExp")
    if minExp is not None and maxExp is not None:
        exp = candidate.get("experienceYears", 0)
        if minExp <= exp <= maxExp:
            score += 1
            reasons.append(f"{exp}y fits (+1)")
    return score, " , ".join(reasons)

# ---------- search ----------
def search_candidates(filters, candidates):
    scored = []
    for idx, c in enumerate(candidates, start=1):
        sc, reason = score_candidate(c, filters)
        scored.append({"index": idx, "candidate": c, "score": sc, "reason": reason if reason else "no matches"})
    scored_sorted = sorted(scored, key=lambda x: x["score"], reverse=True)
    topN = filters.get("topN", 5)
    return scored_sorted[:topN]

# ---------- shortlists ----------
def load_shortlists():
    return load_json(SHORT_FILE)

def save_shortlist(name, indices, candidates):
    shortlists = load_shortlists()
    sel = [candidates[i-1] for i in indices if 1 <= i <= len(candidates)]
    entry = {"name": name, "createdAt": datetime.now().isoformat(), "candidates": sel}
    shortlists.append(entry)
    save_json(SHORT_FILE, shortlists)
    return True

# ---------- email drafting ----------
def draft_email(recipient, job_title, closing="Best regards,\nRecruitment Team"):
    subject = f"{job_title} Interview Invitation"
    intro = f"Dear {recipient.get('firstName','')},"
    text = f"""{intro}

We are pleased to inform you that you have been shortlisted for an interview for the {job_title} position.

Please let us know your availability for a 30-minute interview this week.

{closing}
"""
    return {"subject": subject, "text": text, "to": recipient["email"]}

def html_template(email_obj):
    subject = email_obj["subject"]
    text = email_obj["text"].replace("\n", "<br>")
    return f"""<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>{subject}</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height:1.4;">
    <div style="max-width:600px; padding:16px; border:1px solid #ddd; border-radius:8px;">
      <h2 style="margin-top:0;">{subject}</h2>
      <div>{text}</div>
    </div>
  </body>
</html>"""

# ---------- analytics ----------
def analytics_summary(candidates):
    countByStage = Counter([c.get("stage","UNKNOWN") for c in candidates])
    skills = Counter()
    for c in candidates:
        for s in c.get("skills", []):
            skills[s] += 1
    topSkills = skills.most_common(3)
    return {"countByStage": dict(countByStage), "topSkills": topSkills}

# ---------- CLI ----------
def print_candidate_short(cobj):
    c = cobj["candidate"]
    print(f"#{cobj['index']:02d} {c['firstName']} {c['lastName']} — {c['email']} — {c['location']} — {c['experienceYears']}y — score {cobj['score']} — {cobj['reason']}")

def main_loop():
    DATA_DIR.mkdir(exist_ok=True)
    candidates = load_json(CAND_FILE)
    positions = load_json(jobs_FILE)

    print("Assistant: Hello! How can I help you?")
    print("""
Available commands:
- Find candidates (e.g., 'I want React developers in Casablanca')
- Choose candidates to a shortlist (e.g., 'choose 1 3 as FE-Intern-A')
- Show a shortlist or all shortlists (e.g., 'show FE-Intern-A' or 'show all')
- Send emails to candidates (e.g., 'send email using Frontend Intern from FE-Intern-A')
- View analytics (e.g., 'analytics')
- Exit
""")

    last_search = []

    while True:
        cmd = input("\n> ").strip()
        if not cmd:
            continue
        low = cmd.lower()

        # Show help
        if low == "help":
            print("""
Available commands:
- Find candidates (e.g., 'I want React developers in Casablanca')
- Choose candidates to a shortlist (e.g., 'choose 1 3 as FE-Intern-A')
- Show a shortlist or all shortlists (e.g., 'show FE-Intern-A' or 'show all')
- Send emails to candidates (e.g., 'send email using Frontend Intern from FE-Intern-A')
- View analytics (e.g., 'analytics')
- Exit
""")
            continue

        # Search candidates
        if "want" in low or "find" in low:
            filters = parse_query(cmd)
            results = search_candidates(filters, candidates)
            last_search = results
            print(f"Found top {len(results)} results:")
            for r in results:
                print_candidate_short(r)

        # Choose candidates
        elif low.startswith("choose"):
            m = re.search(r"choose\s+([\d\s]+)\s+as\s+(.+)", cmd, re.I)
            if not m:
                print("Try: choose 1 3 as MyList")
                continue
            idxs = [int(x) for x in m.group(1).split()]
            name = m.group(2).strip()
            save_shortlist(name, idxs, [r["candidate"] for r in last_search])
            print(f"Shortlist '{name}' saved with {len(idxs)} candidates.")

        # Show shortlist or all shortlists
        elif low.startswith("show"):
            name = cmd.replace("show", "").strip()
            shortlists = load_shortlists()

            if name.lower() in ["shortlists", "all"]:
                if not shortlists:
                    print("No shortlists found.")
                    continue
                for s in shortlists:
                    print(f"\nShortlist: {s['name']} (created: {s['createdAt']})")
                    for idx, c in enumerate(s["candidates"], start=1):
                        print(f"  #{idx} {c['firstName']} {c['lastName']} — {c['email']} — {c['location']} — {c['experienceYears']}y")
                continue

            # show specific shortlist
            matches = [s for s in shortlists if s["name"].lower() == name.lower()]
            if not matches:
                print("Shortlist not found.")
                continue
            print(f"Candidates in '{name}':")
            for idx, c in enumerate(matches[0]["candidates"], start=1):
                print(f"#{idx} {c['firstName']} {c['lastName']} — {c['email']} — {c['location']} — {c['experienceYears']}y")

        # Send email individually
        elif "send email" in low:
            m_job = re.search(r"using\s+(.+?)(?:\s+from\s+(.+))?$", cmd, re.I)
            job_title = m_job.group(1).strip() if m_job else "Job"
            sl_name = m_job.group(2).strip() if m_job and m_job.group(2) else None
            shortlists = load_shortlists()
            if not shortlists:
                print("No shortlists found to send email.")
                continue
            # Pick shortlist
            if sl_name:
                matches = [s for s in shortlists if s["name"].lower() == sl_name.lower()]
                if not matches:
                    print(f"Shortlist '{sl_name}' not found.")
                    continue
                recipients = matches[0]["candidates"]
                sl_name = matches[0]["name"]
            else:
                recipients = shortlists[-1]["candidates"]
                sl_name = shortlists[-1]["name"]

            print(f"\nSending individual emails for shortlist '{sl_name}':")
            for person in recipients:
                email_obj = draft_email(person, job_title)
                print("\n--- SUBJECT ---")
                print(email_obj["subject"])
                print("\n--- TO ---")
                print(email_obj["to"])
                print("\n--- PLAINTEXT ---")
                print(email_obj["text"])
                print("\n--- HTML PREVIEW ---")
                print(html_template(email_obj))
                print("-"*40)

        # Analytics
        elif "analytics" in low:
            summary = analytics_summary(candidates)
            print("Pipeline by stage:")
            for k,v in summary["countByStage"].items():
                print(f"  {k} = {v}")
            print("Top skills:")
            for s,cnt in summary["topSkills"]:
                print(f"  {s} ({cnt})")

        elif low in ["exit","quit"]:
            print("Bye!")
            break

        else:
            print("I didn't understand that. You can search, choose, show shortlist, send email, or analytics. Type 'help' for guidance.")

if __name__ == "__main__":
    main_loop()
