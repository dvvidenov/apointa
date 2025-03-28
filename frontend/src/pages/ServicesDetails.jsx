import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getService } from '../services/api';
import BackButton from "../components/BackButton";
import Input from "../components/Input";

function ServicesDetails() {

  const { id } = useParams();
  const [service, setService] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState(false)
  const [serviceInfo, setServiceInfo] = useState("");
  // let business_bulstat = '';
  const navigate = useNavigate();

  useEffect(() => {
    const loadServices = async () => {
      try {
        const ser = await getService(id)
        setService(ser);
      } catch (err) {
        console.log(err);

      }
    }
    loadServices();

  }, [id]);

  useEffect(() => {
    if (service) {
      if (service.code) {
        window.location.href = '/notfound';
      } else {
        setName(service.name || "");
        setPrice(service.price || "");
        setDuration(service.duration || "");
        setStatus(service.status || false);
        setServiceInfo(service.serviceInfo || "");
      }
    }
  }, [service]);


  let business_bulstat = service.businessBulstat;
  let service_info = serviceInfo;
  const handleDelete = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/services/' + id, {
      method: 'DELETE',
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token"),
      }
    }).then(() => {
      navigate('/services');
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    fetch('http://localhost:8000/api/services/' + id, {
      method: 'PUT',
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ name, price, service_info, duration, business_bulstat, status }),
    }).then(() => {
      navigate('/services');
    })
  }


  return (
    <div>
      <BackButton link='services' />

      {service &&
        <div>
          <form className='update-service'>
            <Input type='text' labelName='Име' value={name} onChange={(e) => setName(e.target.value)} />
            <Input type='text' labelName='Цена' value={price} onChange={(e) => setPrice(e.target.value)} />
            <Input type='text' labelName='Продължителност (в минути)' value={duration} onChange={(e) => setDuration(e.target.value)} />
            <div className="field">
              <label className="input-label">Информация за услугата</label>
              <textarea
                className="input"
                required
                value={serviceInfo}
                onChange={(e) => setServiceInfo(e.target.value)}
              />
            </div>
            <div className="field-select">
              <label className="input-label">Статус на усулугата</label>
              <select
                className="input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}>
                <option value={true}>Активна</option>
                <option value={false}>Неактивна</option>
              </select>
            </div>
            <button onClick={handleSubmit} className="primary-button">Обнови</button>

            <button onClick={handleDelete} className="secondary-button">Изтрий</button>
          </form>
        </div>}
    </div>
  );
}

export default ServicesDetails;