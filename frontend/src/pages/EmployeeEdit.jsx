import { useParams } from "react-router-dom";
import { useState } from "react";
import BackButton from "../components/BackButton";
import { useEmployeeDeleteMutation, useEmployeeUpdateMutation } from "../queries/employees";
import Loader from "../components/Loader";

function EmployeeEdit() {
  const { id } = useParams();
  const employees = JSON.parse(sessionStorage.getItem('employees'));
  const employee = employees.find(emp => emp.id == id);

  const [status, setStatus] = useState(employee.status);
  const { mutate: updateEmployee, isPendingU } = useEmployeeUpdateMutation();
  const { mutate: deleteEmployee, isPendingD } = useEmployeeDeleteMutation();
  const handleDelete = (e) => {
    e.preventDefault();
    deleteEmployee( id );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateEmployee({ id: id, status });
  }
  if (isPendingU || isPendingD) {
    return <Loader />
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