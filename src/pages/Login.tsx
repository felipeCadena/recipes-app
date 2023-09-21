export default function Login() {
  return (
    <>
      <h1>Login</h1>
      <form>
        <label>
          <input
            type="email"
            placeholder="Email"
            data-testid="email-input"
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            data-testid="password-input"
          />
        </label>
        <button data-testid="login-submit-btn">Enter</button>
      </form>
    </>
  );
}
