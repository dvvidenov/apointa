import { useParams, } from "react-router-dom";
import { useState } from "react";
import BackButton from "../../components/ui/BackButton";
import { updateAppointment } from "../../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AppointmentEdit() {
  const { id } = useParams();
  const appointment = JSON.parse(sessionStorage.getItem('appointments')).find(appm => appm.id == id);

  const [status, setStatus] = useState(appointment.status);
  // const [date, setDate] = useState(appointment.appointmentDate);
  const today = new Date();

  const [startDate, setStartDate] = useState(appointment.appointmentDate);

  const handleSubmit = async (e) => {
    let appointmentDate = startDate.toLocaleDateString('en');
    e.preventDefault();
    await updateAppointment(id, { appointmentDate, status });

    window.location.href = '/appointments';

  }

  return (
    <>
      <BackButton link='appointments' />
      <h2 className="page-title">Промяна на резервация</h2>
      <div className="appointment-details">
        <span>{appointment.businessName} </span>
        <h4>Информация за контакт</h4>
        <span>Име на клиента: {appointment.userName} </span>
        <span>Номер: {appointment.clientPhone}</span>
        <span>Email: {appointment.clientEmail}</span>
        <span>{appointment.servicesName} - {appointment.employeesName}</span><br />
        <span>{` Цена: ${appointment.servicesPrice} лв.`}</span>
      </div>

      <form>
        <div className="field">
          <label className="input-label">Статус на запазения час</label>

          <select
            className="input"
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            <option value='pending'>Oчаква потвърждение</option>
            <option value='confirmed'>Потвърден</option>
            <option value='cancelled'>Отказан</option>
          </select>
        </div>
        <div className="field calendar">
          <DatePicker selected={startDate} minDate={today} onChange={(date) => setStartDate(date)} />
        </div>

        <button onClick={handleSubmit} className="primary-button">Обнови</button>

      </form>
    </>
  );
}

export default AppointmentEdit;