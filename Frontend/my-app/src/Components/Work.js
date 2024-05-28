import React from "react";
import Upload from "../Assets/Upload.jpg";



const Work = () => {
  const workInfoData = [
    {
      image: Upload,
      title: "Upload Card",
      text: "Upload a clean image of your Pokémon card's backside or Frontside for swift authenticity verification and identification.",
    },
    
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
        For swift authenticity verification and identification, upload a clear image of your Pokémon card's backside. Alternatively, explore high-resolution Pokémon card backs easily through our provided URL for quick checks.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
