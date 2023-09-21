import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

enum RouteKeys {
  Meals = '/meals',
  Drinks = '/drinks',
  Profile = '/profile',
  DoneRecipes = '/done-recipes',
  FavoriteRecipes = '/favorite-recipes',
}

function Header({ children }) {
  const location = useLocation();

  // Crie o objeto routeTitles com base no tipo de chave definido
  const routeTitles: {
    [key in RouteKeys]: string;
  } = {
    '/meals': 'Receitas',
    '/drinks': 'Bebidas',
    '/profile': 'Perfil',
    '/done-recipes': 'Receitas concluídas',
    '/favorite-recipes': 'Receitas favoritas',
  };

  // Verifica se a rota atual está no objeto routeTitles
  const pageTitle = routeTitles[RouteKeys.parse(location.pathname)];

  // Verifica se a rota atual é '/meals' ou '/drinks' para exibir o ícone de pesquisa
  const showSearchIcon = location
    .pathname === '/meals' || location.pathname === '/drinks';

  return (
    <header>
      <div>
        <Link to="/profile">
          <img src={ profileIcon } alt="Perfil" data-testid="profile-top-btn" />
        </Link>
        {showSearchIcon && (
          <Link to="/search">
            <img src={ searchIcon } alt="Pesquisa" data-testid="search-top-btn" />
          </Link>
        )}
      </div>
      <h1 data-testid="page-title">{pageTitle}</h1>
      {children}
    </header>
  );
}

export default Header;
