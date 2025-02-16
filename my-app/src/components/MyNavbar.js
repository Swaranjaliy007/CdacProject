import { Link } from "react-router-dom";

const MyNavbar = () => {
    return (
        <nav style={{
            position: "fixed", top: 0,left: 0,width: "100%",
            padding: "10px", background: "black", color: "white", 
            
        }}>
            {/* <h2>H.O.P.E.</h2> */}
            <ul style={{ listStyle: "none", display: "flex", gap: "20px" }}>
                <li><Link to="/" style={{ color: "white" }}>Home</Link></li>
                <li><Link to="/AboutUs" style={{ color: "white" }}>AboutUs</Link></li>
                <li><Link to="/contact" style={{ color: "white" }}>Contact</Link></li>
                <li><Link to="/drawings" style={{color: "white"}}>Drawings</Link></li>
                <li><Link to="/login" style={{ color: "white" }}>Login</Link></li>               
                                    
            </ul>
        </nav>
    );
};


export default MyNavbar; 
