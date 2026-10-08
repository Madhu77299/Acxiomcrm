import React, { useState } from "react";
import Modal from "../common/Modal";
import { useCrmData } from "../../context/CrmDataContext";

const ScheduleFollowUpModal = ({ isOpen, onClose, initialEntity = null }) => {
  const { addFollowUp, customers, leads, opportunities, users } = useCrmData();

  const [formData, setFormData] = useState({
    title: "",
    entityType: initialEntity ? initialEntity.type : "Customer",
    entityId: initialEntity ? initialEntity.id : (customers[0]?.id || ""),
    type: "Call",
    priority: "High",
    dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    dueTime: "14:00",
    assignedToId: users[0]?.id || "usr_103",
    notes: ""
  });

  const getEntityOptions = () => {
    if (formData.entityType === "Customer") return customers.map(c => ({ id: c.id, name: c.name }));
    if (formData.entityType === "Lead") return leads.map(l => ({ id: l.id, name: l.company }));
    if (formData.entityType === "Opportunity") return opportunities.map(o => ({ id: o.id, name: o.name }));
    return [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = getEntityOptions();
    const selectedObj = options.find((o) => o.id === formData.entityId);
    const assignedUser = users.find((u) => u.id === formData.assignedToId);

    await addFollowUp({
      ...formData,
      entityName: selectedObj ? selectedObj.name : "Target Record",
      assignedToName: assignedUser ? assignedUser.name : "Sales Rep"
    });
    onClose();
  };

  return (
    <Modal title="Schedule Follow-Up Task" isOpen={isOpen} onClose={onClose} size="md">
      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-12">
            <label className="form-label fw-semibold small">Task Title *</label>
            <input
              type="text"
              className="form-control"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Contract Sign-off Call"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Target Record Type</label>
            <select
              className="form-select"
              value={formData.entityType}
              onChange={(e) => {
                const newType = e.target.value;
                let defaultId = "";
                if (newType === "Customer") defaultId = customers[0]?.id || "";
                if (newType === "Lead") defaultId = leads[0]?.id || "";
                if (newType === "Opportunity") defaultId = opportunities[0]?.id || "";
                setFormData({ ...formData, entityType: newType, entityId: defaultId });
              }}
            >
              <option value="Customer">Customer</option>
              <option value="Lead">Lead</option>
              <option value="Opportunity">Opportunity</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Linked Record</label>
            <select
              className="form-select"
              value={formData.entityId}
              onChange={(e) => setFormData({ ...formData, entityId: e.target.value })}
            >
              {getEntityOptions().map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Follow-Up Channel</label>
            <select
              className="form-select"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Call">Phone Call</option>
              <option value="Email">Email Communication</option>
              <option value="Meeting">Executive Meeting</option>
              <option value="Task">Internal Task</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Priority Level</label>
            <select
              className="form-select"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Due Date</label>
            <input
              type="date"
              className="form-control"
              required
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold small">Time</label>
            <input
              type="time"
              className="form-control"
              value={formData.dueTime}
              onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold small">Assignee</label>
            <select
              className="form-select"
              value={formData.assignedToId}
              onChange={(e) => setFormData({ ...formData, assignedToId: e.target.value })}
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.role})
                </option>
              ))}
            </select>
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold small">Action Items & Agenda</label>
            <textarea
              className="form-control"
              rows="2"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Notes or agenda for this follow-up..."
            ></textarea>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 pt-2 border-top">
          <button type="button" className="btn btn-crm-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-crm-primary">
            Schedule Task
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ScheduleFollowUpModal;
