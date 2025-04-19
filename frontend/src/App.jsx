
import './css/App.css'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import AboutUs from './pages/home/AboutUs'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import BusinessDetails from './pages/business/BusinessDetails'
import Services from './pages/business/Services'
import ServicesDetails from './pages/business/ServicesDetails'
import WorkingHours from './pages/business/WorkingHours'
import Profile from './pages/profile/Profile'
import ProfileUpdate from './pages/profile/ProfileUpdate'
import Appointments from './pages/appointments/Apointments'
import NewAppointment from './pages/appointments/NewAppointment'
import AppointmentEdit from './pages/appointments/AppointmentEdit'
import Employees from './pages/employees/Employees'
import NewEmployee from './pages/employees/NewEmployee'
import EmployeeEdit from './pages/employees/EmployeeEdit'
import CookiesAndPolices from './pages/legal/CookiesAndPolices'
import NotFound from './pages/NotFound'
import SuccessRegistration from './components/shared/SuccessRegistration'
import SuccessAppointment from './components/shared/SuccessAppointment'



function App() {


  return (
    <>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/edit' element={<ProfileUpdate />} />
          <Route path='/working-hours' element={<WorkingHours />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/polices' element={<CookiesAndPolices />} />
          <Route path='/business/:name' element={<BusinessDetails />} />
          <Route path='/appointments' element={<Appointments />} />
          <Route path='/appointments/new' element={<NewAppointment />} />
          <Route path='/appointments/:id' element={<AppointmentEdit />} />
          <Route path='/services' element={<Services />} />
          <Route path='/services/:id' element={<ServicesDetails />} />
          <Route path='/employees' element={<Employees />} />
          <Route path='/employees/:id' element={<EmployeeEdit />} />
          <Route path='/employees/new' element={<NewEmployee />} />
          <Route path='/success-registration' element={<SuccessRegistration />} />
          <Route path='/success-appointment' element={<SuccessAppointment />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
