import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <div>
      <h2 data-testid="profile-email">{user}</h2>
      <Link to="/done-recipes">
        <button data-testid="profile-done-btn">Done Recipes</button>
      </Link>
      <Link to="/favorite-recipes">
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
      </Link>
      <button onClick={ handleLogout } data-testid="profile-logout-btn">Logout</button>
    </div>
  );
}

export default Profile;
