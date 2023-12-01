import subprocess

# Run StockNames.py
subprocess.run(["python", "StockNames.py"])

print("Finished StockNames.py")

# Run after StockNames.py finishes
subprocess.run(["python", "imagescraper.py"])

print("Finished StockNames.py")

# Run after imagescraper.py finishes
subprocess.run(["python", "webscraper.py"])
print("Finished webscraper.py")
