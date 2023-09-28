import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category, Recipe } from '../types';
import RenderApi from '../components/RenderApi';
import GlobalContext from '../context/GlobalContext';

function Meals() {
  const { choiceRender, setChoiceRender } = useContext(GlobalContext);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [previousCategory, setPreviousCategory] = useState('');
  const navigate = useNavigate();

  const fetchMealCategories = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const mealCategories = data.meals.map((category:Category) => category.strCategory);
    setCategories(mealCategories.slice(0, 5));
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();

      const recipeData = data.meals;
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
    fetchMealCategories();
  }, []);

  const fetchRecipes = async (url:string) => {
    const response = await fetch(url);
    const data = await response.json();

    const recipeData = data.meals;
    if (recipeData) {
      const recipesfiltered = recipeData
        .slice(0, 12)
        .map((item:any) => ({
          id: item.idMeal,
          name: item.strMeal,
          image: item.strMealThumb || 'URL_DA_IMAGEM_PADRAO',
          category: item.strCategory,
        }));

      setRecipes(recipesfiltered);
      setSelectedCategory('');
    }
    setChoiceRender(true);
  };

  const fetchAllRecipes = () => {
    fetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  };

  const fetchRecipesByCategory = (category:any) => {
    if (previousCategory && category === previousCategory) {
      fetchAllRecipes();
    } else {
      setPreviousCategory(category);
      const url = category ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}` : '';
      fetchRecipes(url);
    }
    setChoiceRender(true);
  };

  const handleRecipeClick = (recipeId:string) => {
    navigate(`/meals/${recipeId}`);
  };

  const filteredRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.category === selectedCategory)
    : recipes;

  return (
    <>
      <div>
        {categories.map((category) => (
          <button
            key={ category }
            data-testid={ `${category}-category-filter` }
            onClick={ () => fetchRecipesByCategory(category) }
          >
            {category}
          </button>
        ))}
        <button data-testid="All-category-filter" onClick={ fetchAllRecipes }>
          All
        </button>
      </div>
      {choiceRender && filteredRecipes && filteredRecipes.map((recipe, index) => (
        <div
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
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-card-img` }
            width={ 100 }
          />
          <p data-testid={ `${index}-card-name` }>{recipe.name}</p>
        </div>
      ))}
      {!choiceRender && <RenderApi patch="meals" />}
    </>
  );
}

export default Meals;
