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
    outer_dict = {}
    fields = ("name", "price", "trend", "logoUrl")  # tuple - immutable
    # Extract and print the text from the second and third <td> tags under each <tr> tag
    url = ""

    f = open("image_urls.txt", "r")
    for tr in tr_elements:
        td_elements = tr.find_all("td")
        if len(td_elements) >= 3:  # Ensure there are at least 3 <td> tags
            name = f"{td_elements[2].text.strip()}"
            price = f"{td_elements[3].text.strip()}"
            trend_str = td_elements[0].text.strip().replace("\n", " ")
            trend = f"{trend_str}"
            inner_dict = {}

            inner_dict[fields[0]] = name
            inner_dict[fields[1]] = price
            inner_dict[fields[2]] = trend
            url = f.readline()
            url = url.strip()

            if "Brown & Brown" in name:
                print("name is brown")
                inner_dict[
                    fields[3]
                ] = "https://static.gurufocus.com/cdn-cgi/image/width=500,quality=75/logos/0C0000071H.png"
            elif "Marsh & McLennan" in name:
                print("name is marsh")
                inner_dict[
                    fields[3]
                ] = "https://cdn.phenompeople.com/CareerConnectResources/MAMCGLOBAL/social/mmc-og-logo-1632326576517.png"
            elif "Church" in name:
                print("name is church")
                inner_dict[
                    fields[3]
                ] = "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Church_%26_Dwight_logo.svg/1200px-Church_%26_Dwight_logo.svg.png"

            elif "M&T" in name:
                print("name is M&T")
                inner_dict[
                    fields[3]
                ] = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/M%26T_Bank_wordmark.svg/2560px-M%26T_Bank_wordmark.svg.png"
            else:
                inner_dict[fields[3]] = url

            outer_dict[f"{td_elements[1].text.strip()}"] = inner_dict
    # print(outer_dict)

    # Specify the output JSON file path
    output_file_path = "stocks.json"

    # Save the JSON data to the output file
    with open(output_file_path, "w") as output_file:
        json.dump(outer_dict, output_file, indent=4)

    print(f"stocks JSON data has been saved to {output_file_path}")
    output_file.close()

    names_list = []
    for tr in tr_elements:
        td_elements = tr.find_all("td")
        if len(td_elements) >= 3:
            names_list.append(f"{td_elements[2].text.strip()}")
    output_file = "stockNames.txt"
    with open(output_file, "w") as out_file:
        for item in names_list:
            out_file.write(item + "\n")
