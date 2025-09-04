class MenuItem:
    def __init__(self, name, price=0, item_id=None):
        self.item_id = item_id
        self.name = name
        self.price = price

    def save(self, conn):
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s) RETURNING item_id",
                (self.name, self.price)
            )
            self.item_id = cur.fetchone()[0]
            conn.commit()

    def delete(self, conn):
        if self.item_id is None:
            return
        with conn.cursor() as cur:
            cur.execute("DELETE FROM Menu_Items WHERE item_id=%s", (self.item_id,))
            conn.commit()

    def update(self, conn):
        if self.item_id is None:
            return
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE Menu_Items SET item_name=%s, item_price=%s WHERE item_id=%s",
                (self.name, self.price, self.item_id)
            )
            conn.commit()
