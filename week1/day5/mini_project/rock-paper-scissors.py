from game import Game

def get_user_menu_choice():
    confirm = input(
        """
Menu:
(g) Play a new game
(x) Show scores and exit

Enter your choice: """
    ).lower()
    if confirm in ["g", "x"]:
        return confirm
    else:
        return "invalid"

def print_results(results):
    print("\nGame Results :\n")
    print(f"You win :{results.get('win', 0)}")
    print(f"You loss :{results.get('loss', 0)}")
    print(f"You draw :{results.get('draw', 0)}")
    print("Thank you for playing !")

def main():
    results = {"win": 0, "loss":0, "draw":0}

    while True:
        confirm = get_user_menu_choice()

        if confirm == "invalid":
            print("choose g or x.")
            continue

        if confirm == "g":
            game = Game(["rock", "paper", "scissors"])
            result = game.play()      
            results[result] += 1       
        elif confirm == "x":
            print_results(results)
            break

if __name__ == "__main__":
    main()