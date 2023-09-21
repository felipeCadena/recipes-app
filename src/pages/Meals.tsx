import React from 'react';
import { useRecipeContext } from '../context/RecipesContext';

function Meals() {
  const { recipes } = useRecipeContext();
  return (
    <div>
      <h1>Meals</h1>
      {}
      {recipes.map((recipe, index) => (
        <div key={ recipe.id } data-testid={ `${index}-recipe-card` }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ recipe.name }</p>
        </div>
      ))}
    </div>
  );
}

export default Meals;
