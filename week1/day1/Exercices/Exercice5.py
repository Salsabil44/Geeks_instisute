my_fav_numbers = {1, 3, 7}
my_fav_numbers.add(4)
my_fav_numbers.add(5)
my_fav_numbers.remove(5)
my_fav_numbers.remove(7)
friend_fav_numbers = {18, 9, 8}
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)
print(our_fav_numbers)