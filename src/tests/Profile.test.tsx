import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import ContextProvider from '../context/ContextProvider';

describe('Verifica existência dos elementos do componente Profile', () => {
  it('Verifica se o componente Profile é renderizado corretamente', async () => {
    const { user } = renderWithRouter(
      <ContextProvider>
        <App />
      </ContextProvider>,
      { route: '/profile' },
    );
    const profile = screen.getByTestId(/profile-top-btn/i);
    const doneButton = screen.getByTestId(/profile-done-btn/i);
    const favoriteButton = screen.getByTestId(/profile-favorite-btn/i);
    const logoutButton = screen.getByTestId(/profile-logout-btn/i);

    const profileEmail = await screen.findByTestId('profile-email');

    expect(profile).toBeInTheDocument();
    expect(doneButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    expect(profileEmail).toBeInTheDocument();

    await user.click(logoutButton);
    expect(window.location.pathname).toBe('/');
  });

  it('Verifica localStorage', async () => {
    const login = { email: 'trybe@trybe.com.br' };
    localStorage.setItem('user', JSON.stringify(login));

    renderWithRouter(
      <ContextProvider>
        <App />
      </ContextProvider>,
      { route: '/profile' },
    );

    const { email } = JSON.parse(localStorage.getItem('user') as string);
    expect(email).toBe('trybe@trybe.com.br');
  });
});
