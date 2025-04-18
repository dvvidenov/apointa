import { Link } from "react-router-dom";
import '../../css/BackButton.css';

function SuccessRegistration() {

  const business = JSON.parse(sessionStorage.getItem('business'));

  return (
    <div className="success-registraion">
      <h2>Вие се регистрирахте успешно</h2>
      <br />
      {business ?
        <p>Вашият бизнес беше успешно регистриран в нашата платформа.<br />
          Наш екип ще прегледа подадената информация и скоро ще се свържем с Вас за потвърждение.</p>
        :  <p>Вашият акаунт беше успешно създаден.<br />
           Вече можете да разглеждате бизнеси, да запазвате часове и да се възползвате от всички удобства, които нашата платформа предлага.</p>}
      <br />
      <br />
      <p>Ако имате въпроси, не се колебайте да се свържете с нас.</p>
      <br />
      <h3>Благодарим Ви, че избрахте да бъдете част от нашата общност!</h3>
      <br />
      <Link to='/' className="p-button">Към начална страница</Link>
    </div>
  );
}

export default SuccessRegistration;