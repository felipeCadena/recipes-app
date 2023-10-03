import React from 'react';
import '../styles/DoneRecipes.css';
import done from '../iconsFigma/aprovado.svg';

function DoneRecipes() {
  return (
    <div className="done-edit">
      <img className="done-icon" src={ done } alt="" />
    </div>
  );
}

export default DoneRecipes;
