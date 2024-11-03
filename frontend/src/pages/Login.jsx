
const Login = () => {
  const handleLogin = () => {
    window.open("http://localhost:3000/auth/google", "_self");
  };

  return <button onClick={handleLogin}>Google ile Giriş Yap</button>;
};

export default Login;
