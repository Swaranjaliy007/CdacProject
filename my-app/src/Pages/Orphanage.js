import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Alert, Spinner } from 'react-bootstrap';

const Orphanage = () => {
    const [orphanages, setOrphanages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ id: '', name: '', address: '', contact: '', email: '' });

    useEffect(() => {
        fetchOrphanages();
    }, []);

    const fetchOrphanages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/orphanages');
            setOrphanages(response.data);
        } catch (err) {
            setError('Failed to fetch orphanages.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (formData.id) {
                // Update existing orphanage
                await axios.put(`http://localhost:8080/api/orphanages/${formData.id}`, formData);
                setOrphanages((prev) =>
                    prev.map((orp) => (orp.id === formData.id ? { ...orp, ...formData } : orp))
                );
            } else {
                // Add new orphanage
                const response = await axios.post('http://localhost:8080/api/orphanages', formData);
                setOrphanages((prev) => [...prev, response.data]);
            }

            setFormData({ id: '', name: '', address: '', contact: '', email: '' });
        } catch (err) {
            setError('Failed to add/update orphanage.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/orphanages/${id}`);
            setOrphanages((prev) => prev.filter((orp) => orp.id !== id));
        } catch (err) {
            setError('Failed to delete orphanage.');
        }
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <h2>Manage Orphanages</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Control
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <Form.Control
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                />
                <Form.Control
                    placeholder="Contact"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                />
                <Form.Control
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <Button type="submit">{formData.id ? 'Update' : 'Add'} Orphanage</Button>
            </Form>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orphanages.map((orp) => (
                        <tr key={orp.id}>
                            <td>{orp.id}</td>
                            <td>{orp.name}</td>
                            <td>{orp.address}</td>
                            <td>{orp.contact}</td>
                            <td>{orp.email}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => setFormData({ ...orp })} // Load orphanage data into form
                                >
                                    Edit
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(orp.id)}>
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

export default Orphanage;


//1
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, Button, Form, Alert, Spinner } from 'react-bootstrap';

// const Orphanage = () => {
//     const [orphanages, setOrphanages] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [formData, setFormData] = useState({ id: '', name: '', address: '', contact: '', email: '' });

//     useEffect(() => {
//         fetchOrphanages();
//     }, []);

//     const fetchOrphanages = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/orphanages');
//             setOrphanages(response.data);
//         } catch (err) {
//             setError('Failed to fetch orphanages.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (formData.id) {
//             await axios.put(`http://localhost:8080/api/orphanages/${formData.id}`, formData);
//         } else {
//             await axios.post('http://localhost:8080/api/orphanages', formData);
//         }
//         setFormData({ id: '', name: '', address: '', contact: '', email: '' });
//         fetchOrphanages();
//     };

//     const handleDelete = async (id) => {
//         await axios.delete(`http://localhost:8080/api/orphanages/${id}`);
//         fetchOrphanages();
//     };

//     if (loading) return <Spinner animation="border" />;
//     if (error) return <Alert variant="danger">{error}</Alert>;

//     return (
//         <div>
//             <h2>Manage Orphanages</h2>
//             <Form onSubmit={handleSubmit}>
//                 <Form.Control placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
//                 <Form.Control placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
//                 <Form.Control placeholder="Contact" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} required />
//                 <Form.Control placeholder="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
//                 <Button type="submit">{formData.id ? 'Update' : 'Add'} Orphanage</Button>
//             </Form>

//             <Table striped bordered hover>
//                 <thead>
//                     <tr><th>ID</th><th>Name</th><th>Address</th><th>Contact</th><th>Email</th><th>Actions</th></tr>
//                 </thead>
//                 <tbody>
//                     {orphanages.map(orp => (
//                         <tr key={orp.id}>
//                             <td>{orp.id}</td><td>{orp.name}</td><td>{orp.address}</td><td>{orp.contact}</td><td>{orp.email}</td>
//                             <td>
//                                 <Button onClick={() => setFormData(orp)}>Edit</Button>
//                                 <Button onClick={() => handleDelete(orp.id)}>Delete</Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </div>
//     );
// };

// export default Orphanage;

// // src/components/Orphanages.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, Spinner, Alert } from 'react-bootstrap';
// import './orphanage.css'; // Optional: Create a CSS file for styling

// const Orphanage = () => {
//     const [orphanages, setOrphanages] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchOrphanages = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/orphanages'); // Correct endpoint
//                 setOrphanages(response.data);
//             } catch (err) {
//                 setError('Failed to fetch orphanages. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrphanages();
//     }, []);

//     if (loading) {
//         return (
//             <div className="text-center">
//                 <Spinner animation="border" />
//                 <p>Loading orphanages...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return <Alert variant="danger">{error}</Alert>;
//     }

//     return (
//         <div className="orphanage-container">
//             <h2>Orphanages</h2>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Orphanage ID</th>
//                         <th>Name</th>
//                         <th>Address</th>
//                         <th>Contact</th>
//                         <th>Email</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {orphanages.map(orphanage => (
//                         <tr key={orphanage.id}> {/* Ensure it uses the correct ID field */}
//                             <td>{orphanage.id}</td>
//                             <td>{orphanage.name}</td>
//                             <td>{orphanage.address}</td>
//                             <td>{orphanage.contact}</td>
//                             <td>{orphanage.email}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </div>
//     );
// };

// export default Orphanage;


// // src/components/Orphanages.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, Spinner, Alert } from 'react-bootstrap';
// import './orphanage.css'; // Optional: Create a CSS file for styling

// const Orphanage = () => {
//     const [orphanage, setOrphanage] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchOrphanage = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/orphanage');
//                 setOrphanage(response.data);
//             } catch (err) {
//                 setError('Failed to fetch orphanages. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrphanage();
//     }, []);

//     if (loading) {
//         return (
//             <div className="text-center">
//                 <Spinner animation="border" />
//                 <p>Loading orphanages...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return <Alert variant="danger">{error}</Alert>;
//     }

//     return (
//         <div className="orphanage-container">
//             <h2>Orphanage</h2>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Orphanage ID</th>
//                         <th>Name</th>
//                         <th>Address</th>
//                         <th>Contact</th>
//                         <th>Email</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {orphanage.map(orphanage => (
//                         <tr key={orphanage.orphanage_id}>
//                             <td>{orphanage.orphanage_id}</td>
//                             <td>{orphanage.name}</td>
//                             <td>{orphanage.address}</td>
//                             <td>{orphanage.contact}</td>
//                             <td>{orphanage.email}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </div>
//     );
// };

// export default Orphanage;