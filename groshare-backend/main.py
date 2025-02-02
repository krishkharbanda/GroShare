from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase_admin import credentials, initialize_app, firestore
import googlemaps
from openai import OpenAI
import json
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

cred = credentials.Certificate("firebase/credentials.json")
initialize_app(cred)
db = firestore.client()

gmaps = googlemaps.Client(key='AIzaSyBPWZE-X9GVVvpv38dA9JSlsMvzwrmzCUc')
client = OpenAI(api_key="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")

@app.route('/add_donation', methods=['POST'])
def add_donation():
    data = request.json
    db.collection('donations').add(data)
    return jsonify({"message": "Donation added successfully!"}), 200


@app.route('/get_donations', methods=['GET'])
def get_donations():
    donations = db.collection('donations').stream()
    result = [{**doc.to_dict(), "id": doc.id} for doc in donations]
    return jsonify(result), 200


@app.route('/get_shelters', methods=['GET'])
def get_shelters():
    shelters = db.collection('shelters').stream()
    result = [{**doc.to_dict(), "id": doc.id} for doc in shelters]
    return jsonify(result), 200


@app.route('/match_donations', methods=['POST'])
def match_donations():
    donations = db.collection('donations').stream()
    shelters = db.collection('shelters').stream()
    matches = []

    for donation in donations:
        donation_data = donation.to_dict()
        best_shelter = None
        best_distance = float('inf')

        for shelter in shelters:
            shelter_data = shelter.to_dict()
            distance = \
            gmaps.distance_matrix(donation_data['location'], shelter_data['location'])["rows"][0]["elements"][0][
                "distance"]["value"]
            if distance < best_distance:
                best_distance = distance
                best_shelter = shelter_data

        if best_shelter:
            matches.append({"donation": donation_data, "shelter": best_shelter, "distance": best_distance})

    return jsonify(matches), 200


@app.route('/request_pickup', methods=['POST'])
def request_pickup():
    data = request.json
    db.collection('pickup_requests').add(data)
    return jsonify({"message": "Pickup request submitted!"}), 200


@app.route('/send_notifications', methods=['POST'])
def send_notifications():
    data = request.json
    return jsonify({"message": "Notification sent successfully!"}), 200


@app.route('/generate_recipe', methods=['POST'])

@app.route('/generate_recipe', methods=['POST'])
def generate_recipe():
    data = request.json
    ingredients = ", ".join([ingredient['name'] for ingredient in data.get('ingredients', [])])
    servings = data.get('servings', 4)
    dietary_preference = data.get('dietaryPreference', 'any')

    prompt = f"""
    Generate a structured recipe in JSON format using the following discounted ingredients: {ingredients}.
    The recipe should serve {servings} people and adhere to a {dietary_preference} diet if applicable.

    Format the JSON as follows:
    {{
        "name": "Recipe Name",
        "cookingTime": "Cooking time in minutes",
        "difficulty": "Difficulty level",
        "ingredients": [
            {{"name": "ingredient name", "quantity": "amount"}}
        ],
        "instructions": [
            "Step 1",
            "Step 2",
            "Step 3"
        ],
        "nutritionInfo": {{
            "calories": "xx kcal",
            "protein": "xx g",
            "carbs": "xx g",
            "fat": "xx g"
        }}
    }}
    
    DO NOT OUTPUT ANYTHING OTHER THAN THE JSON!
    """

    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a professional chef."},
            {"role": "user","content": prompt,}
        ],
        model="gpt-4o",
    )

    recipe_text = chat_completion.choices[0].message.content.strip()

    cleaned_json_text = re.sub(r"```json|```", "", recipe_text).strip()

    recipe_json = json.loads(cleaned_json_text)
    print(recipe_json)

    return jsonify(recipe_json), 200


if __name__ == '__main__':
    app.run(debug=True)
