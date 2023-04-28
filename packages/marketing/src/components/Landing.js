import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <>
      <h2> Landing </h2>
      <p>
        <Link to='/price'>
          <button>Pricing</button>
        </Link>
      </p>
    </>
  );
}
