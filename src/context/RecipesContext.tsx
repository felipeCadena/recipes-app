import React, { createContext, useContext, useEffect, useState } from 'react';
import { Recipe, RecipeProviderProps } from '../types';

type RecipeContextType = {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

function RecipeProvider({ children, apiURL, dataKey }: RecipeProviderProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(apiURL);
        const data = await response.json();

        const recipeData = data[dataKey];
        if (recipeData) {
          const recipesData: Recipe[] = recipeData
            .slice(0, 12)
            .map((item: any) => ({
              id: item.idMeal || item.idDrink,
              name: item.strMeal || item.strDrink,
              image: item.strMealThumb || item.strDrinkThumb,
              category: item.strCategory || '',
            }));

          setRecipes(recipesData);
        }
      } catch (error) {
        console.error('Erro ao carregar receitas', error);
      }
    };

    fetchRecipes();
  }, [apiURL, dataKey]);

  return (
    <RecipeContext.Provider value={ { recipes, setRecipes } }>
      {children}
    </RecipeContext.Provider>
  );
}

function useRecipeContext() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipeContext deve ser usado dentro de um RecipeProvider');
  }
  return context;
}

export { RecipeProvider, useRecipeContext };
