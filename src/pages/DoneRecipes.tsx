import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipesType } from '../types';
import shareIcon from '../images/shareIcon.svg';
import GlobalContext from '../context/GlobalContext';
import '../styles.css/DoneRecipes.css'
import done from '../iconsFigma/aprovado.svg';
import food from '../iconsFigma/icone-prato.svg';
import bebida from '../iconsFigma/icone-bebida.svg';
import all from '../iconsFigma/🦆 icon _fast food outline_.svg';
import share from '../iconsFigma/Share.svg';



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
  console.log(doneRecipes);
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
      console.log(filtered);
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
    <div className="done-edit">
      <div>
        <img className='done-image' src={done} alt="" />
      </div>
      <div className='images-done'>
      <img
      src={all}
      alt=""
      />
       <img
      src={food}
      alt=""
      />
       <img
      src={bebida}
      alt=""
      />
      </div>
      <div className="done-buttons">
      <button
        className="meals-btn-done btn btn-light"
        data-testid="filter-by-meal-btn"
        onClick={ () => filterRecipes('Meals') }
      >
        Meals
      </button>
      <button
        className="drinks-btn-done btn btn-light"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterRecipes('Drinks') }
      >
        Drinks
      </button>
      <button
        className="all-btn-done btn btn-light"
        data-testid="filter-by-all-btn"
        onClick={ () => filterRecipes('All') }
      >
        All
      </button>
      </div>
      
      {filteredRecipes.map((recipe, index) => (
        <div className='indice' key={ index }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              className="image-drink-meals"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
              width={ 200 }
            />
          </Link>
            <div className="paragrafos">
          <p className="paragraph-um" data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}`
              : `${recipe.alcoholicOrNot} - ${recipe.category}`}
          </p>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <p  className="link-done" data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          <p className="paragraph-dois" data-testid={ `${index}-horizontal-done-date` }>Done in: {recipe.doneDate}</p>
          </div>
          {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
            <p  key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
          ))}

          <button
            className='button-share-dones'
            onClick={ () => handleClipBoard(`/meals/${recipe.id}`) }
          >
            <img
              className='img-share-dones'
              src={ share }
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