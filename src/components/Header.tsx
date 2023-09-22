import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const location = useLocation();
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');

  const showSearchIcon = location
    .pathname === '/meals' || location.pathname === '/drinks';

  const routeTitles: Record<string, string> = {
    '/': 'Home',
    '/meals': 'Meals',
    '/drinks': 'Drinks',
    '/profile': 'Profile',
    '/done-recipes': 'Done Recipes',
    '/favorite-recipes': 'Favorite Recipes',
  };

  const pageTitle = routeTitles[location.pathname];

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(target.value);
  }

  return (
    <header>
      <div>
        <Link to="/profile">
          <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
        </Link>
        {showSearchIcon && (
          <>
            <button onClick={ toggleSearch } data-testid="search-top-btn">
              <img src={ searchIcon } alt="Search" data-testid="search-top-btn" />
            </button>
            {searchVisible && ( // Renderiza o input de busca condicionalmente com base no estado
              <>
                <input
                  type="text"
                  placeholder="Search..."
                  data-testid="search-input"
                  value={ inputValue }
                  onChange={ handleChange }
                />
                <SearchBar inputValue={ inputValue } />
              </>
            )}
          </>
        )}
      </div>
      <h1 data-testid="page-title">{pageTitle}</h1>
    </header>
  );
}

export default Header;
