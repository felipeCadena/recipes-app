import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../styles/Header.css'
import 'bootstrap/dist/css/bootstrap.css';
import tituloHeader from'../iconsFigma/logo Recipes app.svg'
import logoHeader from'../iconsFigma/bandeja.svg'
import perfilHeader from '../iconsFigma/icone-perfil.svg'
import pratoHeader from '../iconsFigma/icone-prato.svg'
import bebidaHeader from '../iconsFigma/icone-bebida.svg'
import pesquisa from '../iconsFigma/icone pesquiar.svg'

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
    <header className='header'>
      <div className='header-style'>
        <div>
          <img 
          className='bandeja-header'
          src={logoHeader} alt="logo-header" />
          <img 
          className='title-header'
          src={tituloHeader} alt="titulo-do-header" />
          <Link to="/profile">
            <img src={perfilHeader} alt="Profile" data-testid="profile-top-btn" className='profile-icon' />
          </Link>
        </div>
        <div>
        {showSearchIcon && (
          <div className='search-icon'>
            <div className='btn-div-teste'>
            <button 
            className='btn-header-cascavel'
            onClick={toggleSearch}>
              <img src={pesquisa} alt="Search" data-testid="search-top-btn" className='btn-search' />
            </button>
            </div>
            {searchVisible && (
              <div className='checkbox-style'> 
                <input
                  type="text"
                  placeholder="Search..."
                  data-testid="search-input"
                  value={inputValue}
                  onChange={handleChange}
                  className='form-control input-search'
                />
                <SearchBar inputValue={inputValue} />
              </div>
            )}
          </div>
          
        )}
        </div>
      </div>
      
      {pageTitle === 'Drink' ? (
        <img src={bebidaHeader} alt="Drink" data-testid="drinks-bottom-btn"  />
      ) : pageTitle === 'Drinks' ? (
        <>
          <span></span>
          <img src={bebidaHeader} alt="Drink" data-testid="drinks-bottom-btn" className='drink-img-header' />
        </>
      ) : pageTitle === 'Meals' ? (
        <img src={pratoHeader} alt="Meals" data-testid="meals-bottom-btn" className='meals-img-header' />
      ) : null}
      <h1 data-testid="page-title" className='page-title-profile'>{pageTitle}</h1>
    </header>
  );
    
      }
export default Header;
