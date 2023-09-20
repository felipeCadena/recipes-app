import { useState } from 'react';

const data = {
  email: '',
  password: '',
};

export default function Login() {
  const [login, setLogin] = useState(data);
  const { email, password } = login;

  const validLogin = /^[ a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && password.length > 6;

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = target;
    setLogin({
      ...login,
      [name]: value,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={ handleSubmit }>
        <label>
          <input
            name="email"
            value={ email }
            type="email"
            placeholder="Email"
            data-testid="email-input"
            onChange={ handleChange }
          />
        </label>
        <label>
          <input
            name="password"
            value={ password }
            type="password"
            placeholder="Password"
            data-testid="password-input"
            onChange={ handleChange }
          />
        </label>
        <button
          data-testid="login-submit-btn"
          disabled={ !validLogin }
        >
          Enter
        </button>
      </form>
    </>
  );
}
