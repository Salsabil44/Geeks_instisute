class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

cat1 = Cat("leo", 5)
cat2 = Cat("gold", 4)
cat3 = Cat("rex", 2)

def Oldest_cat_finder(Cats):
    oldest = Cats[0]
    for cat in Cats:
        if cat.age > oldest.age:
            oldest = cat
    return oldest

cats = [cat1, cat2, cat3]
oldest_cat = Oldest_cat_finder(cats)

print(f"The oldest cat is {oldest_cat.name} and is {oldest_cat.age} years old.")