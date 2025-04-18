
import { Link } from "react-router-dom";
function ProfileCard({ user, business }) {

  const daysOfWeekMap = [
    { key: "monday", label: "Понеделник" },
    { key: "tuesday", label: "Вторник" },
    { key: "wednesday", label: "Сряда" },
    { key: "thursday", label: "Четвъртък" },
    { key: "friday", label: "Петък" },
    { key: "saturday", label: "Събота" },
    { key: "sunday", label: "Неделя" },
  ];

  return (
    <>

      <div className="profile-info">

        <div className="profile-name">
          {user.name}
        </div>
        <div className="profile-e">
          {user.email}
        </div>
        <div className="profile-">
          {user.phone}
        </div>

        {business &&
          <div className="business-info">
            <div>{business.name}</div>
            <div className="address">{business.city} , {business.address}</div>
            <div className="phone">Телефон за контакт {business.phone}</div>
            <div className="payment">Плащане с карта {business.pos_payment ? 'Да' : 'Не'}</div>
            <br />
            <h3>Кои сме ние:</h3>
            <p>{business.business_info}</p>
            <br />
            <h3>Работно време:</h3>
            {business.working_hours &&

              daysOfWeekMap.map((day) => (
                <div key={day.key} className="working-day">

                  <div>{day.label} </div>
                  <div className="working-time">
                    {business.working_hours[day.key].closed ?
                      'Почивен ден' :
                      `${business.working_hours[day.key].start} - ${business.working_hours[day.key].end}`}
                  </div>
                </div>
              ))
            }

          </div>

        }

      </div>
      <Link to='/profile/edit' className=" p-button" >Обнови информацията</Link>
      {business && <Link to='/working-hours' className=" p-button" >Обнови Работното време</Link>}
    </>
  );
}

export default ProfileCard;