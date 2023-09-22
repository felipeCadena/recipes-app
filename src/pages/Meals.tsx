import { useState, useEffect } from 'react';
import { useRecipeContext } from '../context/RecipesContext';

function Meals() {
  const { recipes } = useRecipeContext();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchMealCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        const mealCategories = data.meals.map((category:any) => category.strCategory);
        setCategories(mealCategories.slice(0, 5));
      } catch (error) {
        console.error('Erro ao carregar categorias de comida', error);
      }
    };

    fetchMealCategories();
  }, []);

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
            onClick={ () => setSelectedCategory(category) }
          >
            { category }
          </button>
        ))}
        <button
          data-testid="all-category-filter"
          onClick={ () => setSelectedCategory('') }
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

export default Meals;
