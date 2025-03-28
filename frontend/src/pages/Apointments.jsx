
import { getAppointment } from "../services/api";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

// import Table from "../components/Table";

import '../css/Appointments.css'
import Lists from "../components/Lists";
import Loader from "../components/Loader";



function Appointments() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const statusMap = {
    'pending': 'Oчаква потвърждение',
    'confirmed': 'Потвърден',
    'cancelled': 'Отказан'
  }
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const appt = await getAppointment();
        setAppointments(appt);

      } catch (err) {
        console.log(err);

      }
      finally {
        setLoading(false)

      }
    }
    loadAppointments();
  }, []);


  sessionStorage.setItem('appointments', JSON.stringify(appointments))

  return (
    <>
      <h2 className="page-title">Записани часове</h2>
      {loading ? (<Loader />) :
        (appointments && appointments.map(apmt =>


          <Link key={apmt.id} to={`/appointments/${apmt.id}`} apmt={apmt} onClick={(e) => { if (user.role !== 'owner') e.preventDefault() }}>

            <Lists
              key={apmt.id}
              title={`${apmt.businessName} | ${apmt.appointmentDate} |  ${apmt.userName}`}
              info={
                <div className="inf">
                  <div className="appointment-info">
                    <span>{apmt.servicesName} - {apmt.employeesName}</span><br />
                    <span>{` Цена: ${apmt.servicesPrice} лв.`}</span>
                  </div>
                  <div className={`status ${apmt.status}`}>
                    {statusMap[apmt.status]}
                  </div>
                </div>
              } />
          </Link >
        ) ||<div>Нямате записани часове</div>
        )

      }
     

    </>
  );
}

export default Appointments;