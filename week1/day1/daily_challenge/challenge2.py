user_input = input("Enter a string: ")
final_string = ""
for char in user_input:
    if len(final_string) == 0 or char != final_string[-1]:
        final_string += char

print("Result:", final_string)