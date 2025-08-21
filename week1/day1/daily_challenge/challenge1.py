number = int(input("Enter a number :"))
length = int(input("Enter length :"))
result = []
for i in range(length):
    result.append(number * (i + 1))

print(result)