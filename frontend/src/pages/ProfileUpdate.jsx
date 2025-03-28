import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
import { updateProfile, updateBusiness } from "../services/api";
import { useState } from "react";
import Input from "../components/Input";

function ProfileUpdate() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const business = JSON.parse(sessionStorage.getItem('business'));

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);


  const [businessEmail, setBusinessEmail] = useState(business?.email);
  const [address, setaddress] = useState(business?.address);
  const [city, setCity] = useState(business?.city);
  const [businessPhone, setBusinessPhone] = useState(business?.phone);
  const [businessInfo, setBusinessInfo] = useState(business?.business_info);
  const [posPayment, setPosPayment] = useState(business?.pos_payment);
  const [image, setImage] = useState(null);




  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (business && user.role == 'owner') {
      let phone = businessPhone;
      let email = businessEmail;
      let pos_payment = posPayment;
      let business_info = businessInfo;

      const updatedBusiness = await updateBusiness(business.slug,
        {
          address,
          city,
          phone,
          email,
          pos_payment,
          image,
          business_info
        });
      if (updatedBusiness.data) {

        sessionStorage.setItem('business', JSON.stringify(updatedBusiness.business));

        window.location.href = '/profile';


      } else {
        setError(updatedBusiness.errors);
        setLoading(false);
      }

    } else {
      const updatedProfile = await updateProfile(user.id, { name, email, phone });
      if (updatedProfile.data) {
        sessionStorage.setItem('user', JSON.stringify(updatedProfile));
        window.location.href = '/profile';
      } else {
        setError(updatedProfile.errors);
      }
    }

  }

  
  return (
    <>
      <BackButton link='profile' />
      <h2 className="page-title">Обновяване на профил</h2>
      {loading ? <Loader /> : (




        <form className='update-service'>
          {!business &&
            <>
              <Input type='text' labelName='Имена' value={name} onChange={(e) => setName(e.target.value)} error={error && error['name'] ? 'error' : ''} />
              <Input type='email' labelName='Имейл' value={email} onChange={(e) => setEmail(e.target.value)} pattern=".+@example\.com" error={error && error['email'] ? 'error' : ''}/>
              <Input type='text' labelName='Телефон за контакт' value={phone ?? ''} onChange={(e) => setPhone(e.target.value)} error={error && error['phone'] ? 'error' : ''}/>
            </>
          }
          {business &&
            <div>
              <Input type='text' labelName='Адрес на обекта' value={address} onChange={(e) => setaddress(e.target.value)} error={error && error['address'] ? 'error' : ''}/>
              <Input type='text' labelName='Град' value={city} onChange={(e) => setCity(e.target.value)} error={error && error['city'] ? 'error' : ''}/>
              <Input type='text' labelName='Телефон за връзка с обекта' value={businessPhone} onChange={(e) => setBusinessPhone(e.target.value)} error={error && error['phone'] ? 'error' : ''}/>
              <Input type='email' labelName='Имейл' value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} pattern=".+@example\.com" error={error && error['email'] ? 'error' : ''}/>
              <div className="field">
                <label className="input-label">Кратка интродукция на фирмата</label>
                <textarea
                  className="input"
                  required
                  value={businessInfo}
                  onChange={(e) => setBusinessInfo(e.target.value)}
                ></textarea>
              </div>
              <div>
                <div className="field-checkbox">
                  <label htmlFor="pos-payment">Плащане с карта на обекта
                    <input
                      type="checkbox"
                      id="pos-payment"
                      value={posPayment}
                      checked={posPayment}
                      onChange={(e) => setPosPayment(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="field-image">
                <label className="input-label">Снимка</label>
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
              </div>
            </div>
          }
          <button className="primary-button" onClick={handleSubmit}>Обнови</button>
        </form >

      )
      }
    </>
  );
}

export default ProfileUpdate;