

import React, { useState, useRef, useCallback } from 'react';
import { Card, Button, Col } from 'react-bootstrap';

function Predict() {  // uploaded file, its preview, and the prediction result
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [prediction, setPrediction] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = useCallback((e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    }
  }, []);

  const handleSubmit = async (event) => {
    event.stopPropagation(); // Prevent triggering card's onClick
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    // Send the file to the server for prediction
    try {
      const response = await fetch('http://localhost:7070/api/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setPrediction(data);
      } else {
        console.error('Upload failed:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClear = (event) => {
    event.stopPropagation(); // Prevent triggering card's onClick
    setFile(null);
    setPreview('');
    setPrediction(null);
  };

  const triggerFileInput = () => { // Trigger the file input dialog
    fileInputRef.current.click();
  };

  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
    <p className="primary-subheading">Know me</p>
    <br />
    <Col md={6}>
        <Card style={{ backgroundColor: '#212529', color: 'white', width: '40rem', minHeight: '25rem', cursor: 'pointer' }} onClick={triggerFileInput}>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                {preview && <Card.Img variant="top" src={preview} style={{ maxHeight: '180px', objectFit: 'contain' }} />}
                {!preview && <div>Click here to upload an image</div>}
                <input type="file" onChange={handleFileChange} style={{ display: 'none' }} ref={fileInputRef} />
                <div className="button-group mt-2">
                    <Button onClick={handleSubmit} style={{ backgroundColor: 'orange', borderColor: 'orange' }}>Predict</Button>
                    <Button onClick={handleClear} style={{ backgroundColor: 'transparent', color: 'blue', borderColor: 'blue', marginLeft: '10px' }}>Clear</Button>
                </div>
                {/* Display prediction results directly below the buttons */}
                {prediction && (
                    <div className="prediction-results mt-3" style={{ textAlign: 'center' }}>
                        <strong>Name:</strong> {prediction.name}<br />
                        <strong>Base Experience:</strong> {prediction.base_experience}<br />
                        <strong>Height:</strong> {(prediction.height / 10).toFixed(1)} m<br />
                        <strong>Weight:</strong> {(prediction.weight / 10).toFixed(1)} kg<br />
                       
                  </div>
                  )}
                    </Card.Body>
                </Card>
            </Col>
        </div>
  );
}

export default Predict;

