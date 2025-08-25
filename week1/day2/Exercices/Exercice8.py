
data = [
    {"question": "What is Baby Yoda's real name?", "answer": "Grogu"},
    {"question": "Where did Obi-Wan take Luke after his birth?", "answer": "Tatooine"},
    {"question": "What year did the first Star Wars movie come out?", "answer": "1977"},
    {"question": "Who built C-3PO?", "answer": "Anakin Skywalker"},
    {"question": "Anakin Skywalker grew up to be who?", "answer": "Darth Vader"},
    {"question": "What species is Chewbacca?", "answer": "Wookiee"}
]

def play_quiz():
    correct = 0
    wrong = 0
    wrong_answers = []  

    for item in data:
        user_answer = input(item["question"] + " ")  
        if user_answer.strip().lower() == item["answer"].lower():  
            print(" Correct!\n")
            correct += 1
        else:
            print("Wrong!\n")
            wrong += 1
            wrong_answers.append({
                "question": item["question"],
                "your_answer": user_answer,
                "correct_answer": item["answer"]
            })

    show_results(correct, wrong, wrong_answers)


def show_results(correct, wrong, wrong_answers):
    print(f"\nResults: {correct} correct, {wrong} wrong.")

    if wrong > 0:
        print("\nHere are the ones you missed:")
        for item in wrong_answers:
            print(f"- Q: {item['question']}")
            print(f"  Your answer: {item['your_answer']}")
            print(f"  Correct answer: {item['correct_answer']}\n")

    if wrong > 3:
        play_again = input("You got more than 3 wrong. Do you want to play again? (yes/no): ")
        if play_again.lower() == "yes":
            play_quiz()   


play_quiz()
