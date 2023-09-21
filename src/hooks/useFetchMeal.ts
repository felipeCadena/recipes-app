import { useState } from 'react';
import { MealsType } from '../types';

function useFetchMeal() {
  const [resultsApi, SetResultsApi] = useState<MealsType[]>();

  async function getApi(url: string, type: string, param: string) {
    const response = await fetch(`https://www.${url}.com/api/json/v1/1/${type}=${param}`);
    const { meals } = await response.json();
    SetResultsApi(meals);
  }

  return {
    getApi,
    resultsApi,
  };
}

export default useFetchMeal;
