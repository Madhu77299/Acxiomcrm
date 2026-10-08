import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCrmData } from "../../context/CrmDataContext";
import Badge from "../../components/common/Badge";
import ConvertLeadModal from "../../components/modals/ConvertLeadModal";
import AddEditLeadModal from "../../components/modals/AddEditLeadModal";
import ScheduleFollowUpModal from "../../components/modals/ScheduleFollowUpModal";
import LogActivityModal from "../../components/modals/LogActivityModal";
import {
  ArrowLeft,
  Building,
  User,
  Mail,
  Phone,
  Flame,
  Star,
  ArrowRightCircle,
  Edit2,
  Calendar,
  Activity,
  Sliders,
  CheckCircle2
} from "lucide-react";

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { leads, users, updateLead, activities, followUps } = useCrmData();

  const lead = leads.find((l) => l.id === id);

  const [showConvertModal, setShowConvertModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  if (!lead) {
    return (
      <div className="text-center py-5">
        <h5>Lead record not found</h5>
        <Link to="/leads" className="btn btn-crm-outline btn-sm mt-2">
          <ArrowLeft size={16} /> Return to Leads
        </Link>
      </div>
    );
  }

  // Dynamic Lead Score Adjuster
  const handleAdjustScore = async (delta) => {
    const newScore = Math.min(100, Math.max(0, (lead.score || 50) + delta));
    let newRating = "Warm";
    if (newScore >= 80) newRating = "Hot";
    else if (newScore < 50) newRating = "Cold";

    await updateLead(lead.id, { score: newScore, rating: newRating });
  };

  const handleStatusChange = async (newStatus) => {
    await updateLead(lead.id, { status: newStatus });
  };

  const handleOwnerChange = async (newOwnerId) => {
    const owner = users.find((u) => u.id === newOwnerId);
    await updateLead(lead.id, { ownerId: newOwnerId, ownerName: owner ? owner.name : "Sales Rep" });
  };

  const leadActivities = activities.filter((a) => a.entityName === lead.company);
  const leadFollowUps = followUps.filter((f) => f.entityId === lead.id || f.entityName === lead.company);

  return (
    <div>
      {/* Top Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-sm btn-light border p-2" onClick={() => navigate("/leads")}>
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="d-flex align-items-center gap-2">
              <h4 className="fw-bold text-dark m-0">{lead.company}</h4>
              <Badge status={lead.rating} />
              <Badge status={lead.status} />
            </div>
            <div className="text-muted small">Lead ID: {lead.id} • Source: {lead.source} • Industry: {lead.industry || "General"}</div>
          </div>
        </div>

        <div className="d-flex gap-2">
          {lead.status !== "Converted" ? (
            <button className="btn btn-crm-primary btn-sm" onClick={() => setShowConvertModal(true)}>
              <ArrowRightCircle size={15} /> Convert Lead
            </button>
          ) : (
            <span className="badge bg-success-subtle text-success p-2">Converted Account</span>
          )}

          <button className="btn btn-crm-outline btn-sm" onClick={() => setShowActivityModal(true)}>
            <Activity size={15} /> Log Activity
          </button>

          <button className="btn btn-crm-outline btn-sm" onClick={() => setShowEditModal(true)}>
            <Edit2 size={15} /> Edit Lead
          </button>
        </div>
      </div>

      {/* Dynamic Lead Stage Progression Bar */}
      <div className="crm-card p-3 mb-4 bg-white">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span className="fw-bold text-dark small">Lead Qualification Workflow Stage:</span>
          <span className="fw-semibold text-primary small">Current: {lead.status}</span>
        </div>
        <div className="d-flex gap-2">
          {["New", "Contacted", "Qualified", "Unqualified"].map((st) => (
            <button
              key={st}
              className={`btn btn-sm flex-grow-1 ${
                lead.status === st
                  ? "btn-primary font-semibold"
                  : "btn-light border text-muted"
              }`}
              onClick={() => handleStatusChange(st)}
            >
              {st} {lead.status === st && "✓"}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-3">
        {/* Left Profile & Score Booster Card */}
        <div className="col-lg-4">
          {/* Dynamic Lead Score Widget */}
          <div className="crm-card p-4 mb-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="fw-bold text-dark small d-flex align-items-center gap-1">
                <Flame size={16} className="text-danger" /> Dynamic Lead Score
              </span>
              <span className="badge bg-danger-subtle text-danger fw-bold">{lead.rating}</span>
            </div>

            <div className="d-flex align-items-center justify-content-between mb-2">
              <h2 className="fw-bold text-dark m-0">{lead.score}<span className="fs-6 text-muted">/100</span></h2>
              <div className="d-flex gap-1">
                <button
                  className="btn btn-sm btn-outline-success py-0 px-2 fw-bold"
                  title="Increase Engagement Score (+5)"
                  onClick={() => handleAdjustScore(5)}
                >
                  +5
                </button>
                <button
                  className="btn btn-sm btn-outline-danger py-0 px-2 fw-bold"
                  title="Decrease Engagement Score (-5)"
                  onClick={() => handleAdjustScore(-5)}
                >
                  -5
                </button>
              </div>
            </div>

            <div className="progress mb-2" style={{ height: "8px" }}>
              <div
                className={`progress-bar ${
                  lead.score >= 80 ? "bg-danger" : lead.score >= 50 ? "bg-warning" : "bg-secondary"
                }`}
                style={{ width: `${lead.score}%` }}
              ></div>
            </div>
            <div className="extra-small text-muted">Click +5 / -5 to test dynamic score recalibration and automatic rating shift!</div>
          </div>

          {/* Lead Contact Info Card */}
          <div className="crm-card p-4">
            <h6 className="fw-bold border-bottom pb-2 mb-3">Contact Information</h6>
            <div className="d-flex flex-column gap-3">
              <div>
                <div className="text-muted extra-small">Contact Person</div>
                <div className="fw-semibold text-dark">{lead.contactName} ({lead.title || "Contact"})</div>
              </div>

              <div>
                <div className="text-muted extra-small">Email Address</div>
                <a href={`mailto:${lead.email}`} className="text-primary small text-decoration-none fw-medium">
                  {lead.email}
                </a>
              </div>

              <div>
                <div className="text-muted extra-small">Phone Number</div>
                <div className="text-dark small">{lead.phone || "Not provided"}</div>
              </div>

              <div>
                <div className="text-muted extra-small">Estimated Opportunity Value</div>
                <div className="fw-bold text-success fs-6">${lead.estimatedValue?.toLocaleString()}</div>
              </div>

              <div>
                <div className="text-muted extra-small">Assigned Sales Owner</div>
                <select
                  className="form-select form-select-sm mt-1 shadow-none"
                  value={lead.ownerId}
                  onChange={(e) => handleOwnerChange(e.target.value)}
                >
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Tabs */}
        <div className="col-lg-8">
          <div className="crm-card">
            <div className="crm-card-header p-0 px-3">
              <div className="crm-nav-tabs">
                <span
                  className={`crm-tab-item ${activeTab === "overview" ? "active" : ""}`}
                  onClick={() => setActiveTab("overview")}
                >
                  Discovery Notes & Context
                </span>
                <span
                  className={`crm-tab-item ${activeTab === "activities" ? "active" : ""}`}
                  onClick={() => setActiveTab("activities")}
                >
                  Activity History ({leadActivities.length})
                </span>
                <span
                  className={`crm-tab-item ${activeTab === "tasks" ? "active" : ""}`}
                  onClick={() => setActiveTab("tasks")}
                >
                  Tasks ({leadFollowUps.length})
                </span>
              </div>
            </div>

            <div className="crm-card-body">
              {activeTab === "overview" && (
                <div>
                  <h6 className="fw-semibold text-dark mb-2">Initial Lead Inquiry Context</h6>
                  <p className="p-3 bg-light rounded-3 text-secondary small" style={{ lineHeight: "1.6" }}>
                    {lead.notes || "No additional discovery notes recorded for this lead."}
                  </p>
                </div>
              )}

              {activeTab === "activities" && (
                <div>
                  {leadActivities.length === 0 ? (
                    <div className="text-center py-4 text-muted small">No logged activity recorded yet.</div>
                  ) : (
                    leadActivities.map((act) => (
                      <div key={act.id} className="timeline-item">
                        <div className="timeline-icon"></div>
                        <div>
                          <div className="fw-semibold text-dark">{act.title}</div>
                          <div className="text-muted extra-small">By {act.performedByName} on {new Date(act.dateTime).toLocaleString()}</div>
                          <div className="p-2 bg-light rounded mt-1 text-secondary small">"{act.notes}"</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "tasks" && (
                <div>
                  {leadFollowUps.length === 0 ? (
                    <div className="text-center py-4 text-muted small">No pending tasks for this lead.</div>
                  ) : (
                    <div className="list-group list-group-flush">
                      {leadFollowUps.map((flw) => (
                        <div key={flw.id} className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
                          <div>
                            <div className="fw-semibold text-dark">{flw.title}</div>
                            <div className="text-muted extra-small">Due: {flw.dueDate} at {flw.dueTime}</div>
                          </div>
                          <Badge status={flw.status} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showConvertModal && (
        <ConvertLeadModal
          lead={lead}
          isOpen={true}
          onClose={() => setShowConvertModal(false)}
        />
      )}

      {showEditModal && (
        <AddEditLeadModal
          lead={lead}
          isOpen={true}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showActivityModal && (
        <LogActivityModal isOpen={true} onClose={() => setShowActivityModal(false)} />
      )}
    </div>
  );
};

export default LeadDetails;
