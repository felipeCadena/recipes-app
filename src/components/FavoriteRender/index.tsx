import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteRecipeType } from '../../types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import GlobalContext from '../../context/GlobalContext';

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

  // function handleDelete(id: string) {
  //   const recoveryRecipe:
  //   FavoriteRecipeType[] = JSON.parse(localStorage.getItem(keyStorage) as string);
  //   const filterStorage = recoveryRecipe.filter((rec) => rec.id !== id);
  //   setRecipeSave(filterStorage);
  //   setFavoriteRecipe(!favoriteRecipe);
  //   localStorage.setItem(
  //     'favoriteRecipes',
  //     JSON.stringify(filterStorage),
  //   );
  // }

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
      const meals = recoveryRecipe.filter((rec) => rec.type === 'drink');
      setRecipeSave(meals);
    }
  }

  return (
    <div>
      <button
        onClick={ () => handleFilter('All') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => handleFilter('Meals') }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        onClick={ () => handleFilter('Drinks') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
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
  );
}
