import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RecipeCard from '../RecipeDetails/RecipeCard';
import GlobalContext from '../../context/GlobalContext';
import { DoneRecipesType, DrinkType, MealsType } from '../../types';
import '../../styles/RecipeInProgress.css';

function RecipeInProgress() {
  const { resultsApi, getApi } = useContext(GlobalContext);
  const [, setFinishRecipes] = useState<DoneRecipesType[]>([]);

  const date = new Date();
  const today = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  const { id } = useParams();
  const { pathname } = useLocation();

  const data = resultsApi;

  const navigate = useNavigate();

  const results = resultsApi[0];
  const cutyPath = pathname.replace('/in-progress', '');

  useEffect(() => {
    if (id && pathname.includes('drinks')) {
      getApi('thecocktaildb', 'lookup.php?i', id);
    }

    if (id && pathname.includes('meals')) {
      getApi('themealdb', 'lookup.php?i', id);
    }
  }, [getApi, id, pathname]);

  function handleFinishRecipe() {
    let recipeToStore: DoneRecipesType;
    if (pathname.includes('meals')) {
      const meal = results as MealsType;
      recipeToStore = {
        id: meal.idMeal,
        type: 'meal',
        nationality: meal.strArea,
        category: meal.strCategory,
        alcoholicOrNot: '',
        name: meal.strMeal,
        image: meal.strMealThumb,
        doneDate: today,
        tags: [],
      };
    } else {
      const drink = results as DrinkType;
      recipeToStore = {
        id: drink.idDrink,
        type: 'drink',
        nationality: '',
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
        doneDate: today,
        tags: [],
      };
    }

    setFinishRecipes((prev) => {
      if (!prev.some((a) => a.id === recipeToStore.id)) {
        return [...prev, recipeToStore];
      }

      return prev.filter((a) => a.id !== recipeToStore.id);
    });

    setFinishRecipes((prev) => {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify(prev),
      );
      return prev;
    });

    setTimeout(() => {
      navigate('/done-recipes');
    }, 500);
  }

  return (
    <div
      className="recipe-progress-container"
      style={ { height: '90rem' } }
    >
      <RecipeCard results={ data } pathNavigate={ cutyPath } />
      <button
        className="btn-finish-style btn btn-light"
        onClick={ handleFinishRecipe }
        data-testid="finish-recipe-btn"

      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
