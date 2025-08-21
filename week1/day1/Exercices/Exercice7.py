basket = ["Banana", "Apples", "Oranges", "Blueberries"]
basket.remove("Banana")
basket.remove("Blueberries")
basket.insert(3,"Kiwi")
basket.insert(0,"Apples")    
print("Number of Apples:", basket.count("Apples"))
basket.clear()
print(basket)