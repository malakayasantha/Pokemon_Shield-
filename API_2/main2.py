
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import requests
import io

app = Flask(__name__)  # Initialize Flask app and enable CORS for cross-domain requests
CORS(app)

model_path = 'D:/Server_2/models/Cla_model.h5'
model = tf.keras.models.load_model(model_path)

labels = ['Golbat', 'Beedrill', 'Caterpie', 'Clefable', 'Raichu', 'Sandslash', 'Metapod', 'Drowzee', 'Oddish', 'Charizard', 'Tauros', 'Ponyta', 'Primeape', 'Spearow', 'Mankey', 'Poliwag', 'Krabby', 'Rattata', 'Tentacruel', 'Graveler', 'Koffing', 'Zapdos', 'Articuno', 'Psyduck', 'Bellsprout', 'Lapras', 'Butterfree', 'Weezing', 'Abra', 'Muk', 'Cloyster', 'Porygon', 'Flareon', 'Jigglypuff', 'Raticate', 'Venusaur', 'Dewgong', 'Horsea', 'Rhydon', 'Omanyte', 'Exeggcute', 'Kabuto', 'Ditto', 'Growlithe', 'Mew', 'Electrode', 'Vileplume', 'Seaking', 'Exeggutor', 'Electabuzz', 'Chansey', 'Magmar', 'Haunter', 'Ninetales', 'Clefairy', 'Gyarados', 'Tangela', 'Marowak', 'Snorlax', 'Nidoqueen', 'Alolan Sandslash', 'Hitmonchan', 'Ekans', 'Sandshrew', 'Jolteon', 'Kabutops', 'Lickitung', 'Pidgeotto', 'Shellder', 'Slowpoke', 'Pikachu', 'Poliwrath', 'Fearow', 'Magnemite', 'Hitmonlee', 'Machoke', 'Poliwhirl', 'Magneton', 'Diglett', 'Venonat', 'Kakuna', 'Eevee', 'Ivysaur', 'Doduo', 'Wigglytuff', 'Goldeen', 'Alakazam', 'Starmie', 'Grimer', 'Pinsir', 'Tentacool', 'Mewtwo', 'Dodrio', 'Kangaskhan', 'Arcanine', 'Dratini', 'Aerodactyl', 'Gastly', 'Geodude', 'Magikarp', 'Zubat', 'Paras', 'Machamp', 'Victreebel', 'Wartortle', 'Omastar', 'Meowth', 'Nidorina', 'Bulbasaur', 'Farfetchd', 'Rapidash', 'Seel', 'Blastoise', 'Venomoth', 'Hypno', 'Golduck', 'Nidoking', 'Vaporeon', 'Dragonite', 'Onix', 'Pidgeot', 'Machop', 'Moltres', 'Scyther', 'MrMime', 'Cubone', 'Gengar', 'Kingler', 'Dugtrio', 'Gloom', 'Parasect', 'Persian', 'Golem', 'Seadra', 'Squirtle', 'Nidorino', 'Charmander', 'Jynx', 'Dragonair', 'Arbok', 'Weedle', 'Pidgey', 'Kadabra', 'Rhyhorn', 'Weepinbell', 'Charmeleon', 'Staryu', 'Voltorb', 'Slowbro', 'Vulpix']


@app.route('/api/predict', methods=['POST']) # Define a route for prediction API
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    img = Image.open(file.stream).convert("RGB")
    img = img.resize((150, 150))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    pred = model.predict(img_array)
    label_index = np.argmax(pred, axis=1)[0] # Get the index of the highest confidence class
    predicted_label = labels[label_index].lower()  # Map the index to the corresponding label
    confidence = float(np.max(pred))

# Fetch PokéAPI based on predicted label
    pokeapi_response = requests.get(f'https://pokeapi.co/api/v2/pokemon/{predicted_label}')
    if pokeapi_response.status_code == 200:
        pokemon_info = pokeapi_response.json()
        return jsonify({
            "predicted_label": predicted_label,
            "confidence": confidence,
            "name": pokemon_info['name'],
            "base_experience": pokemon_info['base_experience'],
            "height": pokemon_info['height'],
            "weight": pokemon_info['weight']
        })
    else:
        return jsonify({"error": "Failed to fetch data from PokéAPI"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=7070)