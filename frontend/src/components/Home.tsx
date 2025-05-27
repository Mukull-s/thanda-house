import React from 'react';
import Navbar from './Navbar';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="home-background">
        <div className="home-logo-section">
          <img src="/logo.png" alt="Thanda House Premium Beer" className="home-main-logo" />
        </div>
        <div className="home-beers-section">
          <img src="/beers.png" alt="Thanda House Beers" className="home-beers-img" />
        </div>
        <section className="hero-section">
          <img src="/beer background.png" alt="Black Bottle" className="hero-bottle hero-bottle-left" />
          <img src="/GREEN BOTTLE.png" alt="Green Bottle" className="hero-bottle hero-bottle-right" />
          <div className="hero-content">
            
            <h1 className="hero-heading">Sip the Chill,<br />Taste the Thrill.</h1>
            <p className="hero-subheading">A sip of Thanda House, a journey to pure refreshment</p>
            <button className="hero-btn">🍹 Explore Our Drinks</button>
            <div className="hero-why"><a href="#" className="hero-why-link">Why Choose Thanda House?</a></div>
            <div className="hero-stats">
              <div className="hero-stat"><img src="/beer-mug.png" alt="beer mug" className="stat-icon"/> 25+ Beers</div>
              <div className="stat-divider" />
              <div className="hero-stat">Unmatched Purity</div>
              <div className="stat-divider" />
              <div className="hero-stat">Exotic Ingredients</div>
              <div className="stat-divider" />
              <div className="hero-stat">Brewed Since 2005</div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
