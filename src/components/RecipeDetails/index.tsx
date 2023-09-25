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
  const { getApi, resultsApi, loading,
    favoriteRecipe, handleFavoriteRecipe,
    setFavoriteRecipe, copy, handleClipBoard } = useContext(GlobalContext);
  const [recomendations, setRecomendations] = useState<MealsType[] | DrinkType[]>([]);

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
    if (recoveryRecipe && id && recoveryRecipe[0]?.id === id) {
      setFavoriteRecipe(true);
    }
  }, []);

  function handleLocalStorage() {
    navigate(`/${patch}/${id}/in-progress`);
  }

  const getInProgess = localStorage.getItem('inProgressRecipes');
  // será alterado nos reqs 40 em diante

  // function handleFinishRecipe() { // button Finish Recipe ainda não implementado

  // }

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  if (resultsApi && resultsApi[0] && id) {
    return (
      <main className="container-main">
        <button
          data-testid="share-btn"
          onClick={ () => handleClipBoard(pathname) }
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
        {getInProgess
        && <button>Finish Recipe</button>}
        {/* onClick={ handleFinishRecipe } */}
        {/* será alterado nos reqs 40 em diante */}
      </main>
    );
  }
}