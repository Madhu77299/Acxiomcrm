import React, { useState } from "react";
import Modal from "../common/Modal";
import { useCrmData } from "../../context/CrmDataContext";

const LogActivityModal = ({ isOpen, onClose }) => {
  const { logActivity, customers } = useCrmData();

  const [formData, setFormData] = useState({
    type: "Call",
    title: "",
    entityName: customers[0]?.name || "General Client",
    duration: "15 mins",
    notes: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await logActivity(formData);
    onClose();
  };

  return (
    <Modal title="Log Customer Interaction Activity" isOpen={isOpen} onClose={onClose} size="md">
      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold small">Activity Type</label>
            <select
              className="form-select"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Call">Phone Call</option>
              <option value="Meeting">In-Person / Virtual Meeting</option>
              <option value="Email">Email Communication</option>
              <option value="Task">Task Completion</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Duration</label>
            <input
              type="text"
              className="form-control"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g. 30 mins"
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold small">Activity Title / Subject *</label>
            <input
              type="text"
              className="form-control"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Technical Discovery Session"
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold small">Related Company / Account</label>
            <input
              type="text"
              className="form-control"
              value={formData.entityName}
              onChange={(e) => setFormData({ ...formData, entityName: e.target.value })}
              placeholder="e.g. Acme Global Solutions"
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold small">Interaction Summary & Key Takeaways</label>
            <textarea
              className="form-control"
              rows="3"
              required
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Record main topics discussed..."
            ></textarea>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 pt-2 border-top">
          <button type="button" className="btn btn-crm-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-crm-primary">
            Log Activity
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LogActivityModal;
