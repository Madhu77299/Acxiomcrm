import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCrmData } from "../../context/CrmDataContext";
import Badge from "../../components/common/Badge";
import AddEditUserModal from "../../components/modals/AddEditUserModal";
import { Users, Plus, ShieldCheck, Edit2, CheckCircle2, XCircle } from "lucide-react";

const UserList = () => {
  const { users, updateUser } = useCrmData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const toggleUserStatus = async (user) => {
    const newStatus = user.status === "Active" ? "Inactive" : "Active";
    await updateUser(user.id, { status: newStatus });
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">Users & Organization Management</h4>
          <p className="text-muted small m-0">Manage system user profiles, sales reps, departments, and security roles</p>
        </div>

        <div className="d-flex gap-2">
          <Link to="/users/roles" className="btn btn-crm-outline btn-sm">
            <ShieldCheck size={15} /> Roles & Permissions Matrix
          </Link>
          <button className="btn btn-crm-primary btn-sm" onClick={() => setShowAddModal(true)}>
            <Plus size={15} /> Add User
          </button>
        </div>
      </div>

      <div className="crm-table-container">
        <table className="crm-table">
          <thead>
            <tr>
              <th>User Profile</th>
              <th>Email</th>
              <th>Department</th>
              <th>CRM Role</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((usr) => (
              <tr key={usr.id}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={usr.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"}
                      alt={usr.name}
                      className="rounded-circle border"
                      style={{ width: "36px", height: "36px", objectFit: "cover" }}
                    />
                    <div>
                      <div className="fw-semibold text-dark">{usr.name}</div>
                      <div className="text-muted extra-small">{usr.phone || "+1 (555) 000-0000"}</div>
                    </div>
                  </div>
                </td>

                <td className="small">{usr.email}</td>
                <td className="small">{usr.department}</td>
                <td>
                  <span className={`badge ${usr.role === "Admin" ? "bg-danger-subtle text-danger" : usr.role === "Sales Manager" ? "bg-primary-subtle text-primary" : "bg-light text-dark border"}`}>
                    {usr.role}
                  </span>
                </td>

                <td><Badge status={usr.status} /></td>

                <td className="text-muted small">
                  {usr.createdAt ? new Date(usr.createdAt).toLocaleDateString() : "2025-01-10"}
                </td>

                <td className="text-end">
                  <div className="d-flex align-items-center justify-content-end gap-1">
                    <button
                      className="btn btn-sm btn-light border p-1"
                      title="Toggle Active Status"
                      onClick={() => toggleUserStatus(usr)}
                    >
                      {usr.status === "Active" ? <XCircle size={15} className="text-warning" /> : <CheckCircle2 size={15} className="text-success" />}
                    </button>

                    <button
                      className="btn btn-sm btn-light border p-1"
                      title="Edit User Details"
                      onClick={() => setEditingUser(usr)}
                    >
                      <Edit2 size={15} className="text-primary" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && <AddEditUserModal isOpen={true} onClose={() => setShowAddModal(false)} />}
      {editingUser && <AddEditUserModal user={editingUser} isOpen={true} onClose={() => setEditingUser(null)} />}
    </div>
  );
};

export default UserList;
