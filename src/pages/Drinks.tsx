import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category, Recipe } from '../types';
import RenderApi from '../components/RenderApi';
import '../styles.css/Drinks.css';
import drinkIcon from '../iconsFigma/icone-bebida.svg';
import cocktail from '../iconsFigma/🦆 icon _cocktail_.svg';
import shake from '../iconsFigma/🦆 icon _drink_.svg';
import other from '../iconsFigma/🦆 icon _beer solid_.svg';
import cocoa from '../iconsFigma/Group 4.svg';
import ordinary from '../iconsFigma/🦆 icon _Drink Wine_.svg';
import GlobalContext from '../context/GlobalContext';
import '../styles.css/Global.css';

function Drinks() {
  const { choiceRender, setChoiceRender } = useContext(GlobalContext);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [previousCategory, setPreviousCategory] = useState('');
  const navigate = useNavigate();

  const fetchDrinkCategories = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const drinkCategories = data.drinks && data.drinks
      .map((category: Category) => category.strCategory);
    if (drinkCategories) {
      setCategories(drinkCategories.slice(0, 5));
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();

      const recipeData = data.drinks;
      if (recipeData) {
        const recipesfiltered: Recipe[] = recipeData
          .slice(0, 12)
          .map((item: any) => ({
            id: item.idMeal || item.idDrink,
            name: item.strMeal || item.strDrink,
            image: item.strMealThumb || item.strDrinkThumb,
            category: item.strCategory || '',
          }));

        setRecipes(recipesfiltered);
      }
    };
    fetchRecipes();
    fetchDrinkCategories();
  }, []);

  const fetchRecipes = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();

    const recipeData = data.drinks;
    if (recipeData) {
      const recipesData = recipeData
        .slice(0, 12)
        .map((item: any) => ({
          id: item.idDrink,
          name: item.strDrink,
          image: item.strDrinkThumb,
          category: item.strCategory,
        }));

      setRecipes(recipesData);
      setSelectedCategory('');
    }
    setChoiceRender(true);
  };

  const fetchAllRecipes = () => {
    fetchRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  };

  const fetchRecipesByCategory = (category: string) => {
    if (previousCategory && category === previousCategory) {
      fetchAllRecipes();
    } else {
      setPreviousCategory(category);
      const url = category ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}` : '';
      fetchRecipes(url);
    }
    setChoiceRender(true);
  };

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/drinks/${recipeId}`);
  };

  const filteredRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.category === selectedCategory)
    : recipes;

  console.log(choiceRender);

  return (
    <>
      <header className="header-sty">
        <div className="header-filha">
          <div className="drk-bar-cont">
            <img
              className="drink-bar"
              src={ drinkIcon }
              alt=""
            />
          </div>
          <div className="ordinary">
            <img
              src={ ordinary }
              alt=""
            />
          </div>
          <div className="cocktail">
            <img
              src={ cocktail }
              alt=""
            />
          </div>
          <div className="shake">
            <img
              src={ shake }
              alt=""
            />
          </div>
          <div className="other">
            <img
              src={ other }
              alt=""
            />
          </div>
          <div className="cocoa">
            <img
              src={ cocoa }
              alt=""
            />
          </div>
        </div>
      </header>
      <div className="drink-container">
        <button
          className="btn-all btn btn-light"
          data-testid="All-category-filter"
          onClick={ fetchAllRecipes }
        >
          All
        </button>
        { categories.map((category) => (
          <button
            key={ category }
            data-testid={ `${category}-category-filter` }
            onClick={ () => fetchRecipesByCategory(category) }
            className="drink-btn btn btn-light"
          >
            { category }
          </button>
        ))}
      </div>
      <div className="drink-cont">
        { choiceRender && filteredRecipes && filteredRecipes.map((recipe, index) => (
          <div
            className="drinks-options"
            key={ recipe.id }
            data-testid={ `${index}-recipe-card` }
            role="button"
            onClick={ () => handleRecipeClick(recipe.id) }
            onKeyDown={ (e) => {
              if (e.key === 'Enter' || e.key === 'Space') {
                handleRecipeClick(recipe.id);
              }
            } }
            tabIndex={ 0 }
          >
            <img
              className="drink-image"
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-card-img` }
              width={ 100 }
            />
            <p
              className="drink-card"
              data-testid={ `${index}-card-name` }
            >
              { recipe.name }
            </p>
          </div>
        )) }
      </div>
      { !choiceRender && <RenderApi patch="drinks" /> }
    </>
  );
}

export default Drinks;
