import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import Header from '../components/Header';
import { renderWithRouter } from './helpers/renderWithRouter';

const PROFILE_BTN_TEST_ID = 'profile-top-btn';
const SEARCH_TOP_BTN_TEST_ID = 'search-top-btn';
const PAGE_TITLE_TEST_ID = 'page-title';
// const SEARCH_INPUT = 'search-input';
describe('Verifica renderização do Header em diferentes rotas', () => {
  it('Deve renderizar o componente Header corretamente', () => {
    renderWithRouter(<Header />);
    const profileIcon = screen.getByTestId(PROFILE_BTN_TEST_ID);
    expect(profileIcon).toBeInTheDocument();
    const pageTitle = screen.getByTestId(PAGE_TITLE_TEST_ID);
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Home');
  });
  it('Verifica se navegar para a página de perfil ao clicar no ícone de perfil', () => {
    renderWithRouter(<Header />);
    const profileIcon = screen.getByTestId(PROFILE_BTN_TEST_ID);
    userEvent.click(profileIcon);
  });
});
describe('Teste dos títulos de página no Header', () => {
  it('Deve renderizar o título "Home" na rota inicial', () => {
    renderWithRouter(<Header />);
    const pageTitle = screen.getByTestId(PAGE_TITLE_TEST_ID);
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Home');
  });
  it('Deve renderizar o título "Meals" na rota "/meals"', () => {
    renderWithRouter(<Header />, { route: '/meals' });
    const pageTitle = screen.getByTestId(PAGE_TITLE_TEST_ID);
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Meals');
  });
  it('Deve renderizar o título "Drinks" na rota "/drinks"', () => {
    renderWithRouter(<Header />, { route: '/drinks' });
    const pageTitle = screen.getByTestId(PAGE_TITLE_TEST_ID);
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Drinks');
  });
  it('Deve renderizar o título "Profile" na rota "/profile"', () => {
    renderWithRouter(<Header />, { route: '/profile' });
    const pageTitle = screen.getByTestId(PAGE_TITLE_TEST_ID);
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Profile');
  });
  it('Deve renderizar o título "Done Recipes" na rota "/done-recipes"', () => {
    renderWithRouter(<Header />, { route: '/done-recipes' });
    const pageTitle = screen.getByTestId(PAGE_TITLE_TEST_ID);
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Done Recipes');
  });
  it('Deve renderizar o título "Favorite Recipes" na rota "/favorite-recipes"', () => {
    renderWithRouter(<Header />, { route: '/favorite-recipes' });
    const pageTitle = screen.getByTestId(PAGE_TITLE_TEST_ID);
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Favorite Recipes');
  });
});
describe('Verifica se os data-testid estão corretos em seus respectivos elementos', () => {
  it('Deve renderizar o ícone de perfil com o data-testid correto', () => {
    renderWithRouter(<Header />);
    const profileIcon = screen.getByTestId(PROFILE_BTN_TEST_ID);
    expect(profileIcon).toBeInTheDocument();
    expect(profileIcon.getAttribute('data-testid')).toBe(PROFILE_BTN_TEST_ID);
  });
  it('Deve renderizar o título da página com o data-testid correto', () => {
    renderWithRouter(<Header />);
    const titleDataTestid = screen.getByTestId(PAGE_TITLE_TEST_ID);
    expect(titleDataTestid).toBeInTheDocument();
    expect(titleDataTestid.getAttribute('data-testid')).toBe(PAGE_TITLE_TEST_ID);
  });
});
describe('Verifica a renderização do botão de pesquisa', () => {
  it('Deve renderizar o botão de pesquisa na rota "/meals"', () => {
    renderWithRouter(<Header />, { route: '/meals' });
    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN_TEST_ID);
    expect(searchIcon).toBeInTheDocument();
  });
  it('Deve renderizar o botão de pesquisa na rota "/drinks"', () => {
    renderWithRouter(<Header />, { route: '/drinks' });
    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN_TEST_ID);
    expect(searchIcon).toBeInTheDocument();
  });
  it('Não deve renderizar o botão de pesquisa em outras rotas', () => {
    renderWithRouter(<App />, { route: '/' });
    const searchIconHome = screen.queryByTestId(SEARCH_TOP_BTN_TEST_ID);
    expect(searchIconHome).toBeNull();
    renderWithRouter(<App />, { route: '/profile' });
    const searchIconProfile = screen.queryByTestId(SEARCH_TOP_BTN_TEST_ID);
    expect(searchIconProfile).toBeNull();
    renderWithRouter(<App />, { route: '/done-recipes' });
    const searchIconDoneRecipes = screen.queryByTestId(SEARCH_TOP_BTN_TEST_ID);
    expect(searchIconDoneRecipes).toBeNull();
    renderWithRouter(<App />, { route: '/favorite-recipes' });
    const searchIconFavoriteRecipes = screen.queryByTestId(SEARCH_TOP_BTN_TEST_ID);
    expect(searchIconFavoriteRecipes).toBeNull();
    renderWithRouter(<App />, { route: '/meals/1' });
    const searchIconMealDetails = screen.queryByTestId(SEARCH_TOP_BTN_TEST_ID);
    expect(searchIconMealDetails).toBeNull();
    renderWithRouter(<App />, { route: '/drinks/1' });
    const searchIconDrinkDetails = screen.queryByTestId(SEARCH_TOP_BTN_TEST_ID);
    expect(searchIconDrinkDetails).toBeNull();
    renderWithRouter(<App />, { route: '/meals/1/in-progress' });
    const searchIconMealInProgress = screen.queryByTestId(SEARCH_TOP_BTN_TEST_ID);
    expect(searchIconMealInProgress).toBeNull();
    renderWithRouter(<App />, { route: '/drinks/1/in-progress' });
    const searchIconDrinkInProgress = screen.queryByTestId(SEARCH_TOP_BTN_TEST_ID);
    expect(searchIconDrinkInProgress).toBeNull();
  });
});
describe('Teste de renderização condicional no Header', () => {
  it('Não deve renderizar o botão de pesquisa quando showSearchIcon é falso', () => {
    renderWithRouter(<Header />);
    const searchButton = screen.queryByTestId('search-button');
    expect(searchButton).toBeNull();
  });
});
