import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import GlobalContext from './GlobalContext';
import { DrinkType, FavoriteRecipeType, MealsType } from '../types';

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

  const { pathname } = useLocation();

  const url = pathname === '/meals' ? 'themealdb' : 'thecocktaildb';
  const First = 'First letter';

  async function getApi(URL: string, type: string, param: string) {
    setLoading(true);
    const response = await fetch(`https://www.${URL}.com/api/json/v1/1/${type}=${param}`);

    if (response.ok) {
      if (pathname === '/meals' || pathname === `/meals/${param}`) {
        const { meals } = await response.json();
        setResultsApi(meals);
      } else {
        const { drinks } = await response.json();
        setResultsApi(drinks);
      }
      setLoading(false);
    }
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
    if (saveFavorite) {
      setSaveFavorite((prev) => [...prev, recipeToStore]);
    }
    console.log(saveFavorite);

    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...saveFavorite, recipeToStore]),
    );
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
      } }
    >
      {children}
    </GlobalContext.Provider>
  );
}
