import { useState, useEffect } from "react";

import { useCategoriesQuery } from "../../queries/categories";
import Loader from "../ui/Loader";
import Input from "../ui/Input";

const BusinessRegistrationCard = ({ onBusinessData, errors }) => {
  //business
  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [address, setaddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [bulstat, setBulstat] = useState('');
  const [posPayment, setPosPayment] = useState(false);

  const [category, setCategory] = useState('');



  let name = businessName;
  let email = businessEmail;
  let pos_payment = posPayment;
  console.log(posPayment);

  let categories_id = category;
  useEffect(() => {
    onBusinessData({ name, email, address, city, phone, bulstat, pos_payment, categories_id })
  }, [name, email, address, city, phone, bulstat, pos_payment, categories_id, onBusinessData]);

  const { data: categories, isLoading } = useCategoriesQuery();

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <h4>Информация за бизнеса</h4>
      <div className="devider"></div>
      <Input type='text' labelName='Име' value={businessName} onChange={(e) => setBusinessName(e.target.value)} error={errors && errors?.business['name'] ? 'error' : ''} />
      <Input type='text' labelName='БУЛСТАТ' value={bulstat} onChange={(e) => setBulstat(e.target.value)} error={errors && errors?.business['bulstat'] ? 'error' : ''} />
      <Input type='text' labelName='Адрес на обекта' value={address} onChange={(e) => setaddress(e.target.value)} error={errors && errors?.business['address'] ? 'error' : ''} />
      <Input type='text' labelName='Град' value={city} onChange={(e) => setCity(e.target.value)} error={errors && errors?.business['city'] ? 'error' : ''} />
      <Input type='text' labelName='Телефон за връзка с обекта' value={phone} onChange={(e) => setPhone(e.target.value)} error={errors && errors?.business['phone'] ? 'error' : ''} />
      <Input type='email' labelName='Имейл' value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} pattern=".+@example\.com" error={errors && errors?.business['email'] ? 'error' : ''} />

      <div className="field-select">
        <label className={`input-label ${errors && errors.business['categories_id'] ? 'error':''}`}>Категория на обекта</label>
        <select
          
          className={`input ${errors && errors.business['categories_id'] ? 'error':''}`}
          value={category}
          onChange={(e) => setCategory(e.target.value)}>
          {categories.map(category =>
            <option
              key={category.id}
              value={category.id}
            >{category.name}</option>)}
        </select>
      </div>
      <div className="field-checkbox">
        <input
          type="checkbox"
          id="pos-payment"
          value={posPayment}
          onChange={(e) => setPosPayment(e.target.value)}
        />
        <label htmlFor="pos-payment">Плащане с карта на обекта</label>
      </div>

    </>
  );
}

export default BusinessRegistrationCard;