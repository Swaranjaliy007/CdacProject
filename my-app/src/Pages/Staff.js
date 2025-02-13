
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Alert, Spinner } from "react-bootstrap";

const Staff = () => {
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        hireDate: "",
        contactNo: "",
        orphanageId: "",
    });

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/staff");
            setStaffList(response.data);
        } catch (err) {
            setError("Failed to fetch staff.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (formData.id) {
                // Update existing staff member
                await axios.put(
                    `http://localhost:8080/api/staff/${formData.id}`,
                    formData
                );
                setStaffList((prev) =>
                    prev.map((staff) =>
                        staff.id === formData.id ? { ...staff, ...formData } : staff
                    )
                );
            } else {
                // Add new staff to an orphanage
                const response = await axios.post(
                    `http://localhost:8080/api/staff/${formData.orphanageId}`,
                    formData
                );
                setStaffList((prev) => [...prev, response.data]);
            }

            // Reset form after submission
            setFormData({ id: "", name: "", hireDate: "", contactNo: "", orphanageId: "" });
        } catch (err) {
            setError("Failed to add/update staff.");
        }
    };

    // const handleDelete = async (id) => {
    //     if (!window.confirm("Are you sure you want to delete this staff member?")) return;

    //     try {
    //         await axios.delete(`http://localhost:8080/api/staff/${id}`);
    //         setStaff((prev) => prev.filter((staff) => staff.id !== id));
    //     } catch (error) {
    //         console.error("Failed to delete staff:", error);
    //         alert("Error deleting staff. Please try again.");
    //     }
    // };
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this staff member?")) return;
    
        try {
            await axios.delete(`http://localhost:8080/api/staff/${id}`);
            setStaffList((prev) => prev.filter((staff) => staff.id !== id)); // ✅ Correct state update
        } catch (error) {
            console.error("Error deleting staff:", error);
            alert("Failed to delete staff. It might be linked to other records.");
        }
    };
    
    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <br />
            <br />
            <br />
            <h2>Manage Staff</h2>

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
                    <Form.Label>Hire Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={formData.hireDate}
                        onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Contact No</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.contactNo}
                        onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                        required
                    />
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

                <Button type="submit">{formData.id ? "Update" : "Add"} Staff</Button>
            </Form>

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Hire Date</th>
                        <th>Contact No</th>
                        <th>Orphanage ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {staffList.map((staff) => (
                        <tr key={staff.id}>
                            <td>{staff.id}</td>
                            <td>{staff.name}</td>
                            <td>{staff.hireDate}</td>
                            <td>{staff.contactNo}</td>
                            <td>{staff.orphanage?.id || "N/A"}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => setFormData({ ...staff, orphanageId: staff.orphanage?.id || "" })}
                                >
                                    Edit
                                </Button>{" "}
                                <Button variant="danger" onClick={() => handleDelete(staff.id)}>
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

export default Staff;

//1 // src/components/StaffManagement.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
// import './staff.css'; // Optional: Create a CSS file for styling

// const Staff = () => {
//     const [Staff, setStaff] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const [currentStaff, setCurrentStaff] = useState({ staff_id: '', name: '', hiredate: '', contact_no: '', orphanage_id: '' });

//     useEffect(() => {
//         fetchStaff();
//     }, []);

//     const fetchStaff = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/Staff');
//             setStaff(response.data);
//         } catch (err) {
//             setError('Failed to fetch staff. Please try again later.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleShow = (staffMember) => {
//         setCurrentStaff(staffMember || { staff_id: '', name: '', hiredate: '', contact_no: '', orphanage_id: '' });
//         setShowModal(true);
//     };

//     const handleClose = () => setShowModal(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setCurrentStaff({ ...currentStaff, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (currentStaff.staff_id) {
//                 await axios.put(`http://localhost:8080/api/Staff/${currentStaff.staff_id}`, currentStaff);
//             } else {
//                 await axios.post('http://localhost:8080/api/Staff', currentStaff);
//             }
//             fetchStaff();
//             handleClose();
//         } catch (err) {
//             setError('Failed to save staff. Please try again later.');
//         }
//     };

//     const handleDelete = async (staff_id) => {
//         try {
//             await axios.delete(`http://localhost:8080/api/staff/${staff_id}`);
//             fetchStaff();
//         } catch (err) {
//             setError('Failed to delete staff. Please try again later.');
//         }
//     };

//     if (loading) {
//         return (
//             <div className="text-center">
//                 <Spinner animation="border" />
//                 <p>Loading staff...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return <Alert variant="danger">{error}</Alert>;
//     }

//     return (
//         <div className="staff-management-container">
//             <h2>Staff Management</h2>
//             <Button variant="primary" onClick={() => handleShow()}>Add Staff</Button>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Staff ID</th>
//                         <th>Name</th>
//                         <th>Hire Date</th>
//                         <th>Contact No</th>
//                         <th>Orphanage ID</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {Staff.map(staffMember => (
//                         <tr key={staffMember.staff_id}>
//                             <td>{staffMember.staff_id}</td>
//                             <td>{staffMember.name}</td>
//                             <td>{staffMember.hiredate}</td>
//                             <td>{staffMember.contact_no}</td>
//                             <td>{staffMember.orphanage_id}</td>
//                             <td>
//                                 <Button variant="warning" onClick={() => handleShow(staffMember)}>Edit</Button>
//                                 <Button variant="danger" onClick={() => handleDelete(staffMember.staff_id)}>Delete</Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             <Modal show={showModal} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>{currentStaff.staff_id ? 'Edit Staff' : 'Add Staff'}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group controlId="formName">
//                             <Form.Label>Name</Form.Label>
//                             <Form.Control type="text" name="name" value={currentStaff.name} onChange={handleChange} required />
//                         </Form.Group>
//                         <Form.Group controlId="formHireDate">
//                             <Form.Label>Hire Date</Form.Label>
//                             <Form.Control type="date" name="hiredate" value={currentStaff.hiredate} onChange={handleChange} required />
//                         </Form.Group>
//                         <Form.Group controlId="formContactNo">
//                             <Form.Label>Contact No</Form.Label>
//                             <Form.Control type="text" name="contact_no" value={currentStaff.contact_no} onChange={handleChange} required />
//                         </Form.Group>
//                         <Form.Group controlId="formOrphanageId">
//                             <Form.Label>Orphanage ID</Form.Label>
//                             <Form.Control type="text" name="orphanage_id" value={currentStaff.orphanage_id} onChange={handleChange} required />
//                         </Form.Group>
//                         <Button variant="primary" type="submit">
//                             {currentStaff.staff_id ? 'Update Staff' : 'Add Staff'}
//                         </Button>
//                     </Form>
//                 </Modal.Body>
//             </Modal>
//         </div>
//     );
// };

// export default Staff;