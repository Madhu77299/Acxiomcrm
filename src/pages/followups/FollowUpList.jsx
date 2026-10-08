import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useCrmData } from "../../context/CrmDataContext";
import Badge from "../../components/common/Badge";
import Pagination from "../../components/common/Pagination";
import ScheduleFollowUpModal from "../../components/modals/ScheduleFollowUpModal";
import Modal from "../../components/common/Modal";
import {
  CalendarCheck,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  RotateCcw,
  Phone,
  Mail,
  Users
} from "lucide-react";

const FollowUpList = () => {
  const { onOpenGlobalModal } = useOutletContext();
  const { followUps, updateFollowUpStatus, addFollowUp } = useCrmData();

  const [activeTab, setActiveTab] = useState("Upcoming"); // 'All', 'Upcoming', 'Overdue', 'Completed', 'Missed'
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [rescheduleModal, setRescheduleModal] = useState({ isOpen: false, item: null, newDate: "", newTime: "10:00" });

  const itemsPerPage = 6;

  const filteredFollowUps = followUps.filter((f) => {
    const matchesTab = activeTab === "All" || f.status === activeTab;
    const matchesPriority = priorityFilter === "All" || f.priority === priorityFilter;
    return matchesTab && matchesPriority;
  });

  const paginatedItems = filteredFollowUps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleReschedule = async () => {
    if (rescheduleModal.item) {
      await updateFollowUpStatus(rescheduleModal.item.id, "Upcoming");
      await addFollowUp({
        ...rescheduleModal.item,
        title: `Rescheduled: ${rescheduleModal.item.title}`,
        dueDate: rescheduleModal.newDate,
        dueTime: rescheduleModal.newTime,
        status: "Upcoming"
      });
      setRescheduleModal({ isOpen: false, item: null, newDate: "", newTime: "10:00" });
    }
  };

  const channelIcons = {
    Call: <Phone size={15} className="text-primary" />,
    Email: <Mail size={15} className="text-info" />,
    Meeting: <Users size={15} className="text-warning" />,
    Task: <CalendarCheck size={15} className="text-success" />
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">Follow-Up Tasks & Reminders</h4>
          <p className="text-muted small m-0">Schedule calls, executive meetings, and follow up on pending deals</p>
        </div>

        <button className="btn btn-crm-primary btn-sm" onClick={() => onOpenGlobalModal("schedule-flw")}>
          <Plus size={15} /> Schedule Follow-Up
        </button>
      </div>

      {/* Tabs & Priority Filter */}
      <div className="crm-card mb-4">
        <div className="crm-card-header p-0 px-3 d-flex justify-content-between align-items-center">
          <div className="crm-nav-tabs">
            {["Upcoming", "Overdue", "Completed", "Missed", "All"].map((tab) => (
              <span
                key={tab}
                className={`crm-tab-item ${activeTab === tab ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
              >
                {tab} (
                {tab === "All"
                  ? followUps.length
                  : followUps.filter((f) => f.status === tab).length}
                )
              </span>
            ))}
          </div>

          <div className="pe-2">
            <select
              className="form-select form-select-sm shadow-none"
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>

        {/* Task Cards Grid */}
        <div className="crm-card-body">
          {paginatedItems.length === 0 ? (
            <div className="text-center py-5 text-muted">No tasks found in this tab.</div>
          ) : (
            <div className="row g-3">
              {paginatedItems.map((task) => (
                <div key={task.id} className="col-md-6 col-lg-4">
                  <div className="border rounded-3 p-3 bg-white shadow-sm h-100 d-flex flex-direction-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-2">
                          {channelIcons[task.type] || <CalendarCheck size={15} />}
                          <span className="fw-bold text-dark" style={{ fontSize: "0.9rem" }}>{task.title}</span>
                        </div>
                        <Badge status={task.priority} />
                      </div>

                      <div className="text-muted extra-small mb-2">
                        Linked Record: <strong>{task.entityName}</strong>
                      </div>

                      <div className="p-2 bg-light rounded text-secondary extra-small mb-3">
                        "{task.notes || "No notes provided"}"
                      </div>
                    </div>

                    <div>
                      <div className="d-flex align-items-center justify-content-between text-muted extra-small border-top pt-2 mb-2">
                        <div className="d-flex align-items-center gap-1">
                          <Clock size={13} /> {task.dueDate} at {task.dueTime}
                        </div>
                        <Badge status={task.status} />
                      </div>

                      <div className="d-flex gap-2">
                        {task.status !== "Completed" && (
                          <button
                            className="btn btn-sm btn-crm-primary flex-grow-1 py-1"
                            onClick={() => updateFollowUpStatus(task.id, "Completed")}
                          >
                            <CheckCircle2 size={14} /> Complete
                          </button>
                        )}

                        <button
                          className="btn btn-sm btn-crm-outline py-1"
                          onClick={() => setRescheduleModal({ isOpen: true, item: task, newDate: task.dueDate, newTime: task.dueTime })}
                        >
                          <RotateCcw size={14} /> Reschedule
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalItems={filteredFollowUps.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      {/* Reschedule Modal */}
      {rescheduleModal.isOpen && (
        <Modal
          title={`Reschedule Task: ${rescheduleModal.item?.title}`}
          isOpen={true}
          onClose={() => setRescheduleModal({ isOpen: false, item: null, newDate: "", newTime: "10:00" })}
          size="md"
        >
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold small">New Date</label>
              <input
                type="date"
                className="form-control"
                value={rescheduleModal.newDate}
                onChange={(e) => setRescheduleModal({ ...rescheduleModal, newDate: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold small">New Time</label>
              <input
                type="time"
                className="form-control"
                value={rescheduleModal.newTime}
                onChange={(e) => setRescheduleModal({ ...rescheduleModal, newTime: e.target.value })}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 border-top pt-2">
            <button
              className="btn btn-crm-outline"
              onClick={() => setRescheduleModal({ isOpen: false, item: null, newDate: "", newTime: "10:00" })}
            >
              Cancel
            </button>
            <button className="btn btn-crm-primary" onClick={handleReschedule}>
              Confirm Reschedule
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FollowUpList;
