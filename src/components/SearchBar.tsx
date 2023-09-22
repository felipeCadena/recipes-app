import { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';

type SearchProp = {
  inputValue: string
};

export default function SearchBar({ inputValue }: SearchProp) {
  const { handleSubmit } = useContext(GlobalContext);
  const [radio, setRadio] = useState('Ingredient');

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setRadio(target.value);
  }

  return (
    <form
      onSubmit={ (event) => handleSubmit(event, inputValue, radio) }
    >
      <label>
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="search type"
          value="Ingredient"
          checked={ radio === 'Ingredient' }
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
          checked={ radio === 'Name' }
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
          checked={ radio === 'First letter' }
          onChange={ handleChange }
        />
        First letter
      </label>
      <button data-testid="exec-search-btn">Search</button>
    </form>
  );
}
