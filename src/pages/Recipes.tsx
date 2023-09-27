import React from 'react';
import { RecipesProps } from '../types';
//  mapear uma lista de receitas e renderizar cada uma delas

function Recipes({ recipe, index }: RecipesProps) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ recipe.image }
        alt={ recipe.name }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{ recipe.name }</p>
    </div>
  );
}

export default Recipes;
