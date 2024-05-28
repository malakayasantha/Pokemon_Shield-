import React from "react";
import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import Scan from "./Components/Scan";
import Footer from "./Components/Footer";
// import Predict from "./Components/Predict";
import Predict from "./Components/Predict";
import Navbar from "./Components/Navbar"; // Assuming Navbar is imported here

function App() {
  return (
    <div className="App">
      <Navbar />
      <div id="home">
        <Home />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="work">
        <Work />
      </div>
      <div id="scan">
        <Scan />
      </div>
      <div id="predict">
        <Predict />
      </div>
      <Footer />
    </div>
  );
}

export default App;
