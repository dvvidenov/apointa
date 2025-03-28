
import '../css/NavBar.css'
import { useLocation } from "react-router-dom";
import { useState } from "react";
import CustomLink from "./CustomLink";



const NavBar = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  let employees, services, profile, appointments, logInOut = '';

  const [toggleState, setToggleState] = useState(false);
  const closeMenu = () => setToggleState(false);


  const HandleLogout = () => {
    sessionStorage.clear();
    useLocation();
  }
  logInOut = <CustomLink to='/login' onClick={closeMenu} label='Вход' />
  if (user) {
    if (user.role === 'owner') {
      employees = <CustomLink to='/employees' onClick={closeMenu} label='Служители' />;
      services = <CustomLink to='/services' onClick={closeMenu} label='Улсуги' />;
    }
    profile = <CustomLink to='/profile' onClick={closeMenu} label='Профил' />;
    appointments = <CustomLink to='/appointments' onClick={closeMenu} label='Запазени часове' />;
    logInOut = <CustomLink to='/' onClick={HandleLogout} label='Изход' />
  }




  return (
    <nav className="navbar">
      <h2>Apointa.</h2>
      <div className="open-menu" onClick={() => setToggleState('open')}>
        <div className='burger icon'></div>
        {/* <img src={burger} alt=''/> */}
        {/* <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#f5e1a4">
          <path d="M165.13-254.62q-10.68 0-17.9-7.26-7.23-7.26-7.23-18t7.23-17.86q7.22-7.13 17.9-7.13h629.74q10.68 0 17.9 7.26 7.23 7.26 7.23 18t-7.23 17.87q-7.22 7.12-17.9 7.12H165.13Zm0-200.25q-10.68 0-17.9-7.27-7.23-7.26-7.23-17.99 0-10.74 7.23-17.87 7.22-7.13 17.9-7.13h629.74q10.68 0 17.9 7.27 7.23 7.26 7.23 17.99 0 10.74-7.23 17.87-7.22 7.13-17.9 7.13H165.13Zm0-200.26q-10.68 0-17.9-7.26-7.23-7.26-7.23-18t7.23-17.87q7.22-7.12 17.9-7.12h629.74q10.68 0 17.9 7.26 7.23 7.26 7.23 18t-7.23 17.86q-7.22 7.13-17.9 7.13H165.13Z" />
        </svg> */}
      </div>
      <ul className={`nav-links ${toggleState ? "open" : ""} `}>
        <div className="close-menu" onClick={closeMenu}>
          <div className='close icon'></div>
        </div>
        <CustomLink to='/' onClick={closeMenu} label='Начало' />
        {profile}
        {appointments}
        {employees}
        {services}
        {logInOut}
      </ul>
      <div className="overlay" onClick={closeMenu}></div>
    </nav>
  );
}

export default NavBar;