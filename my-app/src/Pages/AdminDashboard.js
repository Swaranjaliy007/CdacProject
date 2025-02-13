
import React, { useEffect, useState } from "react";
import {
  getOrphanages, addOrphanage, updateOrphanage, deleteOrphanage,
  getChildren, addChild, updateChild, deleteChild,
  getUsers, deleteUser,
  getStaff, addStaff, updateStaff, deleteStaff,
  getDonations,
  getAdoptions
} from "../api"; // Ensure correct API import

const AdminDashboard = () => {
  const [orphanages, setOrphanages] = useState([]);
  const [children, setChildren] = useState([]);
  const [users, setUsers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [donations, setDonations] = useState([]);
  const [adoptions, setAdoptions] = useState([]);
  const [newOrphanage, setNewOrphanage] = useState("");

  // Fetch all data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getOrphanages().then((res) => setOrphanages(res.data));
    getChildren().then((res) => setChildren(res.data));
    getUsers().then((res) => setUsers(res.data));
    getStaff().then((res) => setStaff(res.data));
    getDonations().then((res) => setDonations(res.data));
    getAdoptions().then((res) => setAdoptions(res.data));
  };

  // Add new orphanage
  const handleAddOrphanage = () => {
    if (!newOrphanage.trim()) return;
    addOrphanage({ name: newOrphanage }).then(() => {
      setNewOrphanage("");
      fetchData();
    });
  };

  // Delete orphanage
  const handleDeleteOrphanage = (id) => {
    deleteOrphanage(id).then(fetchData);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Orphanages Section */}
      <h3>Orphanages</h3>
      <input
        type="text"
        value={newOrphanage}
        onChange={(e) => setNewOrphanage(e.target.value)}
        placeholder="New Orphanage Name"
      />
      <button onClick={handleAddOrphanage}>Add Orphanage</button>
      <ul>
        {orphanages.map((o) => (
          <li key={o.id}>
            {o.name}
            <button onClick={() => handleDeleteOrphanage(o.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Children Section */}
      <h3>Children</h3>
      <ul>{children.map((c) => <li key={c.id}>{c.name}</li>)}</ul>

      {/* Users Section */}
      <h3>Users</h3>
      <ul>{users.map((u) => <li key={u.id}>{u.name} - {u.role}</li>)}</ul>

      {/* Staff Section */}
      <h3>Staff</h3>
      <ul>{staff.map((s) => <li key={s.id}>{s.name}</li>)}</ul>

      {/* Donations Section */}
      <h3>Donations</h3>
      <ul>{donations.map((d) => <li key={d.id}>{d.amount} by {d.user?.name}</li>)}</ul>

      {/* Adoptions Section */}
      <h3>Adopted Children</h3>
      <ul>{adoptions.map((a) => <li key={a.id}>{a.child?.name} adopted by {a.user?.name}</li>)}</ul>
    </div>
  );
};

export default AdminDashboard;


// import React, { useEffect, useState } from "react";
// import { getOrphanages, getChildren, getUsers, getStaff, getDonations, getAdoptions } from "./api";

// const AdminDashboard = () => {
//   const [orphanages, setOrphanages] = useState([]);
//   const [children, setChildren] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [staff, setStaff] = useState([]);
//   const [donations, setDonations] = useState([]);
//   const [adoptions, setAdoptions] = useState([]);

//   useEffect(() => {
//     getOrphanages().then((res) => setOrphanages(res.data));
//     getChildren().then((res) => setChildren(res.data));
//     getUsers().then((res) => setUsers(res.data));
//     getStaff().then((res) => setStaff(res.data));
//     getDonations().then((res) => setDonations(res.data));
//     getAdoptions().then((res) => setAdoptions(res.data));
//   }, []);

//   return (
//     <div>
//       <h2>Admin Dashboard</h2>
//       <h3>Orphanages</h3>
//       <ul>{orphanages.map((o) => <li key={o.id}>{o.name}</li>)}</ul>

//       <h3>Children</h3>
//       <ul>{children.map((c) => <li key={c.id}>{c.name}</li>)}</ul>

//       <h3>Users</h3>
//       <ul>{users.map((u) => <li key={u.id}>{u.name} - {u.role}</li>)}</ul>

//       <h3>Staff</h3>
//       <ul>{staff.map((s) => <li key={s.id}>{s.name}</li>)}</ul>

//       <h3>Donations</h3>
//       <ul>{donations.map((d) => <li key={d.id}>{d.amount} by {d.user.name}</li>)}</ul>

//       <h3>Adopted Children</h3>
//       <ul>{adoptions.map((a) => <li key={a.id}>{a.child.name} adopted by {a.user.name}</li>)}</ul>
//     </div>
//   );
// };

// export default AdminDashboard;
