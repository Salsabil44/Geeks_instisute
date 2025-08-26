class Zoo:
    def __init__(self, zoo_name):
        self.name = zoo_name
        self.animals = []

    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)

    def get_animals(self):
        print("Animals in the zoo:", self.animals)

    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)

    def sort_animals(self):
        self.animals.sort()

    def get_groups(self):
        groups = {}
        for animal in self.animals:
            key = animal[0].upper()
            groups.setdefault(key, []).append(animal)

        # Convert single-item lists to strings
        for key in groups:
            if len(groups[key]) == 1:
                groups[key] = groups[key][0]

        print("Animal groups:", groups)



Zoo1 = Zoo("New York Zoo")
Zoo1.add_animal("Lion")
Zoo1.add_animal("Tiger")
Zoo1.add_animal("Lemur")
Zoo1.add_animal("Bear")
Zoo1.add_animal("Monkey")

Zoo1.sell_animal("Lion")
Zoo1.sort_animals()
Zoo1.get_animals()
Zoo1.get_groups()
