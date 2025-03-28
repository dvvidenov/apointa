import { useState } from "react";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
import Input from "../components/Input";

function NewEmployee() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const owner = JSON.parse(sessionStorage.getItem('user'));



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    let password_confirmation = confirmPassword;
    let role = 'employee';
    let bulstat = owner.business_bulstat;
    const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ name, email, password, password_confirmation, phone, role, bulstat }),
      mode: 'cors'

    });



    if (response.ok) {
      window.location.href = '/employees';
    } else {
      const errorData = await response.json();
      setError(errorData.errors);

      setIsPending(false);
    }
  }
 
  return (
    <>
      {error && Object.keys(error).map((field) => (
        <p key={field} className="error-label">
          {error[field][0]} {/* Взима първата грешка за всяко поле */}
        </p>
      ))}

      <BackButton link='employees' />
      <h2>Добави нов служител</h2>

      <form className="content active-content">
        <h4>Лична информация</h4>
        <div className="devider"></div>
        <Input type='text' labelName='Имена' value={name} onChange={(e) => setName(e.target.value) } error={error['name']?'error':''}/>
        <Input type='email' labelName='Имейл' value={email} onChange={(e) => setEmail(e.target.value)} pattern=".+@example\.com" error={error['email']?'error':''} />
        <Input type='text' labelName='Телефон за контакт' value={phone ?? ''} onChange={(e) => setPhone(e.target.value)} error={error['phone']?'error':''}/>
        <Input type='password' labelName='Парола' value={password} onChange={(e) => setPassword(e.target.value)} error={error['password']?'error':''}/>
        <Input type='password' labelName='Потвърждаване на  Парола' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={error['password']?'error':''}/>

        {!isPending &&
          <div className="form-buttons">
            <button onClick={handleSubmit} className="register-btn primary-button">Добавяне</button>
          </div>
        }
        {isPending && <p>Добавяне на нов служител....</p> && <Loader />}
      </form>
    </>
  );
}

export default NewEmployee;