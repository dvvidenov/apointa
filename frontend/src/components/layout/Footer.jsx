import { Link } from "react-router-dom";
import '../../css/Footer.css';


function Footer() {
  return (
    <footer className="footer">
        <label className="logo-tag">@ 2025 Apointa.</label>
        <Link to="/about-us" className="nav-link">За нас</Link>
        <Link to="/polices" className="nav-link">Политика и условия</Link>
    </footer>
  );
}

export default Footer;