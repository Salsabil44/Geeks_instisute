import random
class Game :
    def __init__(self, items):
        self.items = ["rock", "paper", "scissors"]
    def get_user_item(self):
        while True:
            user_item = input("Select rock, paper, scissors: ").lower()
            if user_item in self.items:
                return user_item
            else:
                print("try again")

    def get_computer_item(self):
        computer_item = random.choice(self.items)
        return computer_item
    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item :
            return  "draw"
        elif(user_item == "rock" and computer_item == "scissors") or \
        (user_item == "paper" and computer_item == "rock") or \
            (user_item == "scissors" and computer_item == "paper"):
            return "win"
        else:
            return "loss"
    def play(self):
        user_item = self.get_user_item()         
        computer_item = self.get_computer_item()
        result = self.get_game_result(user_item, computer_item)

        if result == "draw":
              print(f"You selected: {user_item}. The computer selected {computer_item}. Result:draw")
        elif result == "win":
              print(f"You selected {user_item}. The computer selected {computer_item}. Result:win")
        else :
              print(f"You selected {user_item}. The computer selected {computer_item}. Result:loss")
        return result