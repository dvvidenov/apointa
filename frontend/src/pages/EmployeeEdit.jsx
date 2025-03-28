import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import BackButton from "../components/BackButton";

function EmployeeEdit() {
  const { id } = useParams();
  const employees = JSON.parse(sessionStorage.getItem('employees'));
  const employee = employees.find(emp => emp.id == id);
  const navigate = useNavigate();
  const [status, setStatus] = useState(employee.status);

  const handleDelete = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/employees/' + id, {
      method: 'DELETE',
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token"),
      }
    }).then(() => {
      navigate('/employees');
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/employees/' + id, {
      method: 'PUT',
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({  status }),
    }).then(() => {
      navigate('/employees');
    })
  }


  return (
    <>

      <BackButton link='employees' />
      <h2 className="page-title">Промяна на служител</h2>

      <div className="employee-info">
        <div className="name">
          Име: {employee.name}
        </div>
        <div className="phone">
          Телефон: {employee.phone}
        </div>
        <div className="email">
          Email: {employee.email}
        </div>
        <form>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            <option value='working'>На работа</option>
            <option value='sick'>Болничен</option>
            <option value='vacation'>Отпуска</option>
          </select>
          <button onClick={handleSubmit} className="primary-button">Обнови</button>

          <button onClick={handleDelete} className="secondary-button">Изтрий</button>
        </form>

      </div >
    </>
  );
}

export default EmployeeEdit;