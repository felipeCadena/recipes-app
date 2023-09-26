import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'
import 'bootstrap/dist/css/bootstrap.css';

const data = {
  email: '',
  password: '',
};

export default function Login() {
  const [login, setLogin] = useState(data);
  const { email, password } = login;

  const navigate = useNavigate();

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
    localStorage.setItem('user', JSON.stringify({ email }));
    navigate('/meals');
  }

  return (
    <>
    <h1 className='recipes-type'>
      App 
    <>
    </> de <br />
    Receitas</h1>
    <div className='login-container'>
      <h2 className='login-title'>Login</h2>
      <form onSubmit={ handleSubmit }>
        <label>
          <input
          className='input-email form-control'
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
          className='input-senha form-control' 
            name="password"
            value={ password }
            type="password"
            placeholder="Password"
            data-testid="password-input"
            onChange={ handleChange }
          />
        </label>
        <button
        className='btn-enter  btn btn-primary'
          data-testid="login-submit-btn"
          disabled={ !validLogin }
        >
          Enter
        </button>
      </form>
      </div>
    </>
  );
}
