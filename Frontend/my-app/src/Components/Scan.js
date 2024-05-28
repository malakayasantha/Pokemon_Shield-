
import React, { useState, useCallback } from 'react';
// Import necessary components from react-bootstrap
import { Button, Card, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
// Correct the import statement for Container


function Scan() { 
    const [selectedImage, setSelectedImage] = useState(null);
    const [classificationResult, setClassificationResult] = useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [gifToShow, setGifToShow] = useState('');

    const realCardGif = 'https://media.tenor.com/images/bc958f636a9ccce4e27fe1f908e0c6e5/tenor.gif';
    const fakeCardGif = 'https://media.tenor.com/b5_GZ8tV6oEAAAAi/pikachu-pokemon.gif';


    const onDrop = useCallback((acceptedFiles) => { // Callback function for handling file drop
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader(); // Create a FileReader object
            reader.onloadend = () => { // Define the onloadend event handler
                setImagePreviewUrl(reader.result);
                setSelectedImage(file);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const onFileUpload = () => {
      if (selectedImage) {
          const formData = new FormData();
          formData.append("file", selectedImage, selectedImage.name); // Append the file to the FormData object

          axios.post("http://localhost:8080/api/classify", formData) // Make a POST request to the classification API
              .then(response => {
                  const resultText = response.data.class_index === 1 
                      ? "CONGRATULATIONS!!!! You have got a REAL CARD." 
                      : "I'M SORRY, this is a FAKE CARD you have.";
                  setClassificationResult(resultText);
                  // Set the GIF based on the classification result
                  const gifUrl = response.data.class_index === 1 ? realCardGif : fakeCardGif;
                  setGifToShow(gifUrl);
              })
              .catch(error => {
                  console.error(error);
                  alert("An error occurred while classifying the image.");
              });
      }
  };
  

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const clearImage = () => {
        setSelectedImage(null);
        setImagePreviewUrl('');
        setClassificationResult('');
    };


    // JSX for rendering the component UI
    return (
      <>
            <div className="work-section-top">
                <p className="primary-subheading">Scan me</p>
            </div>
    <div></div>
      
      <br></br>
            <Row>
            <Col md={6} className="d-flex justify-content-center align-items-start mb-3">
              <Card style={{ width: '100%', backgroundColor: '#212529' }}>
                <Card.Body {...getRootProps()} className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '20rem' }}>
                  <input {...getInputProps()} />
                  {!imagePreviewUrl ? (
                    <p className="text-white text-center">
                      Drop Image Here - or - Click to Upload
                    </p>
                  ) : (
                    <Image src={imagePreviewUrl} alt="Preview" style={{ width: '320px', height: '320px' }} thumbnail />
                  )}
                </Card.Body>
              </Card>
            </Col>


            <Col md={6} className="d-flex justify-content-center align-items-start mb-3">
              <Card style={{ width: '100%', backgroundColor: '#212529' }}>
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '20rem' }}>
                      <Card.Title className="text-white">Output</Card.Title>
                      {classificationResult && (
                          <div className="d-flex flex-column justify-content-center align-items-center w-100">
                              <Card.Text className="text-white mt-3">
                                  {classificationResult}
                              </Card.Text>
                              {gifToShow && <img src={gifToShow} alt="Classification Result" style={{ width: '320px', height: '230px' }} />}
                          </div>
                      )}
                  </Card.Body>
              </Card>
          </Col>

            </Row>
            <Row className="mt-2">
                <Col className="d-flex justify-content-center">
                    <Button variant="outline-light" onClick={clearImage} style={{ marginRight: '10px', color: 'blue', borderColor: 'blue' }}>Clear</Button>
                    <Button style={{ backgroundColor: '#f5a623', borderColor: '#f5a623' }} onClick={onFileUpload}>Submit</Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col className="d-flex justify-content-center">
                <p style={{ color: 'gray' }}>Examples</p>

                </Col>
            </Row>

            <div>
          
            <Row className="justify-content-center" style={{ marginTop: '20px' }}>
  <Col xs={12} md={1} className="d-flex justify-content-center mb-2">
    <Card className="d-flex justify-content-center align-items-center" style={{ width: '5rem', height: '5rem', backgroundColor: '#FFFFFF' }}>
      <Image src={`/images/Real.png`} style={{ maxWidth: '100%', maxHeight: '100%' }} alt="Real Card" />
    </Card>
  </Col>
  <Col xs={12} md={1} className="d-flex justify-content-center">
    <Card className="d-flex justify-content-center align-items-center" style={{ width: '5rem', height: '5rem', backgroundColor: '#FFFFFF' }}>
      <Image src={`/images/Fake.jpg`} style={{ maxWidth: '100%', maxHeight: '100%' }} alt="Fake Card" />
    </Card>
  </Col>
</Row>

          </div>
          </>
        
    );
    
}

export default Scan;
