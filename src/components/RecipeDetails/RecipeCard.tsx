import { useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { DrinkType, LineType, MealsType } from '../../types';
import GlobalContext from '../../context/GlobalContext';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

type RecipeProp = {
  results: MealsType[] | DrinkType[],
  pathNavigate: string;
};

export default function RecipeCard({ results, pathNavigate }: RecipeProp) {
  const {
    favoriteRecipe, handleFavoriteRecipe,
    copy, handleClipBoard,
    handleLocalStorage,
    setFavoriteRecipe, setDisabled, disabled } = useContext(GlobalContext);
  const { pathname } = useLocation();
  const [done, setDone] = useState<LineType[]>([]);

  const path = pathname.includes('meals') ? 'meals' : 'drinks';
  const { id } = useParams();

  const data = results && results[0];

  const ingredients = data && Object.entries(data)
    .filter((i) => i[0].startsWith('strIngredient'))
    .filter((i) => i[1] !== null && i[1] !== '');

  const measures = data && Object.entries(data)
    .filter((m) => m[0].startsWith('strMeasure'));

  useEffect(() => {
    handleLocalStorage(path, Number(id), '');

    const recoveryRecipe = JSON.parse(localStorage.getItem('favoriteRecipes') as string);
    if (recoveryRecipe && id && recoveryRecipe[0]?.id === id) {
      setFavoriteRecipe(true);
    }

    const recoveryInProgressRecipe = JSON.parse(localStorage
      .getItem('inProgressRecipes') as string);

    if (id && recoveryInProgressRecipe) {
      const arrayIngredients = recoveryInProgressRecipe[path][id];

      if (arrayIngredients) {
        arrayIngredients.map((ingredient: string, index: number) => done
          .every((a) => a.name !== ingredient) && setDone((prev) => [...prev, { id: index,
          name: ingredient,
          checked: true }]));
      }
    }
  }, []);

  const eachIngredients: string[] = ingredients && ingredients.map((a) => a[1]);
  const doneIngredientes: string[] = done && done.map((a) => a.name);

  function compareArrays(array1: string[], array2: string[]) {
    if (array1 && array2 && array1.length === array2.length) {
      return array1.every((element, index) => element === array2[index]);
    }
    return false;
  }

  function handleTextDecoration(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const { name } = event.target;

    if (localStorage.getItem('inProgressRecipes')) {
      handleLocalStorage(path, Number(event.target.id), name);
    }

    if (done && done
      .some((item) => item.id === index)) {
      setDone((prev) => (prev)
        .filter((item) => item.id !== index));
    }

    setDone((prev) => [...prev, { id: index,
      name,
      checked: event.target.checked }]);

    if (compareArrays(eachIngredients, doneIngredientes)) {
      setDisabled(!disabled);
    }
  }

  return (
    <div>
      <button
        data-testid="share-btn"
        onClick={ () => handleClipBoard(pathNavigate) }
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
      {data && pathname.includes('drinks') && (
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
            <span key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              <label
                data-testid={ `${index}-ingredient-step` }
                defaultChecked={ done[index]?.checked }
                style={ done[index]?.checked
                  ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
                  : { textDecoration: 'none' } }
              >
                <input
                  type="checkbox"
                  id={ (data as DrinkType).idDrink }
                  checked={ done[index]?.checked }
                  name={ ingredient[1] }
                  onChange={ (event) => handleTextDecoration(event, index) }
                />
                {ingredient[1]}
                {' '}
                {measures[index][1]}
              </label>
            </span>
          ))}
          <p data-testid="instructions">
            {(data as DrinkType).strInstructions}
            {(data as DrinkType).strMeasure2}
          </p>
        </>
      )}
      {data && pathname.includes('meals') && (
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
            <span key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              <label
                defaultChecked={ done[index]?.checked }
                data-testid={ `${index}-ingredient-step` }
                style={ done[index]?.checked
                  ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
                  : { textDecoration: 'none' } }
              >
                <input
                  type="checkbox"
                  id={ (data as MealsType).idMeal }
                  checked={ done[index]?.checked }
                  name={ ingredient[1] }
                  onChange={ (event) => handleTextDecoration(event, index) }
                />
                {ingredient[1]}
                {' '}
                {measures[index][1]}
              </label>
            </span>
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
