
#Exercice 1:
class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())


class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'


class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'


class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'



class Siamese(Cat):
    def sing(self, sounds):
        return f'{sounds}'



all_cats = [
    Bengal("Luna", 3),
    Chartreux("Milo", 4),
    Siamese("Nala", 2)
]

sara_pets = Pets(all_cats)
sara_pets.walk()
#Exercice 2 :
class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return (self.weight / self.age) * 10

    def fight(self, other_dog):
        self_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight

        if self_power > other_power:
            return f"{self.name} won the fight against {other_dog.name}"
        elif self_power < other_power:
            return f"{other_dog.name} won the fight against {self.name}"
        else:
            return f"{self.name} and {other_dog.name} are equally strong!"
        #test
dog1 = Dog("Rex", 5, 20)
dog2 = Dog("Bella", 3, 15)
dog3 = Dog("Max", 4, 25)

print(dog1.bark())
print(dog2.bark())
print(dog3.bark())

print(f"{dog1.name}'s run speed: {dog1.run_speed()}")
print(f"{dog2.name}'s run speed: {dog2.run_speed()}")
print(f"{dog3.name}'s run speed: {dog3.run_speed()}")

print(dog1.fight(dog2))
print(dog2.fight(dog3))
print(dog1.fight(dog3))
#Exercice 3 :
import random

class PetDog(Dog):
    def __init__(self, name, age, weight, trained=False):
        super().__init__(name, age, weight)
        self.trained = trained

    def train(self):
        print(self.bark())   
        self.trained = True  

    def play(self, *dogs):
        dog_names = [dog.name for dog in dogs] + [self.name]
        print(f"{', '.join(dog_names)} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                f"{self.name} does a barrel roll",
                f"{self.name} stands on his"
                    ]
            #test
dog1 = PetDog("Rex", 5, 20)
dog2 = PetDog("Bella", 3, 15)
dog3 = PetDog("Max", 4, 25)

dog1.play(dog2, dog3)

dog1.train()
dog1.do_a_trick()
#Exercice 4:
class family:
   def __init__(self, members,last_name):
        self.members = members
        self.last_name = last_name
   def born(self, **child):
            self.members.append(child)
            return f"{child['name']} {self.last_name} is born congratulation "
   def is_18(self, name):
        for member in self.members:
            if member['name'] == name:
                return member['age'] >= 18
        return f"{name} not found in the family"
   def family_presentation(self):
        for member in self.members:
            print(f"{member['name']} {self.last_name}, {member['age']} years old")
object4 = family([{'name': 'John', 'age': 40}, {'name': 'Jane', 'age': 38}], 'Doe')
object4.born(name='Alice', age=0)
object4.family_presentation()
#Exercice 5:
class TheIncrediblesFamily(family):
    def __init__(self, members, last_name):
        super().__init__(members, last_name)
    def use_power(self,last_name):
        for member in self.members:
            if member['name'] == last_name:
                try:
                   super().use_power(last_name)
                except KeyError:
                    return f"Member {last_name} not found"
        return f"{last_name} is not a member of the family"
    def incredible_presentation(self):
        return f'Here is our powerful family: {super().family_presentation()}'
members_data = [
    {'name': 'Michael', 'age': 35, 'gender': 'Male', 'is_child': False,
     'power': 'fly', 'incredible_name': 'MikeFly'},
    {'name': 'Sarah', 'age': 32, 'gender': 'Female', 'is_child': False,
     'power': 'read minds', 'incredible_name': 'SuperWoman'}
]
incredibles_family = TheIncredibles("Incredibles", members_data)
incredibles_family.incredible_presentation()
incredibles_family.use_power("Michael")

incredibles_family.born(
    name='Baby Jack', age=1, gender='Male', is_child=True,
    power='Unknown Power', incredible_name='JackJack'
)