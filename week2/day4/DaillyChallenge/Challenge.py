import requests
import random


class Database:
    def __init__(self):
        self.data = []

    def insert(self, record):
        self.data.append(record)

    def all(self):
        return self.data


class CountryDatabase(Database):
    def __init__(self):
        super().__init__()

    def fetch_random_countries(self, count=10):
        url = "https://restcountries.com/v3.1/all?fields=name,capital,flags,subregion,population"
        response = requests.get(url)
        countries = response.json()

        selected = random.sample(countries, count)

        for c in selected:
            country_data = {
                "name": c["name"]["common"],
                "capital": c.get("capital", ["N/A"])[0] if c.get("capital") else "N/A",
                "flag": c["flags"]["png"] if "flags" in c else None,
                "subregion": c.get("subregion", "Unknown"),
                "population": c.get("population", 0)
            }
            self.insert(country_data)

        return f"{count} random countries added to the database!"

    def show_countries(self):
        return [f"{c['name']} - {c['capital']} - {c['subregion']} - {c['population']}" for c in self.data]


country_db = CountryDatabase()

print(country_db.fetch_random_countries())

print(country_db.show_countries())
