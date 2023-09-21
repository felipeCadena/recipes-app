import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchMeal from '../hooks/useFetchMeal';

type SearchBarProp = {
  inputValue: string;
};

export default function SearchBar({ inputValue }: SearchBarProp) {
  const input = inputValue.replaceAll(' ', '').toLowerCase();

  const [radio, setRadio] = useState('ingredient');

  const { getApi, resultsApi } = useFetchMeal();
  const navigate = useNavigate();

  // const url = window.location.pathname === 'meals' ? 'themealdb' : 'thecocktaildb';

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setRadio(target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (radio === 'Ingredient') {
      getApi('themealdb', 'filter.php?i', input);
    }

    if (radio === 'Name') {
      getApi('themealdb', 'search.php?s', input);
    }

    if (radio === 'First letter' && input.length > 1 && resultsApi !== null) {
      window.alert('Your search must have only 1 (one) character');
    } else {
      getApi('themealdb', 'search.php?f', input);
    }

    if (resultsApi?.length === 1) {
      navigate(`/meals/${resultsApi[0].idMeal}`);
    }

    if (resultsApi === null) {
      window.alert("Sorry, we haven't found any recipes for these filters");
    }
  }

  return (
    <form onSubmit={ handleSubmit }>
      <label>
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="search type"
          value="Ingredient"
          checked={ radio === 'ingredient' }
          onChange={ handleChange }
        />
        Ingredient
      </label>
      <label>
        <input
          type="radio"
          data-testid="name-search-radio"
          value="Name"
          name="search type"
          checked={ radio === 'name' }
          onChange={ handleChange }
        />
        Name
      </label>
      <label>
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          value="First letter"
          name="search type"
          checked={ radio === 'first letter' }
          onChange={ handleChange }
        />
        First letter
      </label>
      <button data-testid="exec-search-btn">Search</button>
    </form>
  );
}
