from flask import Flask, render_template, request, redirect, url_for, flash
import psycopg2
import os

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'dev_secret')

# Database connection
def connect_to_db():
    return psycopg2.connect(
        host="localhost",
        database="restaurant_db",  
        user="postgres",            
        password="*"    
    )

@app.route("/")
def home():
    return redirect(url_for("menu"))

# Show all items
@app.route("/menu")
def menu():
    conn = connect_to_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Menu_Items ORDER BY item_id ASC;")
    items = cur.fetchall()
    cur.close()
    conn.close()
    return render_template("menu.html", items=items)

# Add item
@app.route("/add", methods=["GET", "POST"])
def add_item():
    if request.method == "POST":
        name = request.form["name"]
        price = request.form["price"]

        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s);", (name, price))
        conn.commit()
        cur.close()
        conn.close()
        flash("✅ Item added successfully!", "success")
        return redirect(url_for("menu"))

    return render_template("add_item.html")

# Delete item
@app.route("/delete/<int:item_id>")
def delete_item(item_id):
    conn = connect_to_db()
    cur = conn.cursor()
    cur.execute("DELETE FROM Menu_Items WHERE item_id = %s;", (item_id,))
    conn.commit()
    cur.close()
    conn.close()
    flash("🗑 Item deleted successfully!", "danger")
    return redirect(url_for("menu"))

# Update item
@app.route("/update/<int:item_id>", methods=["GET", "POST"])
def update_item(item_id):
    conn = connect_to_db()
    cur = conn.cursor()

    if request.method == "POST":
        name = request.form["name"]
        price = request.form["price"]
        cur.execute(
            "UPDATE Menu_Items SET item_name = %s, item_price = %s WHERE item_id = %s;",
            (name, price, item_id)
        )
        conn.commit()
        cur.close()
        conn.close()
        flash("✏️ Item updated successfully!", "info")
        return redirect(url_for("menu"))

    cur.execute("SELECT * FROM Menu_Items WHERE item_id = %s;", (item_id,))
    item = cur.fetchone()
    cur.close()
    conn.close()
    return render_template("update_item.html", item=item)

if __name__ == "__main__":
    app.run(debug=True)
