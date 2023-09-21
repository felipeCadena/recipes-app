import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Verifica existência dos elementos do componente Login', () => {
  let emailInput: HTMLElement; let passwordInput: HTMLElement; let
    submitButton: HTMLElement;

  beforeEach(() => {
    const { getByTestId, getByText } = renderWithRouter(<Login />);
    emailInput = getByTestId('email-input');
    passwordInput = getByTestId('password-input');
    submitButton = getByText('Enter');
  });

  it('Verifica se o componente Login é renderizado', () => {
    const loginTitle = screen.getByRole('heading', { name: /login/i });
    expect(loginTitle).toBeInTheDocument();
  });

  it('Verifica se o componente Login possui 2 inputs', () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('Verifica se o componente Login possui 1 botão', () => {
    expect(submitButton).toBeInTheDocument();
  });
});

describe('Verifica se os data-testid estão corretos no componente Login', () => {
  let emailInput: HTMLElement; let passwordInput: HTMLElement; let
    submitButton: HTMLElement;

  beforeEach(() => {
    const { getByTestId } = renderWithRouter(<Login />);
    emailInput = getByTestId('email-input');
    passwordInput = getByTestId('password-input');
    submitButton = getByTestId('login-submit-btn');
  });

  it('Verifica o atributo data-testid dos elementos de Login', () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});

describe('Verifica se o usuário pode preencher os campos de input no componente Login', () => {
  it('Verifica se o usuário escreve o e-mail no input de e-mail', () => {
    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    userEvent.type(emailInput, 'trybe@email.com');
    expect(emailInput.value).toEqual('trybe@email.com');
  });

  it('Verifica se o usuário pode escrever a senha no input de senha', () => {
    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
    userEvent.type(passwordInput, 'minhasenha');
    expect(passwordInput.value).toEqual('minhasenha');
  });
});

describe('Verifica se o formulário só fica válido após e-mail válido e senha com mais de 6 caracteres', () => {
  it('O botão de login só fica válido após e-mail e senha válidos', () => {
    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
    const submitButton = screen.getByText('Enter', { selector: 'button' }) as HTMLButtonElement;
    expect(submitButton).toBeDisabled();
    userEvent.type(emailInput, 'trybe@email.com');
    expect(submitButton).toBeDisabled();
    userEvent.type(passwordInput, 'senha123');
    expect(submitButton).not.toBeDisabled();
  });
});

describe('Verifica se salva o e-mail da pessoa usuária em localStorage após a submissão', () => {
  it('O e-mail da pessoa usuária deve ser salvo no localStorage após a submissão', () => {
    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
    const loginSubmitBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'meuemail@exemplo.com');
    userEvent.type(passwordInput, 'minhasenha');
    userEvent.click(loginSubmitBtn);
    expect(localStorage.getItem('user')).toEqual(JSON.stringify({ email: 'meuemail@exemplo.com' }));
  });
});

describe('Verifica o redirecionamento após a submissão e cobertura de Login', () => {
  it('Verifica se redireciona a pessoa usuária para a tela principal de receitas de comidas após o login', async () => {
    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
    const loginSubmitBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'meuemail@exemplo.com');
    userEvent.type(passwordInput, 'minhasenha');
    userEvent.click(loginSubmitBtn);
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/meals');
      expect(localStorage.getItem('user')).toEqual(JSON.stringify({ email: 'meuemail@exemplo.com' }));
    });
  });
});
