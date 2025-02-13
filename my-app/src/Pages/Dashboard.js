
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './dashboard.css'; // Optional: Create a CSS file for styling

const Dashboard = () => {
    return (
        <Container className="dashboard-container">
            <h2>Dashboard</h2>
            <Row>
                <Col md={2}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Orphanage</Card.Title>
                            <Card.Text>
                                View and manage orphanage.
                            </Card.Text>
                            <Link to="/orphanage" className="btn btn-primary">Go to Orphanage</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Children</Card.Title>
                            <Card.Text>
                                View and manage children.
                            </Card.Text>
                            <Link to="/children" className="btn btn-primary">Go to Children</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Staff</Card.Title>
                            <Card.Text>
                                View and manage staff members.
                            </Card.Text>
                            <Link to="/staff" className="btn btn-primary">Go to Staff</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={2}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Users</Card.Title>
                            <Card.Text>
                                View and manage users.
                            </Card.Text>
                            <Link to="/users" className="btn btn-primary">Go to Users</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Donations</Card.Title>
                            <Card.Text>
                                View and manage donations.
                            </Card.Text>
                            <Link to="/donations" className="btn btn-primary">Go to Donations</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Adopted Children</Card.Title>
                            <Card.Text>
                                View and manage adopted children.
                            </Card.Text>
                            <Link to="/adopted-children" className="btn btn-primary">Go to Adopted Children</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;




// // src/components/Dashboard.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table } from 'react-bootstrap';
// import './dashboard.css'; // Optional: Create a CSS file for styling

// const Dashboard = () => {
//     const [orphanages, setOrphanages] = useState([]);
//     const [children, setChildren] = useState([]);
//     const [staff, setStaff] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [donations, setDonations] = useState([]);
//     const [adoptedChildren, setAdoptedChildren] = useState([]);

//     useEffect(() => {
//         // Fetch data from your API
//         const fetchData = async () => {
//             try {
//                 const orphanageResponse = await axios.get('http://localhost:8080/api/orphanages');
//                 const childResponse = await axios.get('http://localhost:8080/api/children');
//                 const staffResponse = await axios.get('http://localhost:8080/api/staff');
//                 const userResponse = await axios.get('http://localhost:8080/api/users');
//                 const donationResponse = await axios.get('http://localhost:8080/api/donations');
//                 const adoptedChildResponse = await axios.get('http://localhost:8080/api/adopted-children');

//                 setOrphanages(orphanageResponse.data);
//                 setChildren(childResponse.data);
//                 setStaff(staffResponse.data);
//                 setUsers(userResponse.data);
//                 setDonations(donationResponse.data);
//                 setAdoptedChildren(adoptedChildResponse.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div className="dashboard-container">
//             <h2>Dashboard</h2>

//             <h3>Orphanages</h3>
//             {/* <Table striped bordered hover>
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
//                         <tr key={orphanage.orphanage_id}>
//                             <td>{orphanage.orphanage_id}</td>
//                             <td>{orphanage.name}</td>
//                             <td>{orphanage.address}</td>
//                             <td>{orphanage.contact}</td>
//                             <td>{orphanage.email}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table> */}

//             <h3>Children</h3>
//             {/* <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Child ID</th>
//                         <th>Name</th>
//                         <th>Age</th>
//                         <th>Gender</th>
//                         <th>Orphanage ID</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {children.map(child => (
//                         <tr key={child.child_id}>
//                             <td>{child.child_id}</td>
//                             <td>{child.name}</td>
//                             <td>{child.age}</td>
//                             <td>{child.gender}</td>
//                             <td>{child.orphanage_id}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table> */}

//             <h3>Staff</h3>
//             {/* <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Staff ID</th>
//                         <th>Name</th>
//                         <th>Hire Date</th>
//                         <th>Contact No</th>
//                         <th>Orphanage ID</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {staff.map(member => (
//                         <tr key={member.staff_id}>
//                             <td>{member.staff_id}</td>
//                             <td>{member.name}</td>
//                             <td>{member.hiredate}</td>
//                             <td>{member.contact_no}</td>
//                             <td>{member.orphanage_id}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table> */}

//             <h3>Users</h3>
//             {/* <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>User ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Role</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user.user_id}>
//                             <td>{user.user_id}</td>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>{user.role}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table> */}

//             <h3>Donations</h3>
//             {/* <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Donation ID</th>
//                         <th>User ID</th>
//                         <th>Amount</th>
//                         <th>Donation Date</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {donations.map(donation => (
//                         <tr key={donation.donation_id}>
//                             <td>{donation.donation_id}</td>
//                             <td>{donation.user_id}</td>
//                             <td>{donation.payamount}</td>
//                             <td>{donation.donationdate}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table> */}

//             <h3>Adopted Children</h3>
//             {/* <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Adoption ID</th>
//                         <th>User ID</th>
//                         <th>Child ID</th>
//                         <th>Adoption Date</th>
//                     </tr>
//                 </thead>

//                  <tbody>
//                     {donations.map(donation => (
//                         <tr key={donation.donation_id}>
//                             <td>{donation.donation_id}</td>
//                             <td>{donation.user_id}</td>
//                             <td>{donation.payamount}</td>
//                             <td>{donation.donationdate}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//           </Table>     */}
//        </div>
//     ) 
// } 


// export default Dashboard;



// src/components/Dashboard.js