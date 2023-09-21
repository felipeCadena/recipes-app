import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
// import { useLocation } from 'react-router-dom';
// import App from '../App';
import Header from '../components/Header';
import { renderWithRouter } from './helpers/renderWithRouter';

// const mock = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual<any>('react-router-dom'),
  useLocation: jest.fn(),
}));

// const PROFILE_BTN_TEST_ID = 'profile-top-btn';
const PAGE_TITLE_TEST_ID = 'page-title';

describe('Verifica se o título da página é renderizado corretamente', () => {
  it('Deve renderizar o título da página corretamente na rota inicial', () => {
    renderWithRouter(<Header />, { route: '/' });
    const pageTitle = screen.getByTestId(PAGE_TITLE_TEST_ID);
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Home');
    expect(pageTitle).toHaveTextContent('Meals');
    expect(pageTitle).toHaveTextContent('Drinks');
  });

  it('Deve renderizar o título Drinks na rota de bebidas', () => {
    renderWithRouter(<Header />, { route: '/drinks' });
    const pageDrinkTitle = screen.getByTestId(PAGE_TITLE_TEST_ID);
    expect(pageDrinkTitle).toBeInTheDocument();
    expect(pageDrinkTitle).toHaveTextContent('Drinks');
  });
});
