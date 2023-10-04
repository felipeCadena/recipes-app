import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css/welcome.css';
import welcomeImage from '../iconsFigma/Group 5.svg';

function Welcome() {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <button
        style={ {
          border: 'none',
          background: 'none',
          padding: 0,
          cursor: 'pointer',
        } }
        onClick={ redirectToLogin }
      >
        <img
          src={ welcomeImage }
          alt="Boas-vindas"
          className="welcome-image"
        />
      </button>

      <p className="title-app">Recipes App</p>
    </div>
  );
}

export default Welcome;
