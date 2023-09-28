import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Profile.css'
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
    <div className='profile-container'>
      <h2 className='prof-email' data-testid="profile-email">{user}</h2>
      <div className='three-btn'>
      <Link to="/done-recipes">
        <button data-testid="profile-done-btn">Done Recipes</button>
      </Link>
      <Link to="/favorite-recipes">
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
      </Link>
      <button onClick={ handleLogout } data-testid="profile-logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Profile;
