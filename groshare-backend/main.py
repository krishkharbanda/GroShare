from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase_admin import credentials, initialize_app, firestore
import googlemaps
import openai
import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

cred = credentials.Certificate("firebase/credentials.json")
initialize_app(cred)
db = firestore.client()

gmaps = googlemaps.Client(key='AIzaSyBPWZE-X9GVVvpv38dA9JSlsMvzwrmzCUc')
openai.api_key = "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"


def calculate_discount(original_price, expiry_date):
    days_left = (expiry_date - datetime.date.today()).days
    if days_left <= 1:
        return round(original_price * 0.5, 2)
    elif days_left <= 3:
        return round(original_price * 0.7, 2)
    else:
        return round(original_price * 0.9, 2)


@app.route('/add_donation', methods=['POST'])
def add_donation():
    data = request.json
    data['discounted_price'] = calculate_discount(data['original_price'], datetime.datetime.strptime(data['expiry_date'], "%Y-%m-%d").date())
    db.collection('donations').add(data)
    return jsonify({"message": "Donation added successfully!"}), 200


@app.route('/get_donations', methods=['GET'])
def get_donations():
    donations = db.collection('donations').stream()
    result = [{**doc.to_dict(), "id": doc.id} for doc in donations]
    print(result)
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


if __name__ == '__main__':
    app.run(debug=True)
