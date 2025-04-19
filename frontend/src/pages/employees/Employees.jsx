
import { Link } from "react-router-dom";
import '../../css/Employees.css';
import Table from "../../components/ui/Table";
import Loader from "../../components/ui/Loader";
import { useEmployeesQuery } from "../../queries/employees";

function Employees() {
  const business = JSON.parse(sessionStorage.getItem('business'));
  const { data: employees, isLoading, error } = useEmployeesQuery(business.bulstat);

  
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