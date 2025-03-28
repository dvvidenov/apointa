
import './css/App.css'
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import AboutUs from './pages/AboutUs'
import BusinessDetails from './pages/BusinessDetails'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import Appointments from './pages/Apointments'
import Services from './pages/Services'
import Employees from './pages/Employees'
import ServicesDetails from './pages/ServicesDetails'
import NewEmployee from './pages/NewEmployee'
import NewAppointment from './pages/NewAppointment'
import Footer from './components/Footer'
import ProfileUpdate from './pages/ProfileUpdate'
import EmployeeEdit from './pages/EmployeeEdit'
import AppointmentEdit from './pages/AppointmentEdit'
import WorkingHours from './pages/WorkingHours'
import SuccessRegistration from './components/SuccessRegistration'
import CookiesAndPolices from './pages/CookiesAndPolices'



function App() {


  return (
    <>
      <NavBar/>
      <main className="main-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/edit' element={<ProfileUpdate />} />
          <Route path='/working-hours' element={<WorkingHours/>}/>
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/polices' element={<CookiesAndPolices/>}/>
          <Route path='/business/:name' element={<BusinessDetails />} />
          <Route path='/appointments' element={<Appointments />} />
          <Route path='/appointments/new' element={<NewAppointment />} />
          <Route path='/appointments/:id' element={<AppointmentEdit />} />
          <Route path='/services' element={<Services />} />
          <Route path='/services/:id' element={<ServicesDetails />} />
          <Route path='/employees' element={<Employees />} />
          <Route path='/employees/:id' element={<EmployeeEdit />} />
          <Route path='/employees/new' element={<NewEmployee />} />
          <Route path='/success-registration' element={<SuccessRegistration/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default App
