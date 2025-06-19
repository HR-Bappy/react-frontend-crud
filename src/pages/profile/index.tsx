import {  FaPhone, FaEnvelope, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import "./ProfilePage.scss";

const profile = {
  id: 1,
  type: 1,
  role: "Manager",
  phone: "01994688976",
  name: "Admin",
  password: "123456",
  email: "admin@admin.com",
  location: "Mirpur-10",
  image: "https://reqres.in/img/faces/1-image.jpg",
  from: "01-01-2022",
  to: "01-01-2023",
};

const ProfilePage = () => {
  return (
    <div className="profile-page container py-4">
      <div className="card shadow-sm">
        <div className="card-body row">
          <div className="col-md-4 text-center border-end d-flex flex-column align-items-center">
            <img
              src={profile.image}
              alt="Profile"
              className="img-fluid rounded-circle mb-3 profile-img"
            />
            <h5 className="mb-1">{profile.name}</h5>
            <span className="text-muted">{profile.role}</span>
          </div>
          <div className="col-md-8">
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <FaPhone className="me-2 text-primary" /> {profile.phone}
              </li>
              <li className="mb-2">
                <FaEnvelope className="me-2 text-danger" /> {profile.email}
              </li>
              <li className="mb-2">
                <FaMapMarkerAlt className="me-2 text-success" /> {profile.location}
              </li>
              <li className="mb-2">
                <FaBriefcase className="me-2 text-warning" /> From <strong>{profile.from}</strong> to <strong>{profile.to}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
