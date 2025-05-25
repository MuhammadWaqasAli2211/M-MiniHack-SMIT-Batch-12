// import { useState } from "react";

// ye main file ha jahan pr sary pages ko import krna ha
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

import "./App.css";
import Dashboard from "./pages/dashboard";
import UserHome from "./pages/userhome";
import AdminHome from "./pages/adminhome";
import UserLogin from "./pages/userlogin";
import AdminLogin from "./pages/adminlogin";
import Register from "./pages/userregister";
import PrivateRoute from "./routes/privateRoutes";
import AdminPrivateRoute from "./routes/ProtectedRoute";
import CreateEvent from "./pages/createEvent";
import SeeEventRequests from "./pages/SeeEventRequests"

// import InsertBook from "./pages/insertBook";
// import InsertBook from "./pages/InsertBook";
// import SeeBooks from "./pages/SeeBook"
// import EditBook from "./pages/EditBook"
// import SeeRequest from "./pages/SeeBookRequest"
// import UserHeader from './pages/userHeader'
// import Fetchuser from "./pages/fetchuser";
// import InsertUser from "./pages/insertuser";
// import Productcards from "./pages/productcards";
// import Header from "./pages/header";
function App() {
  // ye return function ha jahan pr sary pages ko render howy hain
  return (
    <Router>
      <Routes>



        {/* Dashboard Route */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />




        {/* User login page */}
        <Route path="/userlogin" element={<UserLogin />} />



        {/* register page */}
        <Route path="/userregister" element={<Register />} />



        {/* admin login page */}
        <Route path="/adminlogin" element={<AdminLogin />} />





        {/* Admin-home page */}
        <Route
          path="/adminhome"
          element={
            <AdminPrivateRoute role="admin">
              <AdminHome />
            </AdminPrivateRoute>
          }
        />






        {/* user Home page */}
        <Route
          path="/userhome"
          element={
            <AdminPrivateRoute role="user">
              <UserHome />
            </AdminPrivateRoute>
          }
        />




        {/* 
        insert books */}
        {/* <Route
          path="/InsertBook"
          element={
            <InsertBook />
          }
        /> */}






        {/* see books */}
        <Route path="/createEvent" element={<CreateEvent />} />







        {/* insert user page  */}
        {/* <Route
          path="/InsertBook"
          element={
            <PrivateRoute>
              <InsertBook />
            </PrivateRoute>
          }
        /> */}





        {/* Edit Book */}
        {/* <Route path="/EditBook/:id" element={<EditBook />} /> */}






        {/* see request Book */}
        <Route path="/SeeEventRequests" element={<SeeEventRequests />} />





        {/* Extra */}
        {/* productcards page */}
        {/* <Route
          path="/productcards"
          element={
            <PrivateRoute>
              <div className="product-card-wrapper">
                {products.map((product, index) => (
                  <Productcards
                    key={index}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                  />
                ))}
              </div>
            </PrivateRoute>
          }
        /> */}

        {/* header page */}
        {/* <Route
          path="/header"
          element={
            <PrivateRoute>
              <Header />
            </PrivateRoute>
          }
        /> */}

        

        


      </Routes>
    </Router>
  );
}

export default App;
