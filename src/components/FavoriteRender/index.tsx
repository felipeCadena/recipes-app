import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteRecipeType } from '../../types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import GlobalContext from '../../context/GlobalContext';
import '../../styles/FavoriteRender.css';
import all from '../../iconsFigma/icon _fast food outline_.svg';
import meal from '../../iconsFigma/Group 1.svg';
import drink from '../../iconsFigma/icone-bebida.svg';
import 'bootstrap/dist/css/bootstrap.css';
import heart from '../../iconsFigma/coracao.svg';

type FavoriteType = {
  keyStorage: string;
};

export default function FavoriteRender({ keyStorage }: FavoriteType) {
  const { favoriteRecipe, setFavoriteRecipe,
    copy, handleClipBoard, recipeSave,
    setRecipeSave, handleDelete } = useContext(GlobalContext);

  useEffect(() => {
    if (keyStorage) {
      const recoveryRecipe = JSON.parse(localStorage.getItem(keyStorage) as string);
      setRecipeSave(recoveryRecipe);
      setFavoriteRecipe(!favoriteRecipe);
    }
  }, []);

  function handleFilter(button: string) {
    const recoveryRecipe:
    FavoriteRecipeType[] = JSON.parse(localStorage.getItem(keyStorage) as string);
    if (button === 'All') {
      setRecipeSave(recoveryRecipe);
    }

    if (button === 'Meals') {
      const meals = recoveryRecipe.filter((rec) => rec.type === 'meal');
      setRecipeSave(meals);
    }

    if (button === 'Drinks') {
      const drinks = recoveryRecipe.filter((rec) => rec.type === 'drink');
      setRecipeSave(drinks);
    }
  }

  return (
    <header className="header-fav-render">
      <img
        src={ heart }
        alt=""
      />
      <div className="fav-render-container">
        <div className="btn-favs">
          <img
            src={ all }
            alt=""
          />
          <img
            src={ meal }
            alt=""
          />
          <img
            src={ drink }
            alt=""
          />
        </div>
        <div className="buttons-render">
          <button
            className="btall btn btn-light"
            onClick={ () => handleFilter('All') }
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            className="btmeals btn btn-light"
            onClick={ () => handleFilter('Meals') }
            data-testid="filter-by-meal-btn"
          >
            Meals
          </button>
          <button
            className="btdrink btn btn-light"
            onClick={ () => handleFilter('Drinks') }
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
        </div>
        {recipeSave && recipeSave.map((recipe, index) => (
          <div key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                width={ 100 }
              />
              <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
            </Link>
            {recipe.type === 'meal' ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.nationality}
                {' '}
                -
                {' '}
                {recipe.category}
              </p>) : (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.alcoholicOrNot}
                  {' '}
                  -
                  {' '}
                  {recipe.category}
                </p>)}
            <button
              onClick={ () => handleClipBoard(`/${recipe.type}s/${recipe.id}`) }
            >
              <img
                src={ shareIcon }
                alt=""
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            {copy && <span>Link copied!</span>}
            <button onClick={ () => handleDelete(recipe.id) }>
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
                alt=""
              />
            </button>
          </div>
        ))}
      </div>
    </header>
  );
}
