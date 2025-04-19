import { Link } from 'react-router-dom';
import { useAppointmentsQuery } from "../../queries/appointments";

import '../../css/Appointments.css'
import Lists from "../../components/ui/Lists";
import Loader from "../../components/ui/Loader";



function Appointments() {
  const user = JSON.parse(sessionStorage.getItem('user'));


  const statusMap = {
    'pending': 'Oчаква потвърждение',
    'confirmed': 'Потвърден',
    'cancelled': 'Отказан'
  }

  const { data: appointments, isLoading } = useAppointmentsQuery();

  if (isLoading) {
    return <Loader />;
  }

  console.log(appointments);
  
 
  sessionStorage.setItem('appointments', JSON.stringify(appointments))

  return (
    <>
      <h2 className="page-title">Записани часове</h2>

      {appointments.length>0 && appointments.map(apmt =>


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
      ) || <div>Нямате записани часове</div>
      }




    </>
  );
}

export default Appointments;