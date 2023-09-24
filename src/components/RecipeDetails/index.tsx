import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import GlobalContext from '../../context/GlobalContext';
import { DrinkType, MealsType } from '../../types';
import './RecipeDetails.css';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Recommended from './Recommended';
import RecipeCard from './RecipeCard';

type RenderProp = {
  patch: string,
};

export default function RecipeDetails({ patch }: RenderProp) {
  const { getApi, resultsApi, loading } = useContext(GlobalContext);
  const [recomendations, setRecomendations] = useState<MealsType[] | DrinkType[]>([]);
  const [copy, setCopy] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);

  const apiResult = resultsApi[0];

  const favoriteMeal = apiResult && [{
    id: (apiResult as MealsType).idMeal,
    type: 'meal',
    nationality: (apiResult as MealsType).strArea,
    category: (apiResult as MealsType).strCategory,
    alcoholicOrNot: '',
    name: (apiResult as MealsType).strMeal,
    image: (apiResult as MealsType).strMealThumb,
  }];

  const drinkMeal = apiResult && [{
    id: (apiResult as DrinkType).idDrink,
    type: 'drink',
    nationality: '',
    category: (apiResult as DrinkType).strCategory,
    alcoholicOrNot: (apiResult as DrinkType).strAlcoholic,
    name: (apiResult as DrinkType).strDrink,
    image: (apiResult as DrinkType).strDrinkThumb,
  }];

  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  async function getRecomendations(url: string) {
    const response = await fetch(`https://www.${url}.com/api/json/v1/1/search.php?s=`);
    if (response.ok) {
      if (pathname === `/meals/${id}`) {
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

    const recoveryRecipe = JSON.parse(localStorage.getItem('favoriteRecipes') as string);
    if (recoveryRecipe && recoveryRecipe[0].id === id) {
      setFavoriteRecipe(true);
    }
  }, []);

  function handleLocalStorage() {
    navigate(`/${patch}/${id}/in-progress`);
  }

  const getInProgess = localStorage.getItem('inProgressRecipes');
  // será alterado nos reqs 40 em diante

  function handleFinishRecipe() { // button Finish Recipe ainda não implementado

  }

  function handleFavoriteRecipe() {
    setFavoriteRecipe(!favoriteRecipe);
    const recipeToStore = pathname.includes('meals') ? favoriteMeal : drinkMeal;
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeToStore));
  }

  function handleClipBoard() {
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`).then(
      () => {
        try {
          setCopy(true);
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

  if (resultsApi && resultsApi[0]) {
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
          onClick={ handleFavoriteRecipe }
        >
          <img
            data-testid="favorite-btn"
            src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
            alt=""
          />
        </button>
        <RecipeCard />
        {recomendations && <Recommended recomendations={ recomendations } />}
        <button
          className="start"
          data-testid="start-recipe-btn"
          onClick={ handleLocalStorage }
        >
          {!getInProgess ? 'Start Recipe' : 'Continue Recipe'}
          {/* será alterado nos reqs 40 em diante */}
        </button>
        {getInProgess && <button onClick={ handleFinishRecipe }>Finish Recipe</button>}
        {/* será alterado nos reqs 40 em diante */}
      </main>
    );
  }
}
