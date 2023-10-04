import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipesType } from '../types';
import shareIcon from '../images/shareIcon.svg';
import GlobalContext from '../context/GlobalContext';

export const initialRecipesState: DoneRecipesType = {

  id: '',
  type: '',
  nationality: '',
  category: '',
  alcoholicOrNot: '',
  name: '',
  image: '',
  doneDate: '',
  tags: [],

};

function DoneRecipes() {
  const { handleClipBoard, copy } = useContext(GlobalContext);
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipesType[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<DoneRecipesType[]>([]);
  const [showAlcoholic, setShowAlcoholic] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  useEffect(() => {
    const savedRecipes = localStorage.getItem('doneRecipes');
    if (savedRecipes) {
      const parsedRecipes = JSON.parse(savedRecipes);
      setDoneRecipes(parsedRecipes);
      setFilteredRecipes(parsedRecipes);
    }
  }, []);

  const filterRecipes = (type: string) => {
    if (type === 'All') {
      setFilteredRecipes(doneRecipes);
    } else if (type === 'Drinks') {
      const filtered = doneRecipes.filter((recipe) => recipe.type === 'drink');
      setFilteredRecipes(filtered);
    } else {
      const filtered = doneRecipes.filter((recipe) => {
        return recipe.type === 'meal';
      });
      setFilteredRecipes(filtered);
    }
  };

  const handleShareClick = (recipe: DoneRecipesType) => {
    const { name } = recipe;
    if (navigator.share) {
      navigator.share({
        title: 'Compartilhar Receita',
        text: `Confira a receita de ${name}`,
      })
        .then(() => {
          console.log('Receita compartilhada com sucesso');
          setCopySuccess(true);
          setTimeout(() => {
            setCopySuccess(false);
          }, 10000);
        })
        .catch((error) => console.error('Erro ao compartilhar a receita', error));
    } else {
      alert(`Compartilhe a receita de ${name} manualmente`);
    }
  };
  return (
    <div>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => filterRecipes('Meals') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => filterRecipes('Drinks') }
      >
        Drinks
      </button>
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => filterRecipes('All') }
      >
        All
      </button>
      {filteredRecipes.map((recipe, index) => (
        <div key={ index }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
              width={ 200 }
            />
          </Link>

          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}`
              : `${recipe.alcoholicOrNot} - ${recipe.category}`}
          </p>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

          {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
            <p key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
          ))}

          <button
            onClick={ () => handleClipBoard(`/meals/${recipe.id}`) }
          >
            <img
              src={ shareIcon }
              alt="share"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          {copy && <span>Link copied!</span>}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
