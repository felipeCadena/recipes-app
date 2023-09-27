import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import ContextProvider from '../context/ContextProvider';

describe('Verifica existência dos elementos do componente FavoriteRecipes', () => {
  it('Verifica se o componente FavoriteRecipes é renderizado', async () => {
    renderWithRouter(
      <ContextProvider>
        <App />
      </ContextProvider>,
      { route: '/favorite-recipes' },
    );

    const profile = screen.getByTestId(/profile-top-btn/i);
    const allButton = screen.getByTestId(/filter-by-all-btn/i);
    const mealButton = screen.getByTestId(/filter-by-meal-btn/i);
    const drinkButton = screen.getByTestId(/filter-by-drink-btn/i);

    const footerDrink = await screen.findByTestId(/drinks-bottom-btn/i);
    const footerMeal = await screen.findByTestId(/meals-bottom-btn/i);

    expect(profile).toBeInTheDocument();
    expect(allButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
    expect(footerDrink).toBeInTheDocument();
    expect(footerMeal).toBeInTheDocument();
  });
});
