import { useState } from "react";
import { addToOrder } from "../../services/api";
import BackButton from "../../components/ui/BackButton";
import Loader from "../../components/ui/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEmployeesQuery } from "../../queries/employees";
import { useNewAppointmentMutation } from "../../queries/appointments";

function NewAppointment() {


  // const [error, setError] = useState('');

  const [employee, setEmployee] = useState(0);

  const today = new Date();
  const order = JSON.parse(sessionStorage.getItem("order"));
  let orderDetails = order.service;
  const [startDate, setStartDate] = useState(new Date());
  const { mutate: addAppointment, isPending, errorA } = useNewAppointmentMutation();
  const { data: employees, isLoading, error } = useEmployeesQuery(orderDetails.bulstat);

  const handleSubmit = async () => {
    addToOrder({ "date": startDate.toLocaleDateString('en'), "employee": employees[employee]?.id })

    addAppointment({
      'status': 'pending',
      'business_bulstat': order.service.bulstat,
      'services_id': order.service.serviceId,
      'employees_id': order.employee ?? order.service.owner,
      'appointment_date': order.date
    })
    // await addAppointment(appointment);


    window.location.href = '/success-appointment';
  }



  let componentEmployees = '';
  if (!isLoading && employees.length > 0) {
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
  }

  if (isLoading || isPending) {
    return <Loader />
  }
  if (errorA || error) {
    return <div>{error.message || errorA.message}</div>
  }
  return (
    <>
      <BackButton link={`business/${order.service.backButton}`} />
      <h3>Избор на служител и ден на посещение</h3>
      <div className="appointment-input">
        {employees && componentEmployees}
        <div className="field">
          <DatePicker selected={startDate} minDate={today} onChange={(date) => setStartDate(date)} />
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
            Избран служител : {employees[employee]?.name}
            <br />Избрана дата на посешение: {startDate.toLocaleDateString('en')}
          </div>
        </div>
        <button onClick={handleSubmit} className="primary-button">Финиализирай Поръчка</button>
      </div>
    </>
  );
}

export default NewAppointment;