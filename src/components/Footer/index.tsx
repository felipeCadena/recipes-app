import { Link } from 'react-router-dom';
import '../../styles/Footer.css';
import 'bootstrap/dist/css/bootstrap.css';
import bebida from '../../iconsFigma/icone-bebida.svg';
import prato from '../../iconsFigma//icone-prato.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className='footer-style'
    >
      <Link to="/drinks">
        <img
          className="bebida"
          src={ bebida }
          alt="Drink"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/meals">
        <img
          className="prato"
          src={ prato }
          alt="Meals"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}
export default Footer;
