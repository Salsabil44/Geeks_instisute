from menu_item import MenuItem

class MenuManager:

    @classmethod
    def get_by_name(cls, conn, name):
        with conn.cursor() as cur:
            cur.execute(
                "SELECT item_id, item_name, item_price FROM Menu_Items WHERE item_name=%s",
                (name,)
            )
            row = cur.fetchone()
            if row:
                return MenuItem(name=row[1], price=row[2], item_id=row[0])
            return None

    @classmethod
    def all_items(cls, conn):
        with conn.cursor() as cur:
            cur.execute("SELECT item_id, item_name, item_price FROM Menu_Items")
            rows = cur.fetchall()
            return [MenuItem(name=row[1], price=row[2], item_id=row[0]) for row in rows]