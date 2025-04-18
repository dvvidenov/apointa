import { Link } from "react-router-dom";
import '../../css/BusinessCard.css';


const BusinessCard = ({ business ,serviceIsNeed }) => {
  const logo = business.logo ? `http://localhost:8000/storage/${business.logo}` : "https://placeholder.pagebee.io/api/plain/300/200";
  // const posPayment = business.posPayment ? "Може да платите с карта или в брой" : "Може да платите само в брой";
  return (
    <>
      <Link to={`/business/${business.slug}`}>
        <div className="business-card">
          <div className="business-poster">
            <img src={logo} alt="Business Logo" />
          </div>
          <div className="business-info">

            <h2 className="business-title">{business.name}</h2>
            <div className="address">{business.city} , {business.address}</div>
            {serviceIsNeed &&
              <div className="services-info">{business.services.map(s =>
                <div key={s.id} className="wrapper">
                  <div className="info">
                    <div className="title">{s.name}</div>
                    <div className="price">{s.price} лв.</div>
                  </div>
                </div>)}

              </div>
            }


          </div>
        </div>
      </Link>
    </>
  );
}

export default BusinessCard;