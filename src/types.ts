export interface MealsType {
  idMeal: string;
  strMeal: string;
  strCategory: string;
}

export interface GlobalContextType {
  getApi: (url: string, param: string, type: string) => void,
  resultsApi: MealsType[] | undefined,
}

export type Recipe = {
  id: string;
  name: string;
  image: string;
  category:string;
};

export type RecipeContextType = {
  recipes: Recipe[];
};

export type RecipeProviderProps = {
  children: React.ReactNode;
  apiURL: string;
  dataKey: string;
};

export type RecipesProps = {
  recipe: {
    id: string;
    name: string;
    image: string;
  };
  index: number;
};
