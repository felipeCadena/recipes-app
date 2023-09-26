import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import mockApi from '../mocks/mockApi';
import ContextProvider from '../context/ContextProvider';

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockImplementation(mockApi as any);
});

afterEach(() => {
  vi.restoreAllMocks();
});

const routeMeal = '/meals/52940';

const blackHeart = '/src/images/blackHeartIcon.svg';

describe('Verifica existência dos elementos do componente RecipeDetails', () => {
  it('Verifica se o componente RecipeDetails é renderizado', async () => {
    const { user } = renderWithRouter(
      <ContextProvider>
        <App />
      </ContextProvider>,
      { route: routeMeal },
    );

    const api = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52940';

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(api);
    const title = await screen.findByText(/Brown Stew Chicken/i);

    const sharedButton = await screen.findByTestId(/share-btn/i);
    const favoriteButton = await screen.findByTestId(/favorite-btn/i);
    const starButton = await screen.findByTestId(/start-recipe-btn/i);

    expect(title).toBeInTheDocument();
    expect(sharedButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(starButton).toBeInTheDocument();

    await user.click(sharedButton);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');

    const video = await waitFor(() => screen.getByTestId('video'));
    expect(video).toBeInTheDocument();

    await user.click(starButton);
    expect(window.location.pathname).toBe('/meals/52940/in-progress');
  });

  it('Verifica se o componente RecipeDetails é renderizado', async () => {
    const { user, rerender } = renderWithRouter(
      <ContextProvider>
        <App />
      </ContextProvider>,
      { route: routeMeal },
    );
    const favoriteButton = await screen.findByTestId(/favorite-btn/i);
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
    await user.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', blackHeart);

    rerender(
      <ContextProvider>
        <App />
      </ContextProvider>,
    );

    expect(favoriteButton).toHaveAttribute('src', blackHeart);

    const recoveryRecipe = JSON.parse(localStorage.getItem('favoriteRecipes') as string);
    expect(recoveryRecipe[0].id).toBe('52940');
  });

  it('Verifica se o componente Recommended é renderizado corretamente, na page Meal', async () => {
    renderWithRouter(
      <ContextProvider>
        <App />
      </ContextProvider>,
      { route: '/meals/52940' },
    );

    const api = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(api);
    const title = await screen.findByTestId(/0-recommendation-card/i);
    expect(title).toBeInTheDocument();

    const headingRecommended = await screen.findByText(/GG/i);
    expect(headingRecommended).toBeInTheDocument();
  });

  it('Verifica se o componente Recommended é renderizado corretamente na page Drink', async () => {
    renderWithRouter(
      <ContextProvider>
        <App />
      </ContextProvider>,
      { route: '/drinks/12668' },
    );

    const api = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(api);
  });
});
