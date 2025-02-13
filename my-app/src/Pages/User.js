import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Spinner, Alert } from "react-bootstrap";
import "./user.css"; 

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({ id: "", name: "", email: "", password: "", roles: "" });
    const [token, setToken] = useState(localStorage.getItem("jwtToken") || "");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/users", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (err) {
            setError("Failed to fetch users. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleShow = (user) => {
        setCurrentUser(user || { id: "", name: "", email: "", password: "", roles: "" });
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };
    console.log(currentUser.name);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentUser.id) {
                await axios.put(`http://localhost:8080/api/users/${currentUser.id}`, currentUser, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post("http://localhost:8080/api/users/create", currentUser, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchUsers();
            handleClose();
        } catch (err) {
            setError("Failed to save user. Please try again later.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsers();
        } catch (err) {
            setError("Failed to delete user. Please try again later.");
        }
    };

    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" />
                <p>Loading users...</p>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div className="user-management-container">
            <h2>User Management</h2>
            <Button variant="primary" onClick={() => handleShow()}>Add User</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.roles}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleShow(user)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentUser.id ? "Edit User" : "Add User"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={currentUser.name} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={currentUser.email} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={currentUser.password} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control as="select" name="roles" value={currentUser.roles} onChange={handleChange} required>
                                <option value="">Select Role</option>
                                <option value="ADMIN">Admin</option>
                                <option value="DONOR">Donor</option>
                                <option value="ADOPTER">Adopter</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {currentUser.id ? "Update User" : "Add User"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UserManagement;


// // src/components/UserManagement.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
// import './user.css'; // Optional: Create a CSS file for styling

// const User = () => {
//     const [User, setUser] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const [currentUser , setCurrentUser ] = useState({ user_id: '', name: '', email: '', password: '', role: '' });

//     useEffect(() => {
//         fetchUser();
//     }, []);

//     const fetchUser = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/users');
//             setUser(response.data);
//         } catch (err) {
//             setError('Failed to fetch users. Please try again later.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleShow = (User) => {
//         setCurrentUser (User || { user_id: '', name: '', email: '', password: '', role: '' });
//         setShowModal(true);
//     };

//     const handleClose = () => setShowModal(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setCurrentUser ({ ...currentUser , [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (currentUser .user_id) {
//                 await axios.put(`http://localhost:8080/api/users/${currentUser .user_id}`, currentUser );
//             } else {
//                 await axios.post('http://localhost:8080/api/users', currentUser );
//             }
//             fetchUser();
//             handleClose();
//         } catch (err) {
//             setError('Failed to save user. Please try again later.');
//         }
//     };

//     const handleDelete = async (user_id) => {
//         try {
//             await axios.delete(`http://localhost:8080/api/users/${user_id}`);
//             fetchUser();
//         } catch (err) {
//             setError('Failed to delete user. Please try again later.');
//         }
//     };

//     if (loading) {
//         return (
//             <div className="text-center">
//                 <Spinner animation="border" />
//                 <p>Loading users...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return <Alert variant="danger">{error}</Alert>;
//     }

//     return (
//         <div className="user-management-container">
//             <h2>User </h2>
//             <Button variant="primary" onClick={() => handleShow()}>Add User</Button>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>User ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Role</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {User.map(user => (
//                         <tr key={user.user_id}>
//                             <td>{user.user_id}</td>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>{user.role}</td>
//                             <td>
//                                 <Button variant="warning" onClick={() => handleShow(User)}>Edit</Button>
//                                 <Button variant="danger" onClick={() => handleDelete(User.user_id)}>Delete</Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             <Modal show={showModal} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>{currentUser .user_id ? 'Edit User' : 'Add User'}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group controlId="formName">
//                             <Form.Label>Name</Form.Label>
//                             <Form.Control type="text" name="name" value={currentUser .name} onChange={handleChange} required />
//                         </Form.Group>
//                         <Form.Group controlId="formEmail">
//                             <Form.Label>Email</Form.Label>
//                             <Form.Control type="email" name="email" value={currentUser .email} onChange={handleChange} required />
//                         </Form.Group>
//                         <Form.Group controlId="formPassword">
//                             <Form.Label>Password</Form.Label>
//                             <Form.Control type="password" name="password" value={currentUser .password} onChange={handleChange} required />
//                         </Form.Group>
//                         <Form.Group controlId="formRole">
//                             <Form.Label>Role</Form.Label>
//                             <Form.Control as="select" name="role" value={currentUser .role} onChange={handleChange} required>
//                                 <option value="">Select Role</option>
//                                 <option value="admin">Admin</option>
//                                 <option value="donor">Donor</option>
//                                 <option value="adopter">Adopter</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Button variant="primary" type="submit">
//                             {currentUser .user_id ? 'Update User' : 'Add User'}
//                         </Button>
//                     </Form>
//                 </Modal.Body>
//             </Modal>
//         </div>
//     );
// };

// export default User;