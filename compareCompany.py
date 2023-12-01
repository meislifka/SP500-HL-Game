import json

# Read data from the stocks.json file
with open("stocks.json", "r") as file:
    stocks_data = json.load(file)

# Read stock names from stockNames.txt
with open("stockNames.txt", "r") as names_file:
    stock_names = names_file.readlines()

# Extracting the "name" field for each stock symbol
for symbol, data in stocks_data.items():
    stock_name = data.get("name")

    # Comparing extracted name with names in stockNames.txt
    for line in stock_names:
        line = line.strip()  # Remove any trailing newline characters
        if stock_name == line:
            print(f"Match found for '{stock_name}' in stockNames.txt")
            break
    else:
        print(f"No match found for '{stock_name}' in stockNames.txt")
