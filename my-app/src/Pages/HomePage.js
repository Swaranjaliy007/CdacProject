
// import React from "react";

// const HomePage =() =>{
//    return (
//     <div style={{textAlign:"center",padding:"20px"}}>
//         <h1>Welcome to H.O.P.E.</h1>
//         <p>Helping Orphans Prosper Everywhere- Providing love, care, and a brighter future for every child.</p>
//         {/* <img src="./logo192.png"/> */}
//     </div>

//    )
// }

// export default HomePage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './homepage.css';
// import './Header.css';



const HomePage = () => {
  // State to store orphanage details
  const [orphanage, setOrphanage] = useState(null);

  // Fetch orphanage details from backend API
  useEffect(() => {
    axios.get("http://localhost:8080/api/orphanage")
      .then(response => setOrphanage(response.data))
      .catch(error => console.error("Error fetching orphanage details:", error));
  }, []);

  return (
    <div className="container text-center mt-4 " >
      {/* Hero Section */}
      <header className="p-5 bg-warning text-dark rounded margin-top-100" >
        <h1>Welcome to H.O.P.E.</h1>
        <p className="lead">Helping Orphans Prosper Everywhere - Providing love, care, and a brighter future for every child.</p>
      </header>

      {/* Display Orphanage Details */}
      {orphanage ? (
        <section className="mt-4">
          <h2>About Our Orphanage</h2>
          <p><strong>Name:</strong> {orphanage.orphanage_Name}</p>
          <p><strong>Address:</strong> {orphanage.address}</p>
          <p><strong>Contact:</strong> {orphanage.contact}</p>
          <p><strong>Email:</strong> {orphanage.email}</p>
        </section>
      ) : (
        <p>Loading orphanage details...</p>
      )}

      {/* Image Carousel */}
      <Carousel className="mt-4">
        <Carousel.Item>
             {/* <img src="./images.jpeg"/> */}
          <img className="d-block " src="./children-playing-grass.jpg" alt="Orphanage"
           style={{ width: "1200px", height: "500px", objectFit: "contain", borderRadius: "10px" }}  />
         
          <Carousel.Caption>
            <h3>Our Home</h3>
            <p>A safe and loving environment for children.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block " src="./education.jpeg" alt="Education" 
           style={{ width: "1200px", height: "500px", objectFit: "contain", borderRadius: "10px" }}  />
          <Carousel.Caption>
            <h3>Education & Growth</h3>
            <p>We provide quality education and skill development.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Call-to-Action Section */}
      <div className="mt-4">
        <h2>Get Involved</h2>
        <p>Your support helps shape a better future.</p>
        <button className="btn btn-success m-2">Donate</button>
       
      </div>

     
    </div>
  );
};

export default HomePage;
