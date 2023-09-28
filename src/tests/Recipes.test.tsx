import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import ContextProvider from '../context/ContextProvider';
import { mockRecipes } from '../mocks/mockRecipes';

const mockApiRecipes = () => Promise.resolve({
  ok: true,
  json: () => Promise.resolve(mockRecipes),
});

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockImplementation(mockApiRecipes as any);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Verifica existência dos elementos do componente Recipe', () => {
  it('Verifica se o componente Recipe é renderizado', async () => {
    renderWithRouter(
      <ContextProvider>
        <App />
      </ContextProvider>,
      { route: '/meals' },
    );

    const api = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(api);

    const profile = screen.getByTestId(/profile-top-btn/i);
    const allButton = screen.getByTestId(/All-category-filter/i);
    const footerDrink = await screen.findByTestId(/drinks-bottom-btn/i);
    const footerMeal = await screen.findByTestId(/meals-bottom-btn/i);

    expect(profile).toBeInTheDocument();
    expect(allButton).toBeInTheDocument();

    expect(footerDrink).toBeInTheDocument();
    expect(footerMeal).toBeInTheDocument();

    // const recipeCard = screen.findByTestId(/0-recipe-card/i);
    // expect(recipeCard).toBeInTheDocument();
  });

  it('Verifica as chamadas da API quando clica nos botões das categorias', async () => {
    const { user } = renderWithRouter(
      <ContextProvider>
        <App />
      </ContextProvider>,
      { route: '/meals' },
    );

    const api = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(api);

    const profile = screen.getByTestId(/profile-top-btn/i);
    const allButton = screen.getByTestId(/All-category-filter/i);
    const footerDrink = await screen.findByTestId(/drinks-bottom-btn/i);
    const footerMeal = await screen.findByTestId(/meals-bottom-btn/i);

    expect(profile).toBeInTheDocument();
    expect(allButton).toBeInTheDocument();
    expect(footerDrink).toBeInTheDocument();
    expect(footerMeal).toBeInTheDocument();

    // await user.click(allButton);
    // const recipeCard = screen.findByTestId(/0-recipe-card/i);
    // expect(recipeCard).toBeInTheDocument();

    // const beefButton = screen.getByTestId(/Beef-category-filter/i);
    // expect(beefButton).toBeInTheDocument();
  });
});

describe('Verifica existência dos elementos do componente Drink', () => {
  it('Verifica se o componente Drink é renderizado', async () => {
    const { user } = renderWithRouter(
      <ContextProvider>
        <App />
      </ContextProvider>,
      { route: '/drinks' },
    );

    const api = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

    const profile = screen.getByTestId(/profile-top-btn/i);
    const allButton = screen.getByTestId(/All-category-filter/i);
    const footerDrink = await screen.findByTestId(/drinks-bottom-btn/i);
    const footerMeal = await screen.findByTestId(/meals-bottom-btn/i);

    expect(profile).toBeInTheDocument();
    expect(allButton).toBeInTheDocument();
    expect(footerDrink).toBeInTheDocument();
    expect(footerMeal).toBeInTheDocument();

    await user.click(allButton);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(api);
  });
});
