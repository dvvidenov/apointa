import { useState } from "react";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
import Input from "../components/Input";
import { useEmployeeRegisterMutation } from "../queries/employees";

function NewEmployee() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const owner = JSON.parse(sessionStorage.getItem('user'));
  const { mutate: newEmployee, isPending, error, isError } = useEmployeeRegisterMutation();


  const handleSubmit = async (e) => {
    e.preventDefault();



    let newUser = { name, email, password, password_confirmation: confirmPassword, phone, role: 'employee', bulstat: owner.business_bulstat }
    newEmployee(newUser)

  }
  

  
  return (
    <>
      {isError && Object.keys(error).map((field) => (
        <p key={field} className="error-label">
          {error[field][0]} 
        </p>
      ))}

      <BackButton link='employees' />
      <h2>Добави нов служител</h2>

      <form className="content active-content" onSubmit={handleSubmit}>
        <h4>Лична информация</h4>
        <div className="devider"></div>
        <Input type='text' labelName='Имена' value={name} onChange={(e) => setName(e.target.value)} error={error?.name ? 'error' : ''} />
        <Input type='email' labelName='Имейл' value={email} pattern="^+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" onChange={(e) =>  setEmail(e.target.value)} error={error?.email ? 'error' : ''} />
        <Input type='text' labelName='Телефон за контакт' value={phone ?? ''} pattern="^(?:\+359|0)[89]{1}\d{8}$" onChange={(e) => setPhone(e.target.value)} error={error?.phone ? 'error' : ''} />
        <Input type='password' labelName='Парола' value={password} onChange={(e) => setPassword(e.target.value)} error={error?.password ? 'error' : ''} />
        <Input type='password' labelName='Потвърждаване на  Парола' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={error?.password ? 'error' : ''} />

        {!isPending &&
          <div className="form-buttons">
            <button type="submit" className="register-btn primary-button">Добавяне</button>
          </div>
        }
        {isPending && <p>Добавяне на нов служител....</p> && <Loader />}
      </form>
    </>
  );
}

export default NewEmployee;