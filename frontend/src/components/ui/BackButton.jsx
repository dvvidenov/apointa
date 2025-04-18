import { useNavigate } from "react-router-dom";
import '../../css/BackButton.css';

function BackButton({ link }) {

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(`/${link}`);
  }
  return (
    <div className="back-button" onClick={handleCancel}>
      <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#c9c9c9">
      <path d="M400-93.85 13.85-480 400-866.15l49.59 50L113.18-480l336.41 336.15-49.59 50Z" />
      </svg>
      Назад
    </div>
  );
}

export default BackButton;