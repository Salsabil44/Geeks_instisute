from database import get_connection
from menu_item import MenuItem
from menu_manager import MenuManager

conn = get_connection()

pizza = MenuItem("Pizza", 70)
pizza.save(conn)
print("Added item:", pizza.name)

pizza.price = 80
pizza.update(conn)
print("Updated price:", pizza.price)

found_item = MenuManager.get_by_name(conn, "Pizza")
if found_item:
    print("Found item:", found_item.name, found_item.price)
else:
    print("Item not found")

all_items = MenuManager.all_items(conn)
print("All items:")
for item in all_items:
    print(f"{item.name} - {item.price}")

pizza.delete(conn)
print("Deleted item:", pizza.name)

conn.close()