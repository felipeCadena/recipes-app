import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipeContext } from '../context/RecipesContext';
import { Category } from '../types';
import RenderApi from '../components/RenderApi';

function Meals() {
  const { recipes, setRecipes } = useRecipeContext();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [previousCategory, setPreviousCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMealCategories();
  }, []);

  const fetchMealCategories = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const mealCategories = data.meals.map((category:Category) => category.strCategory);
      setCategories(mealCategories.slice(0, 5));
    } catch (error) {
      console.error('Erro ao carregar categorias de comida', error);
    }
  };

  const fetchRecipes = async (url:string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      const recipeData = data.meals;
      if (recipeData) {
        const recipesData = recipeData
          .slice(0, 12)
          .map((item:any) => ({
            id: item.idMeal,
            name: item.strMeal,
            image: item.strMealThumb || 'URL_DA_IMAGEM_PADRAO',
            category: item.strCategory,
          }));

        setRecipes(recipesData);
        setSelectedCategory('');
      }
    } catch (error) {
      console.error('Erro ao carregar receitas', error);
    }
  };

  const fetchAllRecipes = () => {
    fetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  };

  const fetchRecipesByCategory = (category:any) => {
    if (category === previousCategory) {
      fetchAllRecipes();
      return;
    }

    setPreviousCategory(category);
    const url = category ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}` : '';
    fetchRecipes(url);
  };

  const handleRecipeClick = (recipeId:string) => {
    navigate(`/meals/${recipeId}`);
  };

  const filteredRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.category === selectedCategory)
    : recipes;

  return (
    <div>
      <h1>Meals</h1>
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
      {filteredRecipes.map((recipe, index) => (
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
          />
          <p data-testid={ `${index}-card-name` }>{recipe.name}</p>
        </div>
      ))}
    </div>
    <RenderApi patch="meals" />
  );
}

export default Meals;
