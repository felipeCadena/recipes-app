import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const location = useLocation();
  const [searchVisible, setSearchVisible] = useState<boolean>(false);

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
            {searchVisible && (
              <input
                type="text"
                placeholder="Search..."
                data-testid="search-input"
              />
            )}
          </>
        )}
      </div>
      <h1 data-testid="page-title">{pageTitle}</h1>
    </header>
  );
}

export default Header;
