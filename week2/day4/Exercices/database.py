import psycopg2

def get_connection():
    return psycopg2.connect(
        dbname="restaurant_db",
        user="postgres",        
        password="*",
        host="localhost",
        port="5432"
    )
