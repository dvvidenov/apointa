import BackButton from "../../components/ui/BackButton";
import Input from "../../components/ui/Input";
import { useState } from "react";
import '../../css/WorkingHours.css'
import { updateBusiness } from "../../services/api";


function WorkingHours() {
  const business = JSON.parse(sessionStorage.getItem('business'));
  const daysOfWeekMap = [
    { key: "monday", label: "Понеделник" },
    { key: "tuesday", label: "Вторник" },
    { key: "wednesday", label: "Сряда" },
    { key: "thursday", label: "Четвъртък" },
    { key: "friday", label: "Петък" },
    { key: "saturday", label: "Събота" },
    { key: "sunday", label: "Неделя" },
  ];

  const [workingHours, setWorkingHours] = useState(business.working_hours || {
    monday: { start: "09:00", end: "18:00", closed: false },
    tuesday: { start: "09:00", end: "18:00", closed: false },
    wednesday: { start: "09:00", end: "18:00", closed: false },
    thursday: { start: "09:00", end: "18:00", closed: false },
    friday: { start: "09:00", end: "18:00", closed: false },
    saturday: { start: "09:00", end: "18:00", closed: true },
    sunday: { start: "09:00", end: "18:00", closed: true },
  });

  const handleChange = (day, field, value) => {
    if (/^[0-9:]*$/.test(value) || field == "closed") {
      setWorkingHours((prev) => ({
        ...prev,
        [day]: { ...prev[day], [field]:value },
      }));
    }
  };

  const handleSubmit = async () => {

    const businessToSend = {
      ...business,
      working_hours: JSON.stringify(workingHours),
    };
    delete businessToSend.image;


    const updatedBusiness = await updateBusiness(business.slug, { ...businessToSend })
    if (updatedBusiness) {
      sessionStorage.setItem('business', JSON.stringify(updatedBusiness.business));
      window.location.href = '/profile';
    } else {
      console.error("Failed to update");

    }

  }



  return (
    <>
      <BackButton link='profile' />
      <h2 className="page-title">Обновяване на работно време</h2>
      <div className="week-days">
        {daysOfWeekMap.map((day) => (
          <div key={day.key} className="each-day">
            <span className="day-of-week">{day.label}:</span>
            <div className="day-input">
              <Input type='text' labelName="Начало" value={workingHours[day.key].start || ""} onChange={(e) => handleChange(day.key, "start", e.target.value)} isDisabled={workingHours[day.key].closed} />
              <Input type='text'labelName="Край" value={workingHours[day.key].end || ""} onChange={(e) => handleChange(day.key, "end", e.target.value)} isDisabled={workingHours[day.key].closed} />

              <div className="field-checkbox">
                <label className="day-off">
                  <input
                    type="checkbox"
                    checked={workingHours[day.key].closed}
                    onChange={(e) =>
                      handleChange(day.key, "closed", e.target.checked)
                    }
                  />
                  Почивен ден</label>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="primary-button" onClick={handleSubmit}>Запази Промените</button>
    </>
  );
}

export default WorkingHours;