import React from 'react';
import { useRecipeContext } from '../context/RecipesContext';

function Drinks() {
  const { recipes } = useRecipeContext(); // Obtenha as receitas de bebidas do contexto

  return (
    <div>
      <h1>Drinks</h1>
      {/* Mapeie as receitas de bebidas e renderize os cards aqui */}
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

export default Drinks;
