import React from "react";
import bgImg from "../assets/images/about-hero.png";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="main-about-page">
      <img src={bgImg} alt="hero-image-about" />
      <div className="container">
        <h2>Don’t squeeze in a sedan when you could relax in a van.</h2>
        <h4>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch. (Hitch costs extra 😉)</h4>
        <h4>Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</h4>
        <div className="cta-page-about">
          <h3>Your destination is waiting.</h3>
          <h3>Your van is ready.</h3>
          <Link to="/vans">Explore Our Vans</Link>
        </div>
      </div>
    </main>
  );
}
