import FavoriteRender from '../components/FavoriteRender';

function FavoriteRecipes() {
  return (
    <div style={ { height: '80rem' } }>
      <FavoriteRender keyStorage="favoriteRecipes" />
    </div>
  );
}

export default FavoriteRecipes;
