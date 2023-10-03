import { useLocation } from 'react-router-dom';
import { DrinkType, MealsType } from '../../types';
import './Recommended.css';

type RecipeCardProp = {
  recomendations: MealsType[] | DrinkType[];
};

export default function Recommended({ recomendations }: RecipeCardProp) {
  const filtered = recomendations && recomendations.slice(0, 6);

  const { pathname } = useLocation();

  if (filtered) {
    return (
      <>
        <p className="recomended-paragraph">Recommended</p>
        <div className="recomended-container">
          {pathname.includes('drinks') && (filtered as MealsType[])
            .map((recomendation, index) => (
              <div
                key={ recomendation.idMeal }
                data-testid={ `${index}-recommendation-card` }
              >
                <img
                  src={ recomendation.strMealThumb }
                  alt={ recomendation.strMeal }
                  width={ 180 }
                />
                <h5
                  data-testid={ `${index}-recommendation-title` }
                >
                  {recomendation.strMeal}
                </h5>
              </div>
            ))}
          {pathname.includes('meals') && (filtered as DrinkType[])
            .map((recomendation, index) => (
              <div
                key={ recomendation.idDrink }
                data-testid={ `${index}-recommendation-card` }
              >
                <img
                  className="meals-recomend"
                  src={ recomendation.strDrinkThumb }
                  alt={ recomendation.strDrink }
                  width={ 180 }
                />
                <p
                  className="descricao-img-meals"
                  data-testid={ `${index}-recommendation-title` }
                >
                  {recomendation.strDrink}
                </p>
              </div>
            ))}
        </div>
      </>
    );
  }
}
