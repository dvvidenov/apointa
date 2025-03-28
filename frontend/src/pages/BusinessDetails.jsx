import { useState, useEffect } from "react";
import { addToOrder, getSpecificBusinesses } from '../services/api';
import { useParams, useNavigate } from "react-router-dom";

import BusinessCard from '../components/BusinessCard'
import Loader from "../components/Loader";

function BusinessDetails() {

  let { name } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));
  let link = user ? '/appointments/new' : '/login';


  const daysOfWeekMap = [
    { key: "monday", label: "Понеделник" },
    { key: "tuesday", label: "Вторник" },
    { key: "wednesday", label: "Сряда" },
    { key: "thursday", label: "Четвъртък" },
    { key: "friday", label: "Петък" },
    { key: "saturday", label: "Събота" },
    { key: "sunday", label: "Неделя" },
  ];

  const handleSelect = (srvc) => {
    let service = {
      "backButton": business.slug,
      "serviceName": srvc.name,
      "servicePrice": srvc.price,
      "serviceDuration": srvc.duration,
      "bulstat": srvc.businessBulstat,
      "business": business.name,
      "address": `${business.city}, ${business.address}`,
      "phone": business.phone,
      "email": business.email,
      "serviceId": srvc.id,
      "owner": business.userId
    }

    addToOrder({ "service": service })
    navigate(link);
  }

  useEffect(() => {
    const loadBusinesse = async () => {
      try {
        const business = await getSpecificBusinesses(name)
        setBusiness(business)
      } catch (err) {
        setError(`Failed to load businesses: ${err.message || err}`);

      }
      finally {
        setLoading(false)
      }
    }
    loadBusinesse()
  }, [name]);


  return (
    <div className="details">
      {loading ? <Loader /> :
        (error ? <div className="error-message">{error}</div> :
          <>
            {business && <div className="businesses-grid"><BusinessCard business={business} key={business.bulstat} /></div>}
            {business.services &&
              <div className="services-info">{business.services.map(s =>
                <div key={s.id} className="wrapper">
                  <div className="info">
                    <div className="title">{s.name}</div>
                    <div className="duration">{s.duration} минути</div>
                    <details>
                      <summary>Виж повече</summary>
                      {s.serviceInfo}
                    </details>
                  </div>
                  <div className="control">
                    <div className="price">{s.price} лв.</div>
                    <button onClick={() => handleSelect(s)} className="chosen-button">избери</button>
                  </div>
                </div>)}
              </div>
            }
            {business && <div className="businesses-infos">
              <div className="business-about">
                <h2 className="business-info-title">За {business.name}</h2>
                <div className="business-text">{business.businessInfo}</div>
              </div>
              {business.workingHours &&
                <div className="business-working-hours">
                  <h2 className="business-info-title">Работни часове</h2>
                  {daysOfWeekMap.map((day) => (
                    <div key={day.key} className="each-day">
                      <label>{day.label} </label>
                      <div className="working-time">
                        {business.workingHours[day.key].closed ?
                          'Почивен ден' :
                          `${business.workingHours[day.key].start} - ${business.workingHours[day.key].end}`}
                      </div>
                    </div>
                  ))}

                </div>
              }
            </div>}
          </>
        )
      }
    </div>
  );
}

export default BusinessDetails;