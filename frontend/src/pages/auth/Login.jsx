import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Input from "../../components/ui/Input";
import BackButton from "../../components/ui/BackButton";
import Loader from "../../components/ui/Loader";
import { useLoginMutation } from "../../queries/user";
import '../../css/Login.css';



function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { mutate: login, isPending, error } = useLoginMutation();


  const handleSubmit = async (e) => {
    e.preventDefault();

    login({ email, password }, {
      retry: 1,  
      onSuccess: (data) => {
        sessionStorage.setItem('token', data.token); 
        sessionStorage.setItem('user', JSON.stringify(data.user));
        if (data.business) {
          sessionStorage.setItem('business', JSON.stringify(data.business));
        }
        navigate('/');
      },
    })
  }
  if (isPending) {
    return  <Loader />
  }


  return (
    <>
      <BackButton link='#' />
      <div className="login">

        <div className="loginfo-input">
          {error && <p className="error-label">{error.message}</p>}
          <form>
            <Input type='email' labelName='Имейл' value={email} onChange={(e) => setEmail(e.target.value)} pattern=".+@example\.com" />
            <Input type='password' labelName='Парола' value={password} onChange={(e) => setPassword(e.target.value)} />

            <div className="form-buttons">
              <button onClick={handleSubmit} className="login-btn primary-button">Вход</button>
              <Link to="/register"><button className="register-btn secondary-button">
                Регистрация
              </button>
              </Link>
            </div>


          </form>
        </div>
      </div>
    </>
  );
}

export default Login;