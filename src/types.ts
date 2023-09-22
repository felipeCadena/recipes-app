export interface MealsType {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface DrinkType {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface GlobalContextType {
  getApi: (url: string, param: string, type: string) => void,
  resultsApi: DrinkType[] | MealsType[],
  loading: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>, s: string, r: string) => void,
}
