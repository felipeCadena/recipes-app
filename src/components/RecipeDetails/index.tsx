import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import GlobalContext from '../../context/GlobalContext';
import {
  DrinkType,
  MealsType,
  DoneRecipesType,
  InProgressRecipesType } from '../../types';
import RecipeCard from './RecipeCard';
import './RecipeDetails.css';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

type RenderProp = {
  patch: string,
};

// const doneRecipe = {
//   id: '',
//   type: '',
//   nationality: '',
//   category: '',
//   alcoholicOrNot: '',
//   name: '',
//   image: '',
//   doneDate: '',
//   tags: '',
// };

const InProgress = {
  drinks: {
    id: [],
  },
  meals: {
    id: [],
  },
};

export default function RecipeDetails({ patch }: RenderProp) {
  const [recomendations, setRecomendations] = useState<MealsType[] | DrinkType[]>([]);
  // const [doneRecipes, setDoneRecipes] = useState<DoneRecipesType[]>([]);
  // const [inProgressRecipes,
  //   setInProgressRecipes] = useState<InProgressRecipesType>(InProgress);
  const [favoriteRecipe, setFavoriteRecipe] = useState(true);
  const [copy, setCopy] = useState(false);

  const { getApi, resultsApi, loading } = useContext(GlobalContext);

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  async function getRecomendations(url: string) {
    const response = await fetch(`https://www.${url}.com/api/json/v1/1/search.php?s=`);
    if (response.ok) {
      if (location.pathname === `/meals/${id}`) {
        const { drinks } = await response.json();
        setRecomendations(drinks);
      } else {
        const { meals } = await response.json();
        setRecomendations(meals);
      }
    }
  }

  useEffect(() => {
    if (id && patch === 'drinks') {
      getApi('thecocktaildb', 'lookup.php?i', id);
      getRecomendations('themealdb');
    }

    if (id && patch === 'meals') {
      getApi('themealdb', 'lookup.php?i', id);
      getRecomendations('thecocktaildb');
    }
  }, []);

  const data = resultsApi && resultsApi[0];

  const ingredients = data && Object.entries(data)
    .filter((i) => i[0].startsWith('strIngredient'));

  const measures = data && Object.entries(data)
    .filter((m) => m[0].startsWith('strMeasure'));

  const param = data && (data as MealsType)?.strYoutube?.replace('watch?v=', 'embed/');

  function handleLocalStorage() {
    navigate(`/${patch}/${id}/in-progress`);
    // localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    // localStorage.setItem('inProgressRecipes', JSON.stringify(InProgress));
  }

  const getInProgess = localStorage.getItem('inProgressRecipes');

  function handleFinishRecipe() {

  }

  function handleFavoriteRecipe() {
    setFavoriteRecipe(!favoriteRecipe);
  }

  function handleClipBoard() {
    navigator.clipboard.writeText(`http://localhost:3000${location.pathname}`).then(
      () => {
        try {
          setCopy(!copy);
        } catch (error) {
          return error;
        } finally {
          setTimeout(() => {
            setCopy(false);
          }, 500);
        }
      },
    );
  }

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  if (data) {
    return (
      <main className="container-main">
        <button
          data-testid="share-btn"
          onClick={ handleClipBoard }
        >
          <img src={ shareIcon } alt="" />
        </button>
        {copy && <span>Link copied!</span>}
        <button
          data-testid="favorite-btn"
          onClick={ handleFavoriteRecipe }
        >
          <img src={ favoriteRecipe ? whiteHeartIcon : blackHeartIcon } alt="" />
        </button>
        {patch === 'drinks' && (
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
        {patch === 'meals' && (
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
              src={ param }
              title={ (data as MealsType).idMeal }
            />
          </>
        )}
        {recomendations && <RecipeCard recomendations={ recomendations } />}
        <button
          className="start"
          data-testid="start-recipe-btn"
          onClick={ handleLocalStorage }
        >
          {!getInProgess ? 'Start Recipe' : 'Continue Recipe'}
        </button>
        {getInProgess && <button onClick={ handleFinishRecipe }>Finish Recipe</button>}
      </main>
    );
  }
}
