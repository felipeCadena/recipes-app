import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipeContext } from '../context/RecipesContext';
import { Recipe } from '../types';

function Meals() {
  const { recipes, setRecipes } = useRecipeContext();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [previousCategory, setPreviousCategory] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMealCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        const mealCategories = data.meals.map((category: any) => category.strCategory);
        setCategories(mealCategories.slice(0, 5));
      } catch (error) {
        console.error('Erro ao carregar categorias de comida', error);
      }
    };

    fetchMealCategories();
  }, []);

  const fetchRecipesByCategory = async (category: any) => {
    try {
      if (category === previousCategory) {
        // Se a categoria é a mesma, retornar as 12 primeiras receitas sem filtro
        await fetchAllRecipes();
        return;
      }

      setPreviousCategory(category); // Armazena a categoria atual como a anterior

      let url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
      if (category !== '') {
        url += category;
      }
      const response = await fetch(url);
      const data = await response.json();

      const recipeData = data.meals;
      if (recipeData) {
        const recipesData: Recipe[] = recipeData
          .slice(0, 12)
          .map((item: any) => ({
            id: item.idMeal,
            name: item.strMeal,
            image: item.strMealThumb || 'URL_DA_IMAGEM_PADRAO',
            category: item.strCategory,
          }));

        setRecipes(recipesData);
      }
    } catch (error) {
      console.error('Erro ao carregar receitas por categoria', error);
    }
  };

  const fetchAllRecipes = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();

      const recipeData = data.meals;
      if (recipeData) {
        const recipesData: Recipe[] = recipeData
          .slice(0, 12)
          .map((item: any) => ({
            id: item.idMeal,
            name: item.strMeal,
            image: item.strMealThumb || 'URL_DA_IMAGEM_PADRAO',
            category: item.strCategory,
          }));

        setRecipes(recipesData);
        setSelectedCategory(''); // Limpa a categoria selecionada
      }
    } catch (error) {
      console.error('Erro ao carregar todas as receitas', error);
    }
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
        <button
          data-testid="All-category-filter"
          onClick={ () => fetchAllRecipes() }
        >
          All
        </button>
      </div>
      { filteredRecipes.map((recipe, index) => (
        <div
          key={ recipe.id }
          data-testid={ `${index}-recipe-card` }
          role="button" // Adicione role="button" para torná-lo interativo
          onClick={ () => navigate(`/meals/${recipe.id}`) }
          onKeyDown={ (e) => {
            if (e.key === 'Enter' || e.key === 'Space') {
              navigate(`/meals/${recipe.id}`);
            }
          } }
          tabIndex={ 0 }
        >
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ recipe.name }</p>
        </div>
      ))}

    </div>
  );
}

export default Meals;
