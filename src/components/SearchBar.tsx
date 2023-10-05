import { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import '../styles/SearchBar.css';
import 'bootstrap/dist/css/bootstrap.css';

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
      className="search-bar-container"
    >
      <div className="radio-buttons">
        <label>
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="search type"
            value="Ingredient"
            checked={ radio === 'Ingredient' }
            onChange={ handleChange }
            className="checkbox form-outline"
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
            className="checkbox  form-outline"
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
            className="checkbox form-outline"
          />
          First letter
        </label>

        <div className="search-button">
          <button
            data-testid="exec-search-btn"
            className="btn btn-warning btn-search"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
