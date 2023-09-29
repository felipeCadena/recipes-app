import FavoriteRender from '../components/FavoriteRender';
import '../styles/FavoriteRecipes.css'
import favorite from '../iconsFigma/coracao.svg'
import coracaoFav from '../iconsFigma/coracao.svg'
import foodFav from '../iconsFigma/icone-bebida.svg'
import comidasFav from '../iconsFigma/icone-prato.svg'

function FavoriteRecipes() {
  return (
    <header>
      
      <img className='favorite-recipe' src={favorite} alt="image-favoritos" />
    <div className='fav-div'>
  
    <img  className='one-fav-btn' src={coracaoFav} alt="" />
    <img  className='two-fav-btn' src={foodFav} alt="" />
    <img  className='three-fav-btn' src={comidasFav} alt="" />
   
      <FavoriteRender keyStorage="favoriteRecipes" />
    </div>
    </header>
  );
}

export default FavoriteRecipes;
