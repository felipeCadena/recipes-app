import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { DrinkType, MealsType } from '../../types';
import GlobalContext from '../../context/GlobalContext';

export default function RecipeCard() {
  const { resultsApi } = useContext(GlobalContext);
  const { pathname } = useLocation();

  const data = resultsApi && resultsApi[0];

  const ingredients = data && Object.entries(data)
    .filter((i) => i[0].startsWith('strIngredient'));

  const measures = data && Object.entries(data)
    .filter((m) => m[0].startsWith('strMeasure'));

  return (
    <div>
      {pathname.includes('drinks') && (
        <>
          <img
            src={ (data as DrinkType).strDrinkThumb }
            alt={ (data as DrinkType).strDrink }
            width={ 100 }
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{(data as DrinkType).strDrink}</h1>
          <p data-testid="recipe-category">{(data as DrinkType).strAlcoholic}</p>
          {ingredients?.map((ingredient, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient[1]}
              {' '}
              {measures[index][1]}
            </p>
          ))}
          <p data-testid="instructions">
            {(data as DrinkType).strInstructions}
            {(data as DrinkType).strMeasure2}
          </p>
        </>
      )}
      {pathname.includes('meals') && (
        <>
          <img
            src={ (data as MealsType).strMealThumb }
            alt={ (data as MealsType).strMeal }
            width={ 100 }
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{(data as MealsType).strMeal}</h1>
          <p data-testid="recipe-category">{(data as MealsType).strCategory}</p>
          {ingredients?.map((ingredient, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient[1]}
              {' '}
              {measures[index][1]}
            </p>
          ))}
          <p data-testid="instructions">
            {(data as MealsType).strInstructions}
          </p>
          <iframe
            data-testid="video"
            width="360"
            height="200"
            src={ (data as MealsType).strYoutube
              && (data as MealsType).strYoutube.replace('watch?v=', 'embed/') }
            title={ (data as MealsType).idMeal }
          />
        </>
      )}
    </div>
  );
}
