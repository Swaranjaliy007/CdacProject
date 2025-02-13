import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Donation = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [donationId, setDonationId] = useState('');
    const [userId, setUserId] = useState('');
    const [amount, setAmount] = useState('');

    const API_BASE_URL = 'http://localhost:8080/api/donations';

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            setDonations(response.data);
            console.log(response.data);
            
        } catch (err) {
            setError('Failed to fetch donations.');
        } finally {
            setLoading(false);
        }
    };

    const fetchDonationById = async () => {
        if (!donationId) return;
        try {
            const response = await axios.get(`${API_BASE_URL}/${donationId}`);
            alert(`Donation ID: ${response.data.donationId}, Amount: ${response.data.payAmount}`);
        } catch (err) {
            setError('Donation not found.');
        }
    };

    const fetchDonationsByUser = async () => {
        if (!userId) return;
        try {
            const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
            setDonations(response.data);
        } catch (err) {
            setError('No donations found for this user.');
        }
    };

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'userId') setUserId(value);
        if (name === 'amount') setAmount(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/${userId}`, null, { params: { amount } });
            fetchDonations();
            handleClose();
        } catch (err) {
            setError('Failed to process donation.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this donation?')) return;
        try {
            await axios.delete(`${API_BASE_URL}/delete/${id}`);
            fetchDonations();
        } catch (err) {
            setError('Failed to delete donation.');
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
                <p>Loading donations...</p>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2>Donation Management</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" onClick={handleShow}>Make a Donation</Button>

            <div className="mt-3">
                <Form.Control
                    type="number"
                    placeholder="Enter Donation ID"
                    value={donationId}
                    onChange={(e) => setDonationId(e.target.value)}
                    className="mb-2"
                />
                <Button variant="info" onClick={fetchDonationById}>Find by ID</Button>
            </div>

            <div className="mt-3">
                <Form.Control
                    type="number"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="mb-2"
                />
                <Button variant="warning" onClick={fetchDonationsByUser}>Find by User</Button>
            </div>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Amount</th>
                        <th>Donation Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {donations.map((donation) => (
                        <tr key={donation.donationId}>
                            <td>{donation.donationId}</td>
                            <td>{donation.userId}</td>
                            <td>{donation.payAmount} Rs</td>
                            <td>{donation.donationDate}</td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(donation.donationId)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Make a Donation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>User ID</Form.Label>
                            <Form.Control
                                type="number"
                                name="userId"
                                value={userId}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                value={amount}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Donate
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Donation;
