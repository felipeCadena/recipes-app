import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import  '../../styles/Footer.css';
import 'bootstrap/dist/css/bootstrap.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className='footer-style'
    >
      <Link to="/drinks">
        <img
         src={ drinkIcon } alt="Drink" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/meals">
        <img src={ mealIcon } alt="Meals" data-testid="meals-bottom-btn" />
      </Link>
    </footer>
  );
}
export default Footer;
