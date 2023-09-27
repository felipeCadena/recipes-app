import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/welcome.css'
import welcomeImage from '../images/imagesCss/Captura de tela de 2023-09-26 13-35-54.png'; 

function Welcome() {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login'); 
  };

  return (
    <div className="welcome-container">
      <img
        src={welcomeImage}
        alt="Boas-vindas"
        onClick={redirectToLogin}
        className='welcome-message'
      />
      <p className='title-app'>Recipes App</p>
    </div>
  );
}

export default Welcome;

