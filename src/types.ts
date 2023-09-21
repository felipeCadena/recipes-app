export interface MealsType {
  idMeal: string;
  strMeal: string;
  strCategory: string;
}

export interface GlobalContextType {
  getApi: (url: string, param: string, type: string) => void,
  resultsApi: MealsType[] | undefined,
}
