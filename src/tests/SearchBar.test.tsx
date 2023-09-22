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

describe('Verifica existência dos elementos do componente SearchBar', () => {
  it('Verifica se o componente SearchBar é renderizado', async () => {
    const { user } = renderWithRouter(
      <ContextProvider>
        <App />
      </ContextProvider>,
      { route: '/meals' },
    );
    const button = screen.getByTestId(/search-top-btn/i);
    expect(button).toBeInTheDocument();

    await user.click(button);
    const buttonSearch = screen.getByTestId('exec-search-btn');
    expect(buttonSearch).toBeInTheDocument();
    const inputIngredient = await screen.findByTestId(/ingredient-search-radio/i);
    expect(inputIngredient).toBeInTheDocument();
    const inputSearch = screen.getByTestId(/search-input/i) as HTMLInputElement;
    await user.type(inputSearch, 'chicken');

    expect(inputSearch.value).toEqual('chicken');

    await user.click(buttonSearch);

    const api = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken';

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(api);

    await waitFor(() => {
      expect(screen.queryByText('Carregando...')).toBeNull();
    });
    const recipe = await screen.findByAltText(/Brown Stew Chicken/i);
    expect(recipe).toBeInTheDocument();
  });

  it('Verifica a função HandleChange e o submit', async () => {
    const { user } = renderWithRouter(
      <ContextProvider>
        <App />
      </ContextProvider>,
      { route: '/meals' },
    );
    const button = screen.getByAltText(/search/i);
    user.click(button);
    const buttonSearch = screen.getByRole('button', { name: /search/i });

    const inputIngredient = await screen.findByTestId(/ingredient-search-radio/i);
    await user.click(inputIngredient);

    const inputSearch = await screen.findByPlaceholderText(/search/i) as HTMLInputElement;
    await user.type(inputSearch, 'chicken');
    await user.click(buttonSearch);

    await waitFor(() => {
      expect(screen.queryByText('Carregando...')).toBeNull();
    });
    // const recipe = screen.findByAltText(/Brown Stew Chicken/i);
    // expect(recipe).toBeInTheDocument();
  });
});

it('Verificar o alert da página', async () => {
  const { user } = renderWithRouter(
    <ContextProvider>
      <App />
    </ContextProvider>,
    { route: '/meals' },
  );

  const alert = vi.spyOn(window, 'alert').mockImplementation(() => {});
  const button = screen.getByAltText(/search/i);
  user.click(button);
  const buttonSearch = screen.getByRole('button', { name: /search/i });

  const inputIngredient = await screen.findByTestId(/first-letter-search-radio/i);
  await user.click(inputIngredient);

  const inputSearch = await screen.findByPlaceholderText(/search/i) as HTMLInputElement;
  await user.type(inputSearch, 'chicken');
  await user.click(buttonSearch);

  await waitFor(() => {
    alert.mockRestore();
  });
});
