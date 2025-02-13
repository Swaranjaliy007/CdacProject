// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/MyNavbar";
// import Home from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import Donation from "./pages/Donation";
// import Children from "./pages/Children";
// import AdminDashboard from "./pages";
// import { AuthProvider } from "./context/AuthContext";
// import PrivateRoute from "./utils/PrivateRoute";

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route element={<PrivateRoute role={['USER', 'DONOR']} />}>
//             <Route path="/donations" element={<Donation />} />
//             <Route path="/children" element={<Children />} />
//           </Route>
//           <Route element={<PrivateRoute role={['ADMIN']} />}>
//             <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           </Route>
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import {BrowserRouter as Router, Routes,Route,Navigate,Switch} from 'react-router-dom'
import MyHeader from "./components/MyHeader"
import MyNavbar from "./components/MyNavbar"
import LoginPage from "./Pages/LoginPage"
import Children from "./Pages/Children"
import AboutUs from "./Pages/AboutUs"
import HomePage from "./Pages/HomePage"
import Contact from './Pages/Contact'
import Drawing from './Pages/Drawing'
import Register from './Pages/RegisterPage';
import Dashboard from './Pages/Dashboard'
import Orphanage from './Pages/Orphanage'
import Staff from './Pages/Staff'
import User from './Pages/User'
import Donation from './Pages/Donation'
import AdoptedChild from './Pages/AdoptedChild'
import ForgotPassword from './Pages/ForgotPassword';
// import { Router } from 'express';


function App() {
  return (
    <div>
      <Router>
        <switch>
      <myHeader/>
      <MyNavbar/>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home"></Navigate>}></Route>
        <Route path="/home" element={<HomePage/>}></Route>
        <Route path="/children" element={<Children/>}></Route>   
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/aboutUs" element={<AboutUs/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/drawings" element={<Drawing/>}></Route>
        <Route path="/register" element={<Register/>}></Route>  
        <Route path='/forgot' element={<ForgotPassword></ForgotPassword>}></Route>      
        <Route path="/dashboard" element={<Dashboard/>}></Route>    
        <Route path="/orphanage" element={<Orphanage/>}></Route>      
        <Route path="/staff" element={<Staff/>}></Route>   
        <Route path="/users" element={<User/>}></Route> 
        <Route path="/donations" element={<Donation/>}></Route>        
        <Route path="/adopted-children" element={<AdoptedChild/>}></Route>     
      </Routes>
        </switch>
      </Router>
    </div>
  );
}

export default App;
