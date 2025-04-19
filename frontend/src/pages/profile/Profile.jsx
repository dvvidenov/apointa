
import ProfileCard from "../../components/shared/ProfileCard";
import '../../css/Profile.css';



function Profile() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const business = JSON.parse(sessionStorage.getItem('business'));
  console.log(business);
  
  
  return (
    <>
      <h2 className="page-title">Профил</h2>
      <ProfileCard user={user} business={business} />
    </>
  );
}

export default Profile;