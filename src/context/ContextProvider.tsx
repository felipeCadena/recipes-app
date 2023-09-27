import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import GlobalContext from './GlobalContext';
import { DrinkType,
  FavoriteRecipeType, LineType, MealsType } from '../types';

type UserProviderProps = {
  children: React.ReactNode;
};

export default function ContextProvider({ children }: UserProviderProps) {
  const recovery = localStorage.length ? JSON
    .parse(localStorage.getItem('favoriteRecipes') as string) : [];

  const [resultsApi, setResultsApi] = useState<MealsType[] | DrinkType[]>([]);
  const [saveFavorite, setSaveFavorite] = useState<FavoriteRecipeType[]>(recovery);
  const [loading, setLoading] = useState<boolean>(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const [copy, setCopy] = useState(false);
  const [recipeSave, setRecipeSave] = useState<FavoriteRecipeType[]>([]);
  const [disabled, setDisabled] = useState<boolean>(true);

  const { pathname } = useLocation();
  const url = pathname === '/meals' ? 'themealdb' : 'thecocktaildb';
  const First = 'First letter';

  async function getApi(URL: string, type: string, param: string) {
    setLoading(true);
    const response = await fetch(`https://www.${URL}.com/api/json/v1/1/${type}=${param}`);

    if (response.ok) {
      if (pathname.includes('/meals')) {
        const { meals } = await response.json();
        setResultsApi(meals);
      } else {
        const { drinks } = await response.json();
        setResultsApi(drinks);
      }
      setLoading(false);
    }
  }

  function handleLocalStorage(keyPath: string, idRecipe: number, ingredient: string) { // não funciona corretamente.
    const recoveryInProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes') as string);
    const existingProgress = recoveryInProgress || { drinks: {}, meals: {} };

    if (!existingProgress[keyPath]) {
      existingProgress[keyPath] = {};
    }

    if (!existingProgress[keyPath][idRecipe]) {
      existingProgress[keyPath][idRecipe] = [];
    }

    if (ingredient !== '') {
      existingProgress[keyPath][idRecipe].push(ingredient);
    }

    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(existingProgress),
    );
  }

  function handleDelete(id: string) {
    const recoveryRecipe:
    FavoriteRecipeType[] = JSON.parse(localStorage.getItem('favoriteRecipes') as string);
    const filterStorage = recoveryRecipe.filter((rec) => rec.id !== id);
    setRecipeSave(filterStorage);
    setFavoriteRecipe(!favoriteRecipe);
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(filterStorage),
    );
  }

  const apiResult = resultsApi && resultsApi[0];

  function handleFavoriteRecipe() {
    let recipeToStore: FavoriteRecipeType;

    if (pathname.includes('meals')) {
      const meal = apiResult as MealsType;
      recipeToStore = {
        id: meal.idMeal,
        type: 'meal',
        nationality: meal.strArea,
        category: meal.strCategory,
        alcoholicOrNot: '',
        name: meal.strMeal,
        image: meal.strMealThumb,
      };
    } else {
      const drink = apiResult as DrinkType;
      recipeToStore = {
        id: drink.idDrink,
        type: 'drink',
        nationality: '',
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
      };
    }
    setFavoriteRecipe(!favoriteRecipe);

    if (saveFavorite.some((a) => a.id !== recipeToStore.id)) {
      setSaveFavorite((prev) => [...prev, recipeToStore]);
    }

    if (saveFavorite.some((a) => a.id === recipeToStore.id)) {
      const deleteFavorite: FavoriteRecipeType[] = saveFavorite
        .filter((a) => a.id !== recipeToStore.id);
      setSaveFavorite(deleteFavorite);
    }

    if (!favoriteRecipe && saveFavorite) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...saveFavorite, recipeToStore]),
      );
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(saveFavorite),
      );
    }
  }

  function handleClipBoard(patchName: string) {
    navigator.clipboard.writeText(`http://localhost:3000${patchName}`).then(
      () => {
        try {
          setCopy(true);
        } finally {
          setTimeout(() => {
            setCopy(false);
          }, 500);
        }
      },
    );
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    input: string,
    radio: string,
  ) {
    event.preventDefault();

    if (radio === 'Ingredient') {
      await getApi(url, 'filter.php?i', input);
    }

    if (radio === 'Name') {
      getApi(url, 'search.php?s', input);
    }

    if (radio === First && input.length === 1) {
      getApi(url, 'search.php?f', input);
    }

    if (radio === First && input.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    }
  }

  return (
    <GlobalContext.Provider
      value={ {
        getApi,
        resultsApi,
        loading,
        handleSubmit,
        saveFavorite,
        setSaveFavorite,
        favoriteRecipe,
        setFavoriteRecipe,
        handleFavoriteRecipe,
        setCopy,
        copy,
        handleClipBoard,
        handleLocalStorage,
        recipeSave,
        setRecipeSave,
        handleDelete,
        disabled,
        setDisabled,
      } }
    >
      {children}
    </GlobalContext.Provider>
  );
}
