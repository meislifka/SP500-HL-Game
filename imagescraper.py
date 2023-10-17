import requests
from bs4 import BeautifulSoup


with open("stockNames.txt", "r") as in_file:
    stock_names = in_file.readlines()
count = 1
file_name = "image_urls.txt"
with open(file_name, "w") as file:
    for name in stock_names:
        # Replace 'your search query' with the query you want to search for
        query = name

        # Send an HTTP GET request to Google Images
        url = f"https://www.google.com/search?q={query}&tbm=isch"
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            # Parse the HTML content with BeautifulSoup
            soup = BeautifulSoup(response.content, "html.parser")

            # Extract image URLs
            image_urls = []
            for img in soup.find_all("img"):
                src = img.get("src")
                if src:
                    image_urls.append(src)

            file.write(image_urls[1] + "\n")
            print(count)
            count += 1
            # Save image URLs to a text file
        else:
            print(f"Error: HTTP status code {response.status_code}")

    print(f"Image URLs saved to {file_name}")
