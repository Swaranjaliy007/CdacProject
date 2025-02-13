import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import './adoptedchild.css';

const AdoptedChild = () => {
    const [adoptedChildren, setAdoptedChildren] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentAdoption, setCurrentAdoption] = useState({ userId: '', childId: '', adoptionDate: '' });

    useEffect(() => {
        fetchAdoptedChildren();
    }, []);

    const fetchAdoptedChildren = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/adoptions');
            setAdoptedChildren(response.data);
        } catch (err) {
            console.error('Error fetching adopted children:', err);
            setError('Failed to fetch adopted children. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleShow = (adoption) => {
        setCurrentAdoption(adoption || { userId: '', childId: '', adoptionDate: '' });
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentAdoption({ ...currentAdoption, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (currentAdoption.id) {
                await axios.put(`http://localhost:8080/api/adoptions/${currentAdoption.id}`, currentAdoption);
            } else {
                await axios.post('http://localhost:8080/api/adoptions/create', currentAdoption);
            }
            fetchAdoptedChildren();
            handleClose();
        } catch (err) {
            console.error('Error saving adoption:', err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Failed to save adoption. Please try again later.');
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/adoptions/${id}`);
            fetchAdoptedChildren();
        } catch (err) {
            console.error('Error deleting adoption:', err);
            setError('Failed to delete adoption. Please try again later.');
        }
    };

    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" />
                <p>Loading adopted children...</p>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div className="adopted-child-management-container">
            <h2>Adopted Child Management</h2>
            <Button variant="primary" onClick={() => handleShow()}>Add Adoption</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Adoption ID</th>
                        <th>User ID</th>
                        <th>Child ID</th>
                        <th>Adoption Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {adoptedChildren.map(adoption => (
                        <tr key={adoption.id}>
                            <td>{adoption.id}</td>
                            <td>{adoption.userId}</td>
                            <td>{adoption.childId}</td>
                            <td>{adoption.adoptionDate}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleShow(adoption)}>Edit</Button> {/* Pass the whole adoption object */}
                                <Button variant="danger" onClick={() => handleDelete(adoption.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentAdoption.id ? 'Edit Adoption' : 'Add Adoption'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUserId">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control type="text" name="userId" value={currentAdoption.userId} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formChildId">
                            <Form.Label>Child ID</Form.Label>
                            <Form.Control type="text" name="childId" value={currentAdoption.childId} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formAdoptionDate">
                            <Form.Label>Adoption Date</Form.Label>
                            <Form.Control type="date" name="adoptionDate" value={currentAdoption.adoptionDate} onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {currentAdoption.id ? 'Update Adoption' : 'Add Adoption'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdoptedChild;