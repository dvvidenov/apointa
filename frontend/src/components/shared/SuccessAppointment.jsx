import { Link } from "react-router-dom";
import '../../css/BackButton.css';

function SuccessAppointment() {


  return (
    <div className="success-registraion">
      <h2>Вие успешно записахте час</h2>
      <br />
      <br />
      <p>Очаквайте обаждане или имейл от избраният обект за уточнение на точен час за посещението .</p>
      <br />
      <h3>Благодарим Ви, че избрахте да запишете час през нас!</h3>
      <br />
      <Link to='/' className="p-button">Към начална страница</Link>
    </div>
  );
}

export default SuccessAppointment;