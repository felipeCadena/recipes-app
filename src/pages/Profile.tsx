import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import 'bootstrap/dist/css/bootstrap.css';
import aprovado from '../iconsFigma/aprovado.svg';
import perfil from '../iconsFigma/Perfil.svg';
import logout from '../iconsFigma/logout.svg';
import coracao from '../iconsFigma/coracao.svg';
import '../styles/Global.css';

function Profile() {
  const [user, setUser] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const { email } = JSON.parse(localStorage.getItem('user') as string);
      setUser(email);
    }
  }, []);

  function handleLogout() {
    localStorage.clear();
    navigate('/');
  }

  return (
    <header>
      <img
        className="img-perfil"
        src={ perfil }
        alt="icone-perfil"
      />

      <div className="profile-container">

        <h2
          className="prof-email"
          data-testid="profile-email"
        >
          { user }
        </h2>

        <div className="three-btn">
          <Link to="/done-recipes">
            <img
              className="profile-img"
              src={ aprovado }
              alt="icone-aprovado"
            />
            <button
              className="done-btn btn btn-light"
              data-testid="profile-done-btn"
            >
              Done Recipes
            </button>
          </Link>
          <Link to="/favorite-recipes">
            <img
              className="coracao-img"
              src={ coracao }
              alt="icone-coracao"
            />
            <button
              className="favorite-btn btn btn-light"
              data-testid="profile-favorite-btn"
            >
              Favorite Recipes
            </button>
          </Link>
          <img
            className="logout-img"
            src={ logout }
            alt="icone-logout"
          />
          <button
            className="logout-btn btn btn-light"
            onClick={ handleLogout }
            data-testid="profile-logout-btn"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Profile;
