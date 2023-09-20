import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Login from '../components/Login';
import { renderWithRouter } from './helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';

describe("Verifica existencia dos elementos do componente Login", ()  => {
  it('Verifica se o componente Login é renderizado', () => {
    renderWithRouter(<Login />);
    const loginTitle = screen.getByRole('heading', { name: /login/i });
    expect(loginTitle).toBeInTheDocument();
  });
  
  it('Verifica se o componente Login possui 2 inputs', () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
  
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
  
  it('Verifica se o componente Login possui 1 botão', () => {
    renderWithRouter(<Login />);
    const loginButton = screen.getByRole('button', { name: /enter/i });
    expect(loginButton).toBeInTheDocument();
  });
})


describe("Verifica se os data-testid estão corretos no componente Login", () => {
  it('Verifica o atributo data-testid do input de e-mail', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  });
  
  it('Verifica o atributo data-testid do input de senha', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const passwordInput = getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  });
  
  it('Verifica o atributo data-testid do botão Enter', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const submitButton = getByTestId('login-submit-btn');
    expect(submitButton).toBeInTheDocument();
  });
});

describe("Verifica se o usuário pode preencher os campos de input no componente Login", () => {
  it("Verifica se o usuário escreva o e-mail no input de e-mail", () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const emailInput = getByTestId("email-input") as HTMLInputElement;
    userEvent.type(emailInput, "trybe@email.com");

    expect(emailInput.value).toEqual("trybe@email.com");
  });

  it("Verifica se o usuário pode escrever a senha no input de senha", () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const passwordInput = getByTestId("password-input") as HTMLInputElement;
    userEvent.type(passwordInput, "minhasenha");

    expect(passwordInput.value).toEqual("minhasenha");
  });
})

describe("Verifica se o formulário só fica válido após e-mail válido e senha com mais de 6 caracteres", () => {
  it('O botão de login só fica válido após e-mail e senha válidos', () => {
    const { getByTestId, getByText } = renderWithRouter(<Login />);
  
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
  
    const submitButton = getByText('Enter');
  
    // Inicialmente, o botão deve estar desativado
    expect(submitButton).toBeDisabled();
  
    // Verifica se é um e-mail válido
    userEvent.type(emailInput, 'trybe@email.com');
  
    // O botão ainda deve estar desativado porque a senha ainda não tem 6 caracteres
    expect(submitButton).toBeDisabled();
  
    // Digite uma senha com 6 ou mais caracteres
    userEvent.type(passwordInput, 'senha123');
  
    // Agora o botão deve estar ativado
    expect(submitButton).not.toBeDisabled();
  });
})

describe("Verifica se salva o e-mail da pessoa usuária em localStorage após a submissão", () => {
  it("O e-mail da pessoa usuária deve ser salvo no localStorage após a submissão", () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");
    const loginSubmitBtn = getByTestId("login-submit-btn");

    userEvent.type(emailInput, "meuemail@exemplo.com");
    userEvent.type(passwordInput, "minhasenha");
    userEvent.click(loginSubmitBtn);

    expect(localStorage.getItem("user")).toEqual(JSON.stringify({ email: "meuemail@exemplo.com" }));
  });
});

describe("Verifica o redirecionamento após a submissão e cobertura de Login", () => {
  it("Verifica se redireciona a pessoa usuária para a tela principal de receitas de comidas após o login", () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");
    const loginSubmitBtn = getByTestId("login-submit-btn");

    userEvent.type(emailInput, "meuemail@exemplo.com");
    userEvent.type(passwordInput, "minhasenha");

    userEvent.click(loginSubmitBtn);

    waitFor(() => {
      expect(window.location.pathname).toEqual("/meals");
      expect(localStorage.getItem("user")).toEqual(JSON.stringify({ email: "meuemail@exemplo.com" }));
    });
  });
});
