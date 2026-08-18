import psycopg2

try:
    connection = psycopg2.connect(
        host="localhost",
        database="textile_waste_db",
        user="postgres",
        password="tdw@1973",
        port="5432"
    )

    print("✅ Database Connected Successfully!")

    connection.close()

except Exception as error:
    print("❌ Connection Failed")
    print(error)