# Open the file in write mode
with open("nums.txt", "w") as file:
    # Loop through numbers from 1 to 500
    for num in range(1, 501):
        # Write each number followed by a newline character to the file
        file.write(str(num) + "\n")
