
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Register.css";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'USER' // Default role
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.name || !formData.email || !formData.password || !formData.role) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/users/create", {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                roles: formData.role // Send role as a string, not array
            });

            setSuccess(response.data.message);
            setTimeout(() => navigate("/login"), 2000);

            setFormData({ name: "", email: "", password: "", role: "USER" });
        } catch (error) {
            setError(error.response?.data?.error || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <br />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <br />
                <input type="number" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                <br />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <br />
                <label>Select Role:</label>
                <select name="role" value={formData.role} onChange={handleChange} required>
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                    <option value="DONOR">Donor</option>
                </select>
                <br />
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default RegisterPage;

/*import React, { useState } from 'react';
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        // address: '',
        // contact: '',
        email: '',
        password: '',
        role: 'USER' // Default role
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.username || !formData.email || !formData.password || !formData.role) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/users/create", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                roles: [formData.role] // Send selected role
            });

            setSuccess(response.data.message);
            setTimeout(() => navigate("/login"), 2000);

            setFormData({ username: "", email: "", password: "", role: "USER" });
        } catch (error) {
            if (error.response && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("Registration failed. Please try again.");
            }
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <br />
                {/* Role Dropdown }
                <label>Select Role:</label>
                <select name="role" value={formData.role} onChange={handleChange} required>
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                    <option value="DONOR">Donor</option>
                </select>
                <br />
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};
*/
// export default RegisterPage;












// // src/components/Register.js
// import React, { useState } from 'react';
// import "./Register.css";
// import { useNavigate } from 'react-router-dom';

// const RegisterPage = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         username: '',
//         address: '',
//         contact: '',
//         email: '',
//         password: '',
//     });

//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//         setError(''); // Clear error on input change
//         setSuccess(''); // Clear success message on input change
//     };

//     // const handleSubmit = (e) => {
//     //     e.preventDefault();

//     //     // Basic validation
//     //     if (!formData.username || !formData.address || !formData.contact  || !formData.email || !formData.password) {
//     //         setError('All fields are required.');
//     //         return;
//     //     }

//     //     // Simulate a successful registration (replace this with your API call)
//     //     console.log('Registration data:', formData);
//     //     setSuccess('Registration successful! You can now log in.');
        
//     //    // Redirect to the Children page after a successful registration
//     //    navigate('/Login'); // Use navigate to redirect

//     //     setFormData({ username: '',address: '', contact: '', email: '', password: '' }); // Clear form
//     // };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setSuccess("");
    
//         if (!formData.username || !formData.address || !formData.contact || !formData.email || !formData.password) {
//             setError("All fields are required.");
//             return;
//         }
    
//         try {
//             const response = await axios.post("http://localhost:8080/api/users/create", {
//                 name: formData.username,
//                 email: formData.email,
//                 password: formData.password,
//                 roles: ["USER"] // Default role
//             });
    
//             setSuccess(response.data.message); // Show success message
//             setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    
//             setFormData({ username: "", address: "", contact: "", email: "", password: "" }); // Clear form
//         } catch (error) {
//             if (error.response && error.response.data.error) {
//                 setError(error.response.data.error); // Show backend error message
//             } else {
//                 setError("Registration failed. Please try again.");
//             }
//         }
//     };
    
//     return (
//         // <div style={{ textAlign: 'center', padding: '20px' }}>
//         <div className="register-container">
//             <h2>Register</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     required
//                 />
//                 <br />
//                 <input
//                     type="text"
//                     name="address"
//                     placeholder="Address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     required
//                 />
//                  <br />
//                  <input
//                     type="text"
//                     name="contact"
//                     placeholder="Contact Number"
//                     value={formData.contact}
//                     onChange={handleChange}
//                     required
//                 />
//                  <br />
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                 />
//                 <br />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                 />
//                 <br />
//                 <button type="submit">Register</button>
//             </form>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {success && <p style={{ color: 'green' }}>{success}</p>}
//         </div>
//     );
// };

// export default RegisterPage;