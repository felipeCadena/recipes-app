import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

const email = 'email-input';
const password = 'password-input';
const loginBtn = 'login-submit-btn';

describe('Verifica existência dos elementos do componente Login', () => {
  it('Verifica se o componente Login é renderizado', () => {
    const { getByRole } = renderWithRouter(<App />);
    const loginTitle = getByRole('heading', { name: /login/i });
    expect(loginTitle).toBeInTheDocument();
  });

  it('Verifica se o componente Login possui 2 inputs', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = getByTestId(password);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('Verifica se o componente Login possui 1 botão', () => {
    const { getByText } = renderWithRouter(<App />);
    const submitButton = getByText('Enter');
    expect(submitButton).toBeInTheDocument();
  });
});

describe('Verifica se os data-testid estão corretos no componente Login', () => {
  it('Verifica o atributo data-testid dos elementos de Login', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(email);
    const passwordInput = getByTestId(password);
    const submitButton = getByTestId(loginBtn);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});

describe('Verifica se o usuário pode preencher os campos de input no componente Login', () => {
  const emailTeste = 'trybe@email.com';
  it('Verifica se o usuário escreve o e-mail no input de e-mail', async () => {
    const { getByTestId, user } = renderWithRouter(<App />);

    const emailInput = getByTestId(email) as HTMLInputElement;
    await user.type(emailInput, emailTeste);

    expect(emailInput.value).toEqual(emailTeste);
  });

  it('Verifica se o usuário pode escrever a senha no input de senha', async () => {
    const { getByTestId } = renderWithRouter(<App />);
    const passwordInput = getByTestId(password) as HTMLInputElement;
    await userEvent.type(passwordInput, 'minhasenha');
    expect(passwordInput.value).toEqual('minhasenha');
  });
});

describe('Verifica se o formulário só fica válido após e-mail válido e senha com mais de 6 caracteres', () => {
  it('O botão de login só fica válido após e-mail e senha válidos', async () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const emailInput = getByTestId(email);
    const passwordInput = getByTestId(password);
    const submitButton = getByText('Enter', { selector: 'button' }) as HTMLButtonElement;
    expect(submitButton).toBeDisabled();
    await userEvent.type(emailInput, 'trybe@email.com');
    expect(submitButton).toBeDisabled();
    await userEvent.type(passwordInput, 'senha123');
    expect(submitButton).not.toBeDisabled();
  });
});

describe('Verifica se salva o e-mail da pessoa usuária em localStorage após a submissão', () => {
  it('O e-mail da pessoa usuária deve ser salvo no localStorage após a submissão', async () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailTeste = 'meuemail@exemplo.com';

    const emailInput = getByTestId('email-input') as HTMLInputElement;
    const passwordInput = getByTestId('password-input') as HTMLInputElement;
    const loginSubmitBtn = getByTestId(loginBtn);
    await userEvent.type(emailInput, emailTeste);
    await userEvent.type(passwordInput, 'minhasenha');
    await userEvent.click(loginSubmitBtn);
    expect(localStorage.getItem('user')).toEqual(JSON.stringify({ email: emailTeste }));
  });
});

describe('Verifica o redirecionamento após a submissão e cobertura de Login', () => {
  it('Verifica se redireciona a pessoa usuária para a tela principal de receitas de comidas após o login', async () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailTeste = 'meuemail@exemplo.com';
    const emailInput = getByTestId(email);
    const passwordInput = getByTestId(password);
    const loginSubmitBtn = getByTestId(loginBtn);
    await userEvent.type(emailInput, emailTeste);
    await userEvent.type(passwordInput, 'minhasenha');
    await userEvent.click(loginSubmitBtn);
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/meals');
      expect(localStorage.getItem('user')).toEqual(JSON.stringify({ email: emailTeste }));
    });
  });
});
