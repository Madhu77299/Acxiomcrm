import React, { useState } from "react";
import Modal from "../common/Modal";
import { useCrmData } from "../../context/CrmDataContext";

const AddEditLeadModal = ({ lead = null, isOpen, onClose }) => {
  const { addLead, updateLead, users } = useCrmData();
  const isEditing = !!lead;

  const [formData, setFormData] = useState({
    company: lead?.company || "",
    contactName: lead?.contactName || "",
    title: lead?.title || "",
    email: lead?.email || "",
    phone: lead?.phone || "",
    source: lead?.source || "Website Form",
    status: lead?.status || "New",
    score: lead?.score || 65,
    rating: lead?.rating || "Warm",
    industry: lead?.industry || "Software & Security",
    estimatedValue: lead?.estimatedValue || 50000,
    ownerId: lead?.ownerId || users[0]?.id || "usr_103",
    notes: lead?.notes || ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const owner = users.find((u) => u.id === formData.ownerId);

    const payload = {
      ...formData,
      score: Number(formData.score),
      estimatedValue: Number(formData.estimatedValue),
      ownerName: owner ? owner.name : "Sales Rep"
    };

    if (isEditing) {
      await updateLead(lead.id, payload);
    } else {
      await addLead(payload);
    }
    onClose();
  };

  return (
    <Modal title={isEditing ? `Edit Lead: ${lead.company}` : "Add New Lead"} isOpen={isOpen} onClose={onClose} size="lg">
      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold small">Company Name *</label>
            <input
              type="text"
              className="form-control"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g. CloudScale Systems"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Contact Person *</label>
            <input
              type="text"
              className="form-control"
              required
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              placeholder="e.g. Jonathan Hayes"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Job Title</label>
            <input
              type="text"
              className="form-control"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. VP of Infrastructure"
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
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold small">Lead Source</label>
            <select
              className="form-select"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            >
              <option value="Website Form">Website Form</option>
              <option value="LinkedIn Outreach">LinkedIn Outreach</option>
              <option value="Trade Show Conference">Trade Show Conference</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
              <option value="Inbound Call">Inbound Call</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold small">Lead Status</label>
            <select
              className="form-select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Unqualified">Unqualified</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold small">Rating</label>
            <select
              className="form-select"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            >
              <option value="Hot">Hot 🔥</option>
              <option value="Warm">Warm ☀️</option>
              <option value="Cold">Cold ❄️</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold small">Estimated Deal Value ($)</label>
            <input
              type="number"
              className="form-control"
              value={formData.estimatedValue}
              onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold small">Lead Score (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              className="form-control"
              value={formData.score}
              onChange={(e) => setFormData({ ...formData, score: e.target.value })}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold small">Assigned Sales Rep</label>
            <select
              className="form-select"
              value={formData.ownerId}
              onChange={(e) => setFormData({ ...formData, ownerId: e.target.value })}
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold small">Initial Notes & Discovery Context</label>
            <textarea
              className="form-control"
              rows="3"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Record details from lead inquiry..."
            ></textarea>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 pt-2 border-top">
          <button type="button" className="btn btn-crm-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-crm-primary">
            {isEditing ? "Update Lead" : "Save Lead"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditLeadModal;
