import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import GlobalContext from './GlobalContext';
import { DrinkType, MealsType } from '../types';
// import useFetchApi from '../hooks/useFetchApi';

type UserProviderProps = {
  children: React.ReactNode;
};

export default function ContextProvider({ children }: UserProviderProps) {
  const [resultsApi, setResultsApi] = useState<MealsType[] | DrinkType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const location = useLocation();

  const url = location.pathname === '/meals' ? 'themealdb' : 'thecocktaildb';
  const First = 'First letter';

  async function getApi(URL: string, type: string, param: string) {
    setLoading(true);
    const response = await fetch(`https://www.${URL}.com/api/json/v1/1/${type}=${param}`);
    if (response.ok) {
      if (location.pathname === '/meals') {
        const { meals } = await response.json();
        setResultsApi(meals);
      } else {
        const { drinks } = await response.json();
        setResultsApi(drinks);
      }
      setLoading(false);
    }
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
      } }
    >
      {children}
    </GlobalContext.Provider>
  );
}
