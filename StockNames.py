import requests
from bs4 import BeautifulSoup
import json

# 1 symbol 2 name 3 price
# Define the URL of the website you want to scrape
url = "https://www.stockmonitor.com/sp500-stocks/"

# Send an HTTP GET request to the URL
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content of the page using BeautifulSoup
    soup = BeautifulSoup(response.text, "html.parser")

    # Find all the <tr> elements
    tr_elements = soup.find_all("tr")

    names_list = []
    for tr in tr_elements:
        td_elements = tr.find_all("td")
        if len(td_elements) >= 3:
            names_list.append(f"{td_elements[2].text.strip()}")
    output_file = "stockNames.txt"
    with open(output_file, "w") as out_file:
        for item in names_list:
            out_file.write(item + "\n")
