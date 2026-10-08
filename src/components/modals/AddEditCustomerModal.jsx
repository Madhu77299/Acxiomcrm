import React, { useState } from "react";
import Modal from "../common/Modal";
import { useCrmData } from "../../context/CrmDataContext";

const AddEditCustomerModal = ({ customer = null, isOpen, onClose }) => {
  const { addCustomer, updateCustomer, users } = useCrmData();
  const isEditing = !!customer;

  const [formData, setFormData] = useState({
    name: customer?.name || "",
    contactName: customer?.contactName || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    industry: customer?.industry || "Financial Technology",
    tier: customer?.tier || "Enterprise",
    annualRevenue: customer?.annualRevenue || 1000000,
    employeeCount: customer?.employeeCount || 50,
    ownerId: customer?.ownerId || users[0]?.id || "usr_103",
    website: customer?.website || "",
    address: customer?.address || "",
    tags: customer?.tags?.join(", ") || "Key Account"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const owner = users.find((u) => u.id === formData.ownerId);

    const payload = {
      ...formData,
      annualRevenue: Number(formData.annualRevenue),
      employeeCount: Number(formData.employeeCount),
      ownerName: owner ? owner.name : "Sales Rep",
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
    };

    if (isEditing) {
      await updateCustomer(customer.id, payload);
    } else {
      await addCustomer(payload);
    }
    onClose();
  };

  return (
    <Modal title={isEditing ? `Edit Customer: ${customer.name}` : "Add New Customer"} isOpen={isOpen} onClose={onClose} size="lg">
      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold small">Company Name *</label>
            <input
              type="text"
              className="form-control"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Acme Global Inc."
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Primary Contact Name *</label>
            <input
              type="text"
              className="form-control"
              required
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              placeholder="e.g. Robert Vance"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Email Address *</label>
            <input
              type="email"
              className="form-control"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="robert@company.com"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold small">Industry</label>
            <select
              className="form-select"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            >
              <option value="Financial Technology">Financial Technology</option>
              <option value="Healthcare & Biotech">Healthcare & Biotech</option>
              <option value="Software & Security">Software & Security</option>
              <option value="Transportation & Freight">Transportation & Freight</option>
              <option value="Media & Broadcasting">Media & Broadcasting</option>
              <option value="Retail & E-Commerce">Retail & E-Commerce</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold small">Account Tier</label>
            <select
              className="form-select"
              value={formData.tier}
              onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
            >
              <option value="Enterprise">Enterprise</option>
              <option value="Mid-Market">Mid-Market</option>
              <option value="SMB">SMB</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold small">Account Owner</label>
            <select
              className="form-select"
              value={formData.ownerId}
              onChange={(e) => setFormData({ ...formData, ownerId: e.target.value })}
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.role})
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Annual Revenue ($)</label>
            <input
              type="number"
              className="form-control"
              value={formData.annualRevenue}
              onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Website URL</label>
            <input
              type="url"
              className="form-control"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://example.com"
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold small">Tags (comma separated)</label>
            <input
              type="text"
              className="form-control"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Key Account, High Priority, SaaS Core"
            />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 pt-2 border-top">
          <button type="button" className="btn btn-crm-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-crm-primary">
            {isEditing ? "Save Changes" : "Create Customer"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditCustomerModal;
