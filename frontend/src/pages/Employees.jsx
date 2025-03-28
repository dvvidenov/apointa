
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getEmployees } from "../services/api";
import '../css/Employees.css';
import Table from "../components/Table";
import Loader from "../components/Loader";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const emp = await getEmployees()
        setEmployees(emp);

      } catch (err) {
        setError(err);

      } finally {
        setLoading(false)
      }
    }
    loadEmployees();

  }, []);


  const keys = ["name", "email", "phone",  "status"];
  sessionStorage.setItem('employees', JSON.stringify(employees))
  return (
    <>
      <h2 className="page-title">Служители</h2>
      {loading ? <Loader /> :
        (error ? <div className="error-message">{error}</div> :
          <div className="employees">

            <div className="employee-tb">
              {employees && <Table data={employees} keys={keys} link='employees' />}

            </div>
            <Link to='/employees/new' className=" p-button">Нов служител</Link>
          </div>
        )
      }
    </>
  );
}

export default Employees;