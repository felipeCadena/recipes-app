import { useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { DrinkType, FavoriteRecipeType, MealsType } from '../../types';
import GlobalContext from '../../context/GlobalContext';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import '../../styles/RecipeCard.css';
import like from '../../iconsFigma/like.svg';
import share from '../../iconsFigma/Share.svg';

type RecipeProp = {
  results: MealsType[] | DrinkType[],
  pathNavigate: string;
};

export default function RecipeCard({ results, pathNavigate }: RecipeProp) {
  const {
    favoriteRecipe, handleFavoriteRecipe,
    copy, handleClipBoard,
    handleLocalStorage,
    setFavoriteRecipe, selectIngredients,
    setSelectIngredients } = useContext(GlobalContext);
  const { pathname } = useLocation();

  const path = pathname.includes('meals') ? 'meals' : 'drinks';
  const { id } = useParams();

  const data = results && results[0];

  const ingredients = data && Object.entries(data)
    .filter((i) => i[0].startsWith('strIngredient'))
    .filter((i) => i[1] !== null && i[1] !== '')
    .map((a) => a[1]);

  const measures = data && Object.entries(data)
    .filter((m) => m[0].startsWith('strMeasure'));

  useEffect(() => {
    handleLocalStorage(path, Number(id), '');

    const recoveryRecipe = JSON.parse(localStorage.getItem('favoriteRecipes') as string);
    if (recoveryRecipe && id && recoveryRecipe
      .some((i: FavoriteRecipeType) => i.id === id)) {
      setFavoriteRecipe(true);
    }

    const recoveryInProgressRecipe = JSON.parse(localStorage
      .getItem('inProgressRecipes') as string);

    if (id && recoveryInProgressRecipe) {
      const arrayIngredients = recoveryInProgressRecipe[path][id];
      setSelectIngredients(arrayIngredients);
    }
  }, []);

  function handleTextDecoration(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const { name } = event.target;

    const recoveryRecipe = JSON.parse(localStorage
      .getItem('inProgressRecipes') as string);

    if (recoveryRecipe) {
      handleLocalStorage(path, Number(event.target.id), name);
    }

    if (selectIngredients.includes(name)) {
      setSelectIngredients(selectIngredients.filter((a: string) => a !== name));
    } else {
      setSelectIngredients([...selectIngredients, name]);
    }
  }

  return (
    <div className="recipe-card-container">
      <button
        className="btn-share"
        data-testid="share-btn"
        onClick={ () => handleClipBoard(pathNavigate) }
      >
        <img
          src={ share }
          alt=""
        />
      </button>
      {copy && <span className="link-copy">Link copied!</span>}
      <button
        className="btn-favrec"
        onClick={ handleFavoriteRecipe }
      >
        <img
          data-testid="favorite-btn"
          src={ favoriteRecipe ? like : whiteHeartIcon }
          alt=""
        />
      </button>
      {data && pathname.includes('drinks') && (
        <>
          <img
            className="img-recipe"
            src={ (data as DrinkType).strDrinkThumb }
            alt={ (data as DrinkType).strDrink }
            width={ 100 }
            data-testid="recipe-photo"
          />
          <div className="text-img-recipe">
            <h1
              className="text-title"
              data-testid="recipe-title"
            >
              {(data as DrinkType).strDrink}
            </h1>
            <p
              data-testid="recipe-category"
            >
              {(data as DrinkType).strAlcoholic}
            </p>
          </div>
          <p
            className="ingredients-recipe"
          >
            Ingredients
          </p>
          {ingredients?.map((ingredient, index) => (
            <span key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              <label
                className="label-recipe form-check-label"
                data-testid={ `${index}-ingredient-step` }
                style={ selectIngredients.includes(ingredient)

                  ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
                  : { textDecoration: 'none' } }
              >
                <input
                  className="input-recipe form-check-input"
                  type="checkbox"
                  id={ (data as DrinkType).idDrink }
                  checked={ selectIngredients.includes(ingredient) }
                  name={ ingredient }
                  onChange={ (event) => handleTextDecoration(event) }
                />
                {ingredient}
                {' '}
                {measures[index][1]}
              </label>
            </span>
          ))}
          <p data-testid="instructions">
            { (data as DrinkType).strInstructions }
            { (data as DrinkType).strMeasure2 }
          </p>
        </>
      )}
      {data && pathname.includes('meals') && (
        <>
          <img
            className="img-recipe"
            src={ (data as MealsType).strMealThumb }
            alt={ (data as MealsType).strMeal }
            width={ 100 }
            data-testid="recipe-photo"
          />
          <div className="text-img-recipe">
            <h1
              data-testid="recipe-title"
            >
              { (data as MealsType).strMeal }
            </h1>
            <p
              data-testid="recipe-category"
            >
              { (data as MealsType).strCategory }
            </p>
          </div>
          <p className="ingredients-recipe">Ingredients</p>
          {ingredients?.map((ingredient, index) => (
            <span key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              <label
                className="label-recipe form-check-label"
                data-testid={ `${index}-ingredient-step` }
                style={ selectIngredients.includes(ingredient)
                  ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
                  : { textDecoration: 'none' } }
              >
                <input
                  className="input-recipe form-check-input"
                  type="checkbox"
                  id={ (data as MealsType).idMeal }
                  checked={ selectIngredients.includes(ingredient) }
                  name={ ingredient }
                  onChange={ (event) => handleTextDecoration(event) }
                />
                {ingredient}
                {' '}
                {measures[index][1]}
              </label>
            </span>
          )) }
          <p className="instructions-paragraph">Instructions</p>
          <p
            className="instructions-recipe"
            data-testid="instructions"
          >
            { (data as MealsType).strInstructions }
          </p>
          <p className="video">Video</p>
          <iframe
            className="iframe-recipe-card"
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
