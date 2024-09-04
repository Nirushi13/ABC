import React from 'react'
import './AboutUs.css'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import QueryForm from '../../components/QueryForm/QueryForm'
import UserOffersPage from '../../components/Offer/UserOffersPage';

const AboutUs = () => {
  return (
    <div className="about-us">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ABC Restaurant</h1>
          <p>Serving delicious food with love since 1985.</p>
        </div>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          At ABC Restaurant, our mission is to provide a dining experience that delights our customers with quality food, excellent service, and a warm, welcoming atmosphere.
        </p>
      </section>

      <section className="history-section">
        <h2>Our History</h2>
        <p>
          Starting as a small family-owned restaurant in 1985, ABC Restaurant has grown into a popular chain known for its commitment to quality and customer satisfaction. With locations across Sri Lanka, we continue to serve delicious meals made from the freshest ingredients.
        </p>
      </section>

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <p>
          Our team of experienced chefs and friendly staff are dedicated to providing you with the best dining experience. From the kitchen to your table, we work together to ensure every meal is perfect.
        </p>
      </section>

      <section className="offer-section">
        <UserOffersPage />
      </section>

      <section className="food-display-section">
        <FoodDisplay category="All" />
      </section>

      <section className="query-form-section">
        <QueryForm />
      </section>
    </div>
  )
}

export default AboutUs
