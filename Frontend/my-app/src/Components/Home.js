import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/Poke1B.png";
import { FiArrowRight } from "react-icons/fi";
import { Nav } from 'react-bootstrap';

const Home = () => {

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="home-container">
      
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
          Unlock the True Power of Your Cards with Pokémon Shield
          </h1>
          <p className="primary-text">
          Welcome to Pokémon Shield, the definitive platform for Pokémon card enthusiasts seeking assurance and authenticity.
          </p>
          <button className="secondary-button">
          <Nav.Item>
            <Nav.Link onClick={() => scrollToSection('scan')} style={{ fontSize: '20px' }}>Scan Now</Nav.Link>
          </Nav.Item>
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
