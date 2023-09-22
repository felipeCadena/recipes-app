import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      style={ {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 0',
      } }
    >
      <Link to="/drinks">
        <img src="{ drinkIcon }" alt="Drink" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/meals">
        <img src="{ mealIcon }" alt="Meals" data-testid="meals-bottom-btn" />
      </Link>
    </footer>
  );
}
export default Footer;
