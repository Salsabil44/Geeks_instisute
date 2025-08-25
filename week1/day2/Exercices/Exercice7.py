import random

def get_random_temp(season):
    if season == "winter":
        return random.ranwidint(-10, 16)
    elif season == "spring":
        return random.randint(5, 23)
    elif season == "summer":
        return random.randint(24, 40)
    elif season == "autumn":
        return random.randint(10, 20)
    else:
        return random.randint(-10, 40)

def main():
    season = input("Enter a season : ")
    temp = get_random_temp(season)  
    print(f"The temperature right now is {temp}°C.")

    if temp < 0:
        print("Brrr, that’s freezing! Wear some extra layers today.")
    elif 0 <= temp <= 16:
        print("Quite chilly! Don’t forget your coat.")
    elif 17 <= temp <= 23:
        print("Nice weather, perfect for a walk.")
    elif 24 <= temp <= 32:
        print("Pretty hot outside.")
    else:
        print("Extremely hot! Don’t forget to drink water.")


main()
