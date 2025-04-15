import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import BackButton from "../components/BackButton";
import Input from "../components/Input";
import { useDeleteMutaion, useGetServiceQuery, useUpdateServiceMutaion } from "../queries/services";
import Loader from "../components/Loader";

function ServicesDetails() {

  const { id } = useParams();
  const { data: service, isLoading, error: errorGet } = useGetServiceQuery(id);
  const { mutate: updatedService, isPendingUpdate, error: errorUpdate } = useUpdateServiceMutaion();
  const { mutate: deleteService, isPendingDelete, error: errorDelete } = useDeleteMutaion();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState(false)
  const [serviceInfo, setServiceInfo] = useState("");


  useEffect(() => {
    if (!isLoading) {
      if (service) {
        setName(service.name || "");
        setPrice(service.price || "");
        setDuration(service.duration || "");
        setStatus(service.status || false);
        setServiceInfo(service.serviceInfo || "");
      } else {
        window.location.href = '/notfound';
      }
    }
  }, [service, isLoading]);

  const handleDelete = (e) => {
    e.preventDefault();

    deleteService(id, {
      retry: 1,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    let update = { id, name, price, service_info: serviceInfo, duration, business_bulstat: service.businessBulstat, status };

    updatedService(update);
  }

  if (errorGet || errorUpdate || errorDelete) {
    return <p className="error-label">{errorGet?.message || errorUpdate?.message || errorDelete?.message}</p>
  }

  if (isLoading || isPendingUpdate || isPendingDelete) {
    return <Loader />
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