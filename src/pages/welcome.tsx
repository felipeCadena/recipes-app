import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/welcome.css'
import welcomeImage from '../iconsFigma/Group 5.svg';

function Welcome() {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login'); 
  };

  return (
    <div>
      <img
        src={welcomeImage}
        alt="Boas-vindas"
        onClick={redirectToLogin}
        className='welcome-image'
      />
      <p className='title-app'>Recipes App</p>
    </div>
  );
}

export default Welcome;

