export interface MealsType {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strInstructions: string;
  strYoutube: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
}

export interface DrinkType {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strAlcoholic: string;
  strIngredient1: string;
  strIngredient2: string;
  strInstructions: string;
  strVideo: string;
  strCategory: string;
  strMeasure2: string;
}

export interface DoneRecipesType {
  id: string;
  type: string;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  doneDate: string;
  tags: string;
}

export interface InProgressRecipesType {
  drinks: {
    id: string[],
  },
  meals: {
    id: string[],
  }
}

export interface GlobalContextType {
  getApi: (url: string, param: string, type: string) => void,
  resultsApi: DrinkType[] | MealsType[],
  loading: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, s: string, r: string) => void,
}
