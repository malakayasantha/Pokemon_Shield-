from flask import Flask, jsonify, request
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import numpy as np
import io

app = Flask(__name__)
CORS(app)

model_path = 'D:/server/models/Authentic_Model.h5'
model = tf.keras.models.load_model(model_path)

@app.route('/api/classify', methods=['POST'])
def classify_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        image = Image.open(file.stream).convert("RGB")
        image = image.resize((224, 224))
        image_array = np.array(image)
        image_array = np.expand_dims(image_array, axis=0)
        image_array = tf.keras.applications.resnet50.preprocess_input(image_array)

        predictions = model.predict(image_array)
        max_value = np.amax(predictions)
        class_index = int(np.argmax(predictions))  # Ensure conversion to native Python int
        confidence = float(max_value)  # Ensure conversion to native Python float

        if max_value > 0.7:
            return jsonify({"class_index": class_index, "confidence": confidence})
        else:
            return jsonify({"error": "Confidence below threshold", "max_value": confidence})

if __name__ == "__main__":
    app.run(debug=True, port=8080)
