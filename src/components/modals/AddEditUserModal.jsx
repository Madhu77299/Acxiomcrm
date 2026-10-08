import React, { useState } from "react";
import Modal from "../common/Modal";
import { useCrmData } from "../../context/CrmDataContext";

const AddEditUserModal = ({ user = null, isOpen, onClose }) => {
  const { addUser, updateUser, roles } = useCrmData();
  const isEditing = !!user;

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "Sales Rep",
    department: user?.department || "Global Sales",
    phone: user?.phone || "",
    status: user?.status || "Active"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateUser(user.id, formData);
    } else {
      await addUser(formData);
    }
    onClose();
  };

  return (
    <Modal title={isEditing ? `Edit User: ${user.name}` : "Add New System User"} isOpen={isOpen} onClose={onClose} size="md">
      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-12">
            <label className="form-label fw-semibold small">Full Name *</label>
            <input
              type="text"
              className="form-control"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Marcus Sterling"
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold small">Corporate Email *</label>
            <input
              type="email"
              className="form-control"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="m.sterling@acxiomcrm.com"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">CRM Role</label>
            <select
              className="form-select"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              {roles.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Department</label>
            <input
              type="text"
              className="form-control"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Status</label>
            <select
              className="form-select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 pt-2 border-top">
          <button type="button" className="btn btn-crm-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-crm-primary">
            {isEditing ? "Save Changes" : "Create User"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditUserModal;
