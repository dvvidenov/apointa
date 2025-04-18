import { useState, useEffect } from "react";
import { addToOrder,getEmployees, addAppointment } from "../../services/api";
import BackButton from "../../components/ui/BackButton";
import Loader from "../../components/ui/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NewAppointment() {

  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(0);

  const today = new Date();
  const order = JSON.parse(sessionStorage.getItem("order"));
  let orderDetails = order.service;
  const [startDate, setStartDate] = useState(new Date());


  const handleSubmit = async () => {
    addToOrder({ "date": startDate.toLocaleDateString('en'), "employee": employees[employee].id })
    let appointment = {
      'status': 'pending',
      'business_bulstat': order.service.bulstat,
      'services_id': order.service.serviceId,
      'employees_id': order.employee ?? order.service.owner,
      'appointment_date': order.date
    };
    setLoading(true)
    await addAppointment(appointment);


    window.location.href = '/appointments';
  }

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const emp = await getEmployees(orderDetails.bulstat);
        setEmployees(emp);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false)
      }
    }
    loadEmployees()

  }, [orderDetails.bulstat]);

  let componentEmployees = '';

  componentEmployees = <select
    value={employee}
    onChange={(e) => setEmployee(e.target.value)}
    className=".order-select">
    {employees.map((emp, i) =>
      <option
        key={emp.id}
        value={i}
      >{emp.name}</option>)}
  </select>;








  return (
    <>
      {loading ? <Loader /> :
        (error ? <div>{error.message}</div> :
          <>
            <BackButton link={`business/${order.service.backButton}`} />
            <h3>Избор на служител и ден на посещение</h3>
            <div className="appointment-input">
              {employees && componentEmployees}
              <div className="field">
                <DatePicker selected={startDate}  minDate={today} onChange={(date) => setStartDate(date)} />
              </div>


              <div className="final-order">
                <h3>Поръчка</h3>
                <div>
                  Обект : {orderDetails.business} <br />
                  Адрес : {orderDetails.address} <br />
                  Телефон за контакт : {orderDetails.phone} <br />
                  Услуга : {orderDetails.serviceName} <br />
                  Продължителност : {orderDetails.serviceDuration} минути<br />
                  Цена : {orderDetails.servicePrice}лв.<br />
                  Избран служител : {employees[employee]?.name}<br />
                  Избрана дата на посешение: {startDate.toLocaleDateString('en')}
                </div>
              </div>
              <button onClick={handleSubmit} className="primary-button">Финиализирай Поръчка</button>
            </div>
          </>
        )
      }
    </>
  );
}

export default NewAppointment;