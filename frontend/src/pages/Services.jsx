
import { useState, useEffect } from "react";
import { addService, getServices } from '../services/api';
import '../css/Services.css';
import Table from "../components/Table";
import Loader from "../components/Loader";
import Input from "../components/Input";


function Services() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [serviceInfo, setServiceInfo] = useState("");
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(sessionStorage.getItem('user'));



  const bulstat = user.business_bulstat;
  useEffect(() => {
    const loadServices = async () => {
      try {
        const ser = await getServices()
        setServices(ser);
      } catch (err) {
        setError(err);

      } finally {
        setLoading(false)
      }
    }
    loadServices();

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let service_info = serviceInfo;

    const newService = await addService(name, price, service_info, duration, bulstat);

    if (newService.data) {
      window.location.href = '/services';
    } else {
      const errorData = newService;
      setError(errorData.errors);

    }
  }


  const labels = ["Име на услугата", "Продължителност (в минути)", "Цена (в лева)", "Статус"];
  const keys = ["name", "duration", "price", "status"];
  return (
    <>
      <h2 className="page-title">Услугите на твоя бизнес</h2>
      {error && Object.keys(error).map((field) => (
        <p key={field} className="error-label">
          {error[field][0]}
        </p>
      ))}
      {loading ? <Loader /> :


        services &&
        <div className="services">
          <details>
            <summary>Добави нова услуга</summary>
            <form className={`add-new-service`}>
              <Input type='text' labelName='Име' value={name} onChange={(e) => setName(e.target.value)} error={error['name']?'error':''}/>
              <Input type='text' labelName='Цена' value={price} onChange={(e) => setPrice(e.target.value)} error={error['price']?'error':''}/>
              <Input type='text' labelName='Продължителност (в минути)' value={duration} onChange={(e) => setDuration(e.target.value)} error={error['duration']?'error':''}/>
              <div className="field">
                <label className="input-label">Информация за услугата</label>
                <textarea
                  className="input"
                  required
                  value={serviceInfo}
                  onChange={(e) => setServiceInfo(e.target.value)}
                />
              </div>
              <button onClick={handleSubmit} className="primary-button">Добави</button>
            </form>
          </details>
          <div className="services-info">
            <Table labels={labels} data={services} keys={keys} link='services' />
          </div>
        </div>

      }
    </>
  );
}

export default Services;