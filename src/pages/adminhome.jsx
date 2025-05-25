import React, { useEffect } from "react";
import AdminHome from "./adminHeader";
import "../style/admincard.css";
import AddBook from "../assets/add-book.jpg";
import SeeBook from "../assets/see-book.avif";
import SeeRequest from "../assets/See-request.jpg";
import { useNavigate } from "react-router-dom";



// Buttons Cards
const cardData = [
  // {
  //   id: 1,
  //   title: "Add Books",
  //   image: AddBook,
  //   buttonText: "Insert Books",
  //   action: "insert-book",
  // },
  {
    id: 2,
    title: "See Requests",
    image: 'data:image/jpeg;base64,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',
    buttonText: "View",
    action: "View-requests",
  },
  // {
  //   id: 3,
  //   title: "See Requests",
  //   image: SeeRequest,
  //   buttonText: "View Requests",
  //   action: "see-requests",
  // },
];



const AdminHomePage = () => {
  const navigate = useNavigate();


  // ✅ Check role on mount
  useEffect(() => {
    const activeRole = localStorage.getItem("active_role");
    const adminToken = localStorage.getItem("admin_token");

    if (activeRole !== "admin" || !adminToken) {
      alert("Unauthorized access. Admins only.");
      navigate("/adminlogin"); // 🔁 Redirect to admin login
    }
  }, []);




  // Navigation A/c to button click
  const handleCardClick = (action) => {
    switch (action) {
      case "insert-book":
        navigate("/InsertBook");
        break;
      case "View-requests":
        navigate("/SeeEventRequests");
        break;
      case "see-requests":
        navigate("/SeeBookRequest");
        break;
      default:
        console.warn("Unknown action:", action);
    }
  };




  // Return UI
  return (
    <div>
      <AdminHome />

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

export default AdminHomePage;
