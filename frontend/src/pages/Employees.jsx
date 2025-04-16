
import { Link } from "react-router-dom";
import '../css/Employees.css';
import Table from "../components/Table";
import Loader from "../components/Loader";
import { useEmployeesQuery } from "../queries/employees";

function Employees() {

  const { data: employees, isLoading, error } = useEmployeesQuery();

  
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div className="error-message">{error.message}</div>
  }
  const keys = ["name", "email", "phone", "status"];
  sessionStorage.setItem('employees', JSON.stringify(employees))
  return (
    <>
      <h2 className="page-title">Служители</h2>
      <div className="employees">
        <div className="employee-tb">
          {employees && <Table data={employees} keys={keys} link='employees' />}
        </div>
        <Link to='/employees/new' className=" p-button">Нов служител</Link>
      </div>
    </>
  );
}

export default Employees;