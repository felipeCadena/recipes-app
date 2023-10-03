import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import { MealsType, DrinkType } from '../types';
import '../styles/RenderApi.css'

type RenderProp = {
  patch: string,
};

export default function RenderApi({ patch }: RenderProp) {
  const { resultsApi, loading } = useContext(GlobalContext);

  const navigate = useNavigate();

  const filteredResults = resultsApi?.slice(0, 12);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  console.log(filteredResults);

  if (filteredResults?.length === 1) {
    const item = resultsApi[0];

    if ('idMeal' in item) { // se tiver a chave idMeal em item (index 0 do retorno da API)
      navigate(`/${patch}/${item.idMeal}`);
    } else if ('idDrink' in item) {
      navigate(`/${patch}/${item.idDrink}`);
    }
  }

  if (!filteredResults) {
    window.alert("Sorry, we haven't found any recipes for these filters.");
  }

  if (filteredResults?.length > 1) {
    return (
      <div className='meal-drink'>
        {patch === 'drinks'
      && (filteredResults as DrinkType[]).map((result, index) => (
        <div
        className='drink-pesquisa'
          key={ result.idDrink }
          data-testid={ `${index}-recipe-card` }
        >
          <h2 className='drinks-card-pesquisa' data-testid={ `${index}-card-name` }>{result.strDrink}</h2>
          <img
          className='drinks-img-pesquisa'
            src={ result.strDrinkThumb }
            alt={ result.strDrink }
            data-testid={ `${index}-card-img` }
            width={ 100 }
          />
        </div>
      ))}
        {patch === 'meals' && (filteredResults as MealsType[]).map((result, index) => (
          <div
          className='meals-pesquisa'
            key={ result.idMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <h2 className='meals-card-pesquisa' data-testid={ `${index}-card-name` }>{result.strMeal}</h2>
            <img
            className='meals-img-pesquisa'
              src={ result.strMealThumb }
              alt={ result.strMeal }
              data-testid={ `${index}-card-img` }
              width={ 100 }
            />
          </div>
        ))}
      </div>
    );
  }
}
