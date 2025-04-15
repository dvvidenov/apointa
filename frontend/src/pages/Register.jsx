import { useState, useCallback } from "react";
import BackButton from "../components/BackButton";
import '../css/Register.css';
import BusinessRegistrationCard from "../components/BuinessRegistrationCard";
import Input from "../components/Input";
import Loader from "../components/Loader";

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [businessData, setBusinessData] = useState({});


  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  }

  const handleBusinessData = useCallback((info) => {
    setBusinessData(info);
  }, []);

  let business = businessData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    let password_confirmation = confirmPassword;
    let isBusiness = toggleState === 1 ? false : true;


    let sendData = {
      name, email, password, password_confirmation, business, isBusiness
    };
    if (toggleState === 1) {
      delete sendData.business;
    }

    const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(sendData),
      mode: 'cors'

    });

    const data = await response.json();

    if (response.ok) {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user', JSON.stringify(data.user));
      if (business['bulstat']) {
        sessionStorage.setItem('business', JSON.stringify(data.business));
      }
      window.location.href = '/success-registration';
    } else {
      setError(data.errors);
      setIsPending(false);

    }
  }

  return (
    <>
      <BackButton link='login' />
      <div className="register">
        <div className="tabs">
          <button className={toggleState === 1 ? "client tab active-tab " : "client tab"} onClick={() => toggleTab(1)}>Клиент</button>
          <button className={toggleState === 2 ? "business tab active-tab" : "business tab"} onClick={() => toggleTab(2)}>Фирма</button>
        </div>
        <div className="register-input">
          <div className="form-tabs">

            <form className="content active-content">
              <div className="register-info">

                <div className="personal-info">

                  <h4>Лична информация</h4>
                  <div className="devider"></div>
                  <Input type='text' labelName='Имена' value={name} onChange={(e) => setName(e.target.value)} error={error && error?.user?.name ? 'error' : ''} />
                  <Input type='email' labelName='Имейл' value={email} onChange={(e) => setEmail(e.target.value)} pattern=".+@example\.com" error={error && error?.user?.email ? 'error' : ''} />
                  <Input type='password' labelName='Парола' value={password} onChange={(e) => setPassword(e.target.value)} error={error && error?.user?.password ? 'error' : ''} />
                  <Input type='password' labelName='Потвърждаване на  Парола' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={error && error?.user?.password ? 'error' : ''} />
                </div>

                {toggleState === 2 ?
                  <div className="business-info">
                    <BusinessRegistrationCard onBusinessData={handleBusinessData} errors={error} />
                  </div>
                  : ''}
              </div>
              {!isPending &&
                <div className="form-buttons">
                  <button onClick={handleSubmit} className="register-btn primary-button">Регистрация</button>
                </div>
              }
              {isPending && <p>Моля изчакайте</p> && <Loader />}
            </form>

          </div>
        </div >
      </div >
    </>
  );
}

export default Register;