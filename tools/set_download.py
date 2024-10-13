import requests
import json

# Step 1: Fetch the data from Scryfall API
response = requests.get("https://api.scryfall.com/sets")
sets_data = response.json()

# Step 2: Extract the relevant information (name and code) from each set
compact_sets = [{"name": set_info["name"], "short_name": set_info["code"]} for set_info in sets_data["data"]]

# Step 3: Save the JSON data to a file
output_path = "data/compact_sets.json"
with open(output_path, "w") as json_file:
    json.dump(compact_sets, json_file, indent=2)

# Output message indicating the file has been saved
print(f"JSON saved to {output_path}")
