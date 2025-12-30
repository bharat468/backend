import React from 'react';
import "../App.css";
import Product from './Product';

function Home() {
  return (
    <>
      <div className="home-welcome">
        <h2>Welcome</h2>
        <p>Best Products For You</p>
      </div>

      <div className="product-wrapper">
        <Product />
      </div>
    </>
  );
}

export default Home;
