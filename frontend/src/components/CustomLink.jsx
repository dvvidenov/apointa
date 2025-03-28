import { NavLink } from "react-router-dom";

function CustomLink({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}
      onClick={onClick}
    >{label}
    </NavLink >

  );
}

export default CustomLink;