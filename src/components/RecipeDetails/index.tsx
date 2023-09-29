import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import GlobalContext from '../../context/GlobalContext';
import { DrinkType, MealsType } from '../../types';
import './RecipeDetails.css';
import Recommended from './Recommended';
import RecipeCard from './RecipeCard';

type RenderProp = {
  patch: string,
};

export default function RecipeDetails({ patch }: RenderProp) {
  const { getApi, resultsApi, loading,
    setFavoriteRecipe } = useContext(GlobalContext);
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

  const path = pathname.includes('meals') ? 'meals' : 'drinks';

  const getInProgess = localStorage.getItem('inProgressRecipes');

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  if (resultsApi && resultsApi[0] && id) {
    return (
      <main className="container-main">
        <div className='div-recipe'>
        <RecipeCard results={ resultsApi } pathNavigate={ pathname } />
        {recomendations && <Recommended recomendations={ recomendations } />}
        </div>
        <button
          className="start"
          data-testid="start-recipe-btn"
          onClick={ () => navigate(`/${path}/${id}/in-progress`) }
        >
          {!getInProgess ? 'Start Recipe' : 'Continue Recipe'}
        </button>
      </main>
    );
  }
}
