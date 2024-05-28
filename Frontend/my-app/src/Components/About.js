import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const redirectToUrl = () => {
  window.location.href = 'https://www.pokecardguy.com/how-to-identify-fake-pokemon-cards/';
};

const redirectToUrl2 = () => {
  window.location.href = 'https://www.youtube.com/watch?v=HtNvKgU-Za0';
};

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
        Protect Your Pokémon Legacy with Pokémon Shield Verification
        </h1>
        <p className="primary-text">
        Discover the essence of true Pokémon collecting with Pokémon Shield. Verify and identify authentic cards to unlock their full potential. Protect your collection, elevate your game, and ensure every card's authenticity with us.
        </p>
        
        <div className="about-buttons-container">
        <button className="secondary-button" onClick={redirectToUrl}>Learn More</button>
          <button className="watch-video-button"  onClick={redirectToUrl2}>
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
