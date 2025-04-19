import BackButton from "../../components/ui/BackButton";
import Loader from "../../components/ui/Loader";
import Input from "../../components/ui/Input";
import { useState } from "react";
import { useUpdateBusinessMutation } from "../../queries/business";
import { useUpdateProfileMutation } from "../../queries/user";


function ProfileUpdate() {
  const [error, setError] = useState(null);

  const user = JSON.parse(sessionStorage.getItem('user'));
  const business = JSON.parse(sessionStorage.getItem('business'));

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);


  const [businessEmail, setBusinessEmail] = useState(business?.email);
  const [address, setaddress] = useState(business?.address);
  const [city, setCity] = useState(business?.city);
  const [businessPhone, setBusinessPhone] = useState(business?.phone);
  const [businessInfo, setBusinessInfo] = useState(business?.business_info || '');
  const [posPayment, setPosPayment] = useState(business?.pos_payment);
  const [image, setImage] = useState(null);

  const { mutate: updateBusiness, isPendingB, errorB, isErrorB } = useUpdateBusinessMutation();
  const { mutate: updateProfile, isPendingU, errorU, isErrorU } = useUpdateProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (business && user.role == 'owner') {
      updateBusiness({
        id: business.slug,
        address,
        city,
        phone: businessPhone,
        email: businessEmail,
        pos_payment: posPayment,
        image,
        business_info: businessInfo

      }, {
        onSuccess: (data) => {
          sessionStorage.setItem('business', JSON.stringify(data.business));
          window.location.href = '/profile';

        },
      });

    } else {
      updateProfile({
        id: user.id,
        name,
        email,
        phone
      }, {
        onSuccess: (data) => {
          sessionStorage.setItem('user', JSON.stringify(data));
          window.location.href = '/profile';

        },
      })
    }

  }

  if (isPendingB || isPendingU) {
    return <Loader />
  }
  if ((isErrorB || isErrorU) && (errorB || errorU)) {
    setError(errorB ?? errorU);
  }
  return (
    <>
      <BackButton link='profile' />
      <h2 className="page-title">Обновяване на профил</h2>
      {
        <form className='update-service' onSubmit={handleSubmit}>
          {!business &&
            <>
              <Input type='text' labelName='Имена' value={name} onChange={(e) => setName(e.target.value)} error={error && error['name'] ? 'error' : ''} />
              <Input type='email' labelName='Имейл' value={email} onChange={(e) => setEmail(e.target.value)} error={error && error['email'] ? 'error' : ''} />
              <Input type='text' labelName='Телефон за контакт' value={phone ?? ''} onChange={(e) => setPhone(e.target.value)} error={error && error['phone'] ? 'error' : ''} />
            </>
          }
          {business &&
            <div>
              <Input type='text' labelName='Адрес на обекта' value={address} onChange={(e) => setaddress(e.target.value)} error={error && error['address'] ? 'error' : ''} />
              <Input type='text' labelName='Град' value={city} onChange={(e) => setCity(e.target.value)} error={error && error['city'] ? 'error' : ''} />
              <Input type='text' labelName='Телефон за връзка с обекта' value={businessPhone} pattern="^(?:\+359|0)[89]{1}\d{8}$" onChange={(e) => setBusinessPhone(e.target.value)} error={error && error['phone'] ? 'error' : ''} />
              <Input type='email' labelName='Имейл' value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} error={error && error['email'] ? 'error' : ''} />
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
                      checked={posPayment}
                      onChange={(e) => setPosPayment(e.target.checked)}
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
          <button className="primary-button" type="submit">Обнови</button>
        </form >
      }
    </>
  );
}

export default ProfileUpdate;