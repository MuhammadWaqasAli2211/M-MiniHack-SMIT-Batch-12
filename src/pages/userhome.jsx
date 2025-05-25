import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from './userHeader';
import '../style/admincard.css'; // Reusing admin style for consistency
import SeeBook from '../assets/see-book.avif';
import MyRequests from '../assets/See-request.jpg';




// Books Cards
const cardData = [
  {
    id: 1,
    title: "Create Event",
    image: SeeBook,
    buttonText: "Create",
    action: "see-books",
  },
  {
    id: 2,
    title: "My Requests",
    image: MyRequests,
    buttonText: "View My Requests",
    action: "my-requests",
  },
];




const UserHome = () => {
  const navigate = useNavigate();




 // ✅ Check role on mount
  useEffect(() => {
    const activeRole = localStorage.getItem("active_role");
    const userToken = localStorage.getItem("user_token");

    if (activeRole !== "user" || !userToken) {
      // alert("Unauthorized access. Users only.");
      navigate("/userlogin"); // 🔁 Redirect to user login
    }
  }, [navigate]);




  const handleCardClick = (action) => {
    switch (action) {
      case "see-books":
        navigate("/createEvent");
        break;
      
      
        case "my-requests":
        navigate("/SeeEventRequests"); // 👈 Add this route and component
        break;
      default:
        console.warn("Unknown action:", action);
    }
  };




  return (
    <div>
      <UserHeader />

      <div className="product-card-wrapper">
        {cardData.map((card) => (
          <div className="product-card" key={card.id}>
            <div className="card-image">
              <img src={card.image} alt={card.title} />
            </div>
            <div className="card-details">
              <h3>{card.title}</h3>
              <button onClick={() => handleCardClick(card.action)}>
                {card.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default UserHome;
