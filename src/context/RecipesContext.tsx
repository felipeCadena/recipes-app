import React, { createContext, useContext, useEffect, useState } from 'react';
import { Recipe, RecipeContextType, RecipeProviderProps } from '../types';

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

//  Compartilhar e acessar dados de receitas em vários partes da aplicação.

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
    <RecipeContext.Provider value={ { recipes } }>
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
