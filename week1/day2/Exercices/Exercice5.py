import random
def gues_num(user_num) :
    random_num = random.randint(1, 100)
    if user_num == random_num:
        print("Success! Both numbers are the same!")
    else:
        print(f" Fail! You chose {user_num}, but the computer chose {random_num}.")

gues_num(30)