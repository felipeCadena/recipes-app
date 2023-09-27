import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css'
import 'bootstrap/dist/css/bootstrap.css';

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
    <header className='header' >
   <h1 className='h1-style'><i>RECIPES</i> <strong>app</strong></h1>

      
      <div className='header-style'>
        <div>
          <Link to="/profile">
            <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" className='search-profile' />
          </Link>
        </div>
        {showSearchIcon && (
          <div  className='search-icon'>
            <button onClick={ toggleSearch }>
              <img src={ searchIcon } alt="Search" data-testid="search-top-btn"
              className='link-div'
              />
            </button>
            {searchVisible && (
              <div className='checkbox-style'> 
                <input
                  type="text"
                  placeholder="Search..."
                  data-testid="search-input"
                  value={ inputValue }
                  onChange={ handleChange }
                  className='form-control input-search'
                />
                <SearchBar inputValue={ inputValue } />
              </div>
            )}
          </div>
        )}
      </div>
      <h1 data-testid="page-title"
      className='page-title'
      >{pageTitle}</h1>
    </header>
  );
            }  

export default Header;
