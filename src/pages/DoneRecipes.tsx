import React from 'react';
import done from '../iconsFigma/aprovado.svg'
import '../styles/DoneRecipes.css'

function DoneRecipes() {
  return (
    <div className='done-edit'>
      <img className='done-icon' src={done} alt="done-image" />
      <h1></h1>
    </div>
  );
}

export default DoneRecipes;
