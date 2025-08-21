sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich","Pastrami sandwich", "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]
while "Pastrami sandwich" in sandwich_orders:
    sandwich_orders.remove("Pastrami sandwich")
finished_sandwiches = []
while sandwich_orders:
    sandwich = sandwich_orders.pop()       
    finished_sandwiches.append(sandwich)   
    print("I made your", sandwich)         
print("\n The sandwiches i made:")
for sandwich in finished_sandwiches:
    print(sandwich)
