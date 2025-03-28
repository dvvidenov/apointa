import { useState } from "react";
import { Link } from 'react-router-dom';
import Input from "../components/Input";
import BackButton from "../components/BackButton";
import '../css/Login.css';
import Loader from "../components/Loader";

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();


    if (response.ok) {

      sessionStorage.setItem('token', data.token); // Запази токена
      sessionStorage.setItem('user', JSON.stringify(data.user)); // Запази потребителя
      if (data.business) {
        sessionStorage.setItem('business', JSON.stringify(data.business));
      }
      window.location.href = '/';


    } else {
      // alert(data.message);
      setError('Грешни данни за вход')
      setIsPending(false);

    }
  }

  return (
    <>
      <BackButton link='#' />
      <div className="login">
        <div className="loginfo-input">
          {error && <p className="error-label">{error}</p>}
          <form>
            <Input type='email' labelName='Имейл' value={email} onChange={(e) => setEmail(e.target.value)} pattern=".+@example\.com" />
            <Input type='password' labelName='Парола' value={password} onChange={(e) => setPassword(e.target.value)} />
            {!isPending &&
              <div className="form-buttons">
                <button onClick={handleSubmit} className="login-btn primary-button">Вход</button>
                <Link to="/register"><button className="register-btn secondary-button">
                  Регистрация
                </button>
                </Link>
              </div>
            }
            {isPending && <p>Вписване</p> && <Loader />}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;