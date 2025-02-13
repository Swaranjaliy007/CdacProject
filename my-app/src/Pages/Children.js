import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Alert, Spinner } from 'react-bootstrap';

const Children = () => {
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ id: '', name: '', age: '', gender: '', orphanageId: '' });

    useEffect(() => {
        fetchChildren();
    }, []);

    const fetchChildren = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/childs');
            setChildren(response.data);
        } catch (err) {
            setError('Failed to fetch children.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (formData.id) {
                // Update existing child
                await axios.put(`http://localhost:8080/api/childs/${formData.id}`, formData);
                setChildren((prev) =>
                    prev.map((child) => (child.id === formData.id ? { ...child, ...formData } : child))
                );
            } else {
                // Add new child (POST request to correct endpoint)
                const response = await axios.post(`http://localhost:8080/api/childs/${formData.orphanageId}`, formData);
                setChildren((prev) => [...prev, response.data]);
            }

            // Reset form after successful submission
            setFormData({ id: '', name: '', age: '', gender: '', orphanageId: '' });
        } catch (err) {
            setError('Failed to add/update child.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/childs/${id}`);
            setChildren((prev) => prev.filter((child) => child.id !== id));
        } catch (err) {
            setError('Failed to delete child.');
        }
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <h2>Manage Children</h2>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                        as="select"
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Orphanage ID</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.orphanageId}
                        onChange={(e) => setFormData({ ...formData, orphanageId: e.target.value })}
                        required
                    />
                </Form.Group>

                <Button type="submit">{formData.id ? 'Update' : 'Add'} Child</Button>
            </Form>

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Orphanage ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {children.map((child) => (
                        <tr key={child.id}>
                            <td>{child.id}</td>
                            <td>{child.name}</td>
                            <td>{child.age}</td>
                            <td>{child.gender}</td>
                            <td>{child.orphanage?.id || 'N/A'}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => setFormData({ ...child, orphanageId: child.orphanage?.id || '' })}
                                >
                                    Edit
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(child.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Children;

//1// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, Button, Form, Alert, Spinner } from 'react-bootstrap';

// const Children = () => {
//     const [children, setChildren] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [formData, setFormData] = useState({ id: '', name: '', age: '', gender: '', orphanageId: '' });

//     useEffect(() => {
//         fetchChildren();
//     }, []);

//     const fetchChildren = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/childs');
//             setChildren(response.data);
//         } catch (err) {
//             setError('Failed to fetch children.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             if (formData.id) {
//                 // Update existing child
//                 await axios.put(`http://localhost:8080/api/childs/${formData.id}`, formData);
//                 setChildren((prev) =>
//                     prev.map((child) => (child.id === formData.id ? { ...child, ...formData } : child))
//                 );
//             } else {
//                 // Add new child
//                 const response = await axios.post(`http://localhost:8080/api/orphanages/${formData.orphanageId}`, formData);
//                 setChildren((prev) => [...prev, response.data]);
//             }

//             setFormData({ id: '', name: '', age: '', gender: '', orphanageId: '' });
//         } catch (err) {
//             setError('Failed to add/update child.');
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:8080/api/childs/${id}`);
//             setChildren((prev) => prev.filter((child) => child.id !== id));
//         } catch (err) {
//             setError('Failed to delete child.');
//         }
//     };

//     if (loading) return <Spinner animation="border" />;
//     if (error) return <Alert variant="danger">{error}</Alert>;

//     return (
//         <div>
//             <br/>
//             <br/>
//             <h2>Manage Children</h2>
//             <Form onSubmit={handleSubmit}>
//                 <Form.Control
//                     placeholder="Name"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     required
//                 />
//                 <Form.Control
//                     placeholder="Age"
//                     type="number"
//                     value={formData.age}
//                     onChange={(e) => setFormData({ ...formData, age: e.target.value })}
//                     required
//                 />
//                 <Form.Control
//                     as="select"
//                     value={formData.gender}
//                     onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//                     required
//                 >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                 </Form.Control>
//                 <Form.Control
//                     placeholder="Orphanage ID"
//                     value={formData.orphanageId}
//                     onChange={(e) => setFormData({ ...formData, orphanageId: e.target.value })}
//                     required
//                 />
//                 <Button type="submit">{formData.id ? 'Update' : 'Add'} Child</Button>
//             </Form>

//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Age</th>
//                         <th>Gender</th>
//                         <th>Orphanage ID</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {children.map((child) => (
//                         <tr key={child.id}>
//                             <td>{child.id}</td>
//                             <td>{child.name}</td>
//                             <td>{child.age}</td>
//                             <td>{child.gender}</td>
//                             <td>{child.orphanageId}</td>
//                             <td>
//                                 <Button
//                                     variant="warning"
//                                     onClick={() => setFormData({ ...child })} // Load child data into form
//                                 >
//                                     Edit
//                                 </Button>{' '}
//                                 <Button variant="danger" onClick={() => handleDelete(child.id)}>
//                                     Delete
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </div>
//     );
// };

// export default Children;


// import axios from "axios";
// import React, { useState, useEffect } from "react";


// const Children = () => {
//     const [children, setChildren] = useState([]);
//     useEffect(() => {
//         axios.get("http://localhost:8080/api/children", {
//             headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//         })
//             .then(response => setChildren(response.data))
//             .catch(error => console.error("Error fetching children:", error));
//           }, []);
//     return (
//         <div>
//             <h2>Children Details</h2>
//             {children.map(child => (
//                 <div key={child.id}>
//                     <p>Name: {child.name}</p>
//                     <p>Age: {child.age}</p>
//                     <p>Gender: {child.gender}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };
// export default Children; 

// src/components/Children.js
