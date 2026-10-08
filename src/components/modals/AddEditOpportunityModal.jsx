import React, { useState } from "react";
import Modal from "../common/Modal";
import { useCrmData } from "../../context/CrmDataContext";

const AddEditOpportunityModal = ({ opportunity = null, isOpen, onClose }) => {
  const { addOpportunity, customers, users } = useCrmData();
  const isEditing = !!opportunity;

  const [formData, setFormData] = useState({
    name: opportunity?.name || "",
    customerId: opportunity?.customerId || (customers[0]?.id || ""),
    dealValue: opportunity?.dealValue || 100000,
    stage: opportunity?.stage || "Prospecting",
    winProbability: opportunity?.winProbability || 25,
    expectedCloseDate: opportunity?.expectedCloseDate || new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
    ownerId: opportunity?.ownerId || users[0]?.id || "usr_103",
    contactPerson: opportunity?.contactPerson || "",
    leadSource: opportunity?.leadSource || "Website Form",
    notes: opportunity?.notes || ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cust = customers.find((c) => c.id === formData.customerId);
    const owner = users.find((u) => u.id === formData.ownerId);

    const payload = {
      ...formData,
      customerName: cust ? cust.name : "Customer",
      ownerName: owner ? owner.name : "Sales Rep",
      dealValue: Number(formData.dealValue),
      winProbability: Number(formData.winProbability)
    };

    if (isEditing) {
      // Handled via stage updates or context
    } else {
      await addOpportunity(payload);
    }
    onClose();
  };

  return (
    <Modal title={isEditing ? `Edit Opportunity: ${opportunity.name}` : "Add Opportunity Deal"} isOpen={isOpen} onClose={onClose} size="lg">
      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold small">Opportunity / Deal Title *</label>
            <input
              type="text"
              className="form-control"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Enterprise License Expansion"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Associated Customer *</label>
            <select
              className="form-select"
              required
              value={formData.customerId}
              onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.tier})
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold small">Deal Value ($) *</label>
            <input
              type="number"
              className="form-control"
              required
              value={formData.dealValue}
              onChange={(e) => setFormData({ ...formData, dealValue: e.target.value })}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold small">Pipeline Stage</label>
            <select
              className="form-select"
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
            >
              <option value="Prospecting">Prospecting</option>
              <option value="Qualification">Qualification</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Closed Won">Closed Won</option>
              <option value="Closed Lost">Closed Lost</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold small">Win Probability (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              className="form-control"
              value={formData.winProbability}
              onChange={(e) => setFormData({ ...formData, winProbability: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Expected Close Date</label>
            <input
              type="date"
              className="form-control"
              required
              value={formData.expectedCloseDate}
              onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Deal Owner</label>
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
            <label className="form-label fw-semibold small">Notes & Strategy</label>
            <textarea
              className="form-control"
              rows="3"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Outline deal milestones, key stakeholders, and next steps..."
            ></textarea>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 pt-2 border-top">
          <button type="button" className="btn btn-crm-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-crm-primary">
            Save Opportunity
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditOpportunityModal;
