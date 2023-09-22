import React, { useState, useEffect } from 'react';
import { useRecipeContext } from '../context/RecipesContext';
import { Recipe } from '../types';

function Drinks() {
  const { recipes, setRecipes } = useRecipeContext();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchDrinkCategories = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        const drinkCategories = data.drinks.map((category: any) => category.strCategory);
        setCategories(drinkCategories.slice(0, 5));
      } catch (error) {
        console.error('Erro ao carregar categorias de bebida', error);
      }
    };

    fetchDrinkCategories();
  }, []);

  const fetchRecipesByCategory = async (category: any) => {
    try {
      let url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
      if (category !== '') {
        url += category;
      }
      const response = await fetch(url);
      const data = await response.json();

      const recipeData = data.drinks;
      if (recipeData) {
        const recipesData: Recipe[] = recipeData
          .slice(0, 12)
          .map((item: any) => ({
            id: item.idDrink,
            name: item.strDrink,
            image: item.strDrinkThumb,
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
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();

      const recipeData = data.drinks;
      if (recipeData) {
        const recipesData: Recipe[] = recipeData
          .slice(0, 12)
          .map((item: any) => ({
            id: item.idDrink,
            name: item.strDrink,
            image: item.strDrinkThumb,
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
      <h1>Drinks</h1>
      <div>
        { categories.map((category) => (
          <button
            key={ category }
            data-testid={ `${category}-category-filter` }
            onClick={ () => fetchRecipesByCategory(category) }
          >
            { category }
          </button>
        )) }
        <button
          data-testid="All-category-filter"
          onClick={ () => fetchAllRecipes() }
        >
          All
        </button>
      </div>
      { filteredRecipes.map((recipe, index) => (
        <div key={ recipe.id } data-testid={ `${index}-recipe-card` }>
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

export default Drinks;
