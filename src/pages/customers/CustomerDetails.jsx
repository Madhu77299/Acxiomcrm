import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCrmData } from "../../context/CrmDataContext";
import Badge from "../../components/common/Badge";
import AddEditCustomerModal from "../../components/modals/AddEditCustomerModal";
import ScheduleFollowUpModal from "../../components/modals/ScheduleFollowUpModal";
import LogActivityModal from "../../components/modals/LogActivityModal";
import {
  Building,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Briefcase,
  Activity,
  Edit2,
  ArrowLeft,
  DollarSign,
  User,
  Plus
} from "lucide-react";

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers, opportunities, followUps, activities } = useCrmData();

  const customer = customers.find((c) => c.id === id);

  const [activeTab, setActiveTab] = useState("overview");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);

  if (!customer) {
    return (
      <div className="text-center py-5">
        <h5>Customer record not found</h5>
        <Link to="/customers" className="btn btn-crm-outline btn-sm mt-2">
          <ArrowLeft size={16} /> Return to Customers
        </Link>
      </div>
    );
  }

  const customerOpps = opportunities.filter((o) => o.customerId === customer.id || o.customerName === customer.name);
  const customerFollowUps = followUps.filter((f) => f.entityName === customer.name || f.entityId === customer.id);
  const customerActivities = activities.filter((a) => a.entityName === customer.name);

  return (
    <div>
      {/* Top Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-sm btn-light border p-2" onClick={() => navigate("/customers")}>
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="d-flex align-items-center gap-2">
              <h4 className="fw-bold text-dark m-0">{customer.name}</h4>
              <Badge status={customer.status} />
              <span className="badge bg-primary-subtle text-primary">{customer.tier} Tier</span>
            </div>
            <div className="text-muted small">Account ID: {customer.id} • Industry: {customer.industry}</div>
          </div>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-crm-outline btn-sm" onClick={() => setShowActivityModal(true)}>
            <Activity size={15} /> Log Activity
          </button>
          <button className="btn btn-crm-outline btn-sm" onClick={() => setShowFollowUpModal(true)}>
            <Calendar size={15} /> Schedule Task
          </button>
          <button className="btn btn-crm-primary btn-sm" onClick={() => setShowEditModal(true)}>
            <Edit2 size={15} /> Edit Account
          </button>
        </div>
      </div>

      {/* Overview Cards Row */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="crm-card p-3">
            <span className="text-muted extra-small text-uppercase fw-bold">Annual Revenue</span>
            <h4 className="fw-bold text-dark mt-1 mb-0">${customer.annualRevenue?.toLocaleString()}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="crm-card p-3">
            <span className="text-muted extra-small text-uppercase fw-bold">Active Opportunities</span>
            <h4 className="fw-bold text-primary mt-1 mb-0">{customerOpps.length} Deals</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="crm-card p-3">
            <span className="text-muted extra-small text-uppercase fw-bold">Account Owner</span>
            <h4 className="fw-bold text-dark mt-1 mb-0" style={{ fontSize: "1.1rem" }}>{customer.ownerName}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="crm-card p-3">
            <span className="text-muted extra-small text-uppercase fw-bold">Customer Since</span>
            <h4 className="fw-bold text-dark mt-1 mb-0" style={{ fontSize: "1.1rem" }}>
              {new Date(customer.createdAt).toLocaleDateString()}
            </h4>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Details Sidebar + Right Tabs */}
      <div className="row g-3">
        {/* Left Column Profile Card */}
        <div className="col-lg-4">
          <div className="crm-card p-4">
            <h6 className="fw-bold border-bottom pb-2 mb-3">Primary Contact & Details</h6>

            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-light p-2 rounded text-muted"><User size={18} /></div>
                <div>
                  <div className="text-muted extra-small">Contact Name</div>
                  <div className="fw-semibold text-dark">{customer.contactName}</div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="bg-light p-2 rounded text-muted"><Mail size={18} /></div>
                <div>
                  <div className="text-muted extra-small">Email Address</div>
                  <a href={`mailto:${customer.email}`} className="text-primary text-decoration-none small fw-medium">
                    {customer.email}
                  </a>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="bg-light p-2 rounded text-muted"><Phone size={18} /></div>
                <div>
                  <div className="text-muted extra-small">Phone Number</div>
                  <div className="text-dark small">{customer.phone || "Not provided"}</div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="bg-light p-2 rounded text-muted"><Globe size={18} /></div>
                <div>
                  <div className="text-muted extra-small">Corporate Website</div>
                  <a href={customer.website} target="_blank" rel="noreferrer" className="text-primary text-decoration-none small">
                    {customer.website || "https://company.com"}
                  </a>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="bg-light p-2 rounded text-muted"><MapPin size={18} /></div>
                <div>
                  <div className="text-muted extra-small">HQ Address</div>
                  <div className="text-dark small">{customer.address || "100 Tech Way, San Francisco"}</div>
                </div>
              </div>
            </div>

            <h6 className="fw-bold border-bottom pb-2 mt-4 mb-3">Account Tags</h6>
            <div className="d-flex flex-wrap gap-1">
              {customer.tags?.map((tag, i) => (
                <span key={i} className="badge bg-light text-secondary border">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column Interactive Tabs */}
        <div className="col-lg-8">
          <div className="crm-card">
            <div className="crm-card-header p-0 px-3">
              <div className="crm-nav-tabs">
                <span
                  className={`crm-tab-item ${activeTab === "overview" ? "active" : ""}`}
                  onClick={() => setActiveTab("overview")}
                >
                  Associated Deals ({customerOpps.length})
                </span>
                <span
                  className={`crm-tab-item ${activeTab === "timeline" ? "active" : ""}`}
                  onClick={() => setActiveTab("timeline")}
                >
                  Activity Timeline ({customerActivities.length})
                </span>
                <span
                  className={`crm-tab-item ${activeTab === "tasks" ? "active" : ""}`}
                  onClick={() => setActiveTab("tasks")}
                >
                  Follow-Up Tasks ({customerFollowUps.length})
                </span>
              </div>
            </div>

            <div className="crm-card-body">
              {activeTab === "overview" && (
                <div>
                  {customerOpps.length === 0 ? (
                    <div className="text-center py-4 text-muted small">No active deals linked to this customer account.</div>
                  ) : (
                    <div className="crm-table-container">
                      <table className="crm-table">
                        <thead>
                          <tr>
                            <th>Deal Title</th>
                            <th>Value ($)</th>
                            <th>Stage</th>
                            <th>Probability</th>
                            <th>Target Close</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customerOpps.map((opp) => (
                            <tr key={opp.id}>
                              <td className="fw-semibold text-dark">{opp.name}</td>
                              <td className="fw-bold text-success">${opp.dealValue?.toLocaleString()}</td>
                              <td><Badge status={opp.stage} /></td>
                              <td>{opp.winProbability}%</td>
                              <td className="small text-muted">{opp.expectedCloseDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "timeline" && (
                <div className="py-2">
                  {customerActivities.length === 0 ? (
                    <div className="text-center py-4 text-muted small">No recorded activity history yet.</div>
                  ) : (
                    customerActivities.map((act) => (
                      <div key={act.id} className="timeline-item">
                        <div className="timeline-icon"></div>
                        <div>
                          <div className="fw-semibold text-dark" style={{ fontSize: "0.875rem" }}>
                            {act.title} <span className="badge bg-light text-dark ms-2">{act.type}</span>
                          </div>
                          <div className="text-muted extra-small">
                            Performed by {act.performedByName} on {new Date(act.dateTime).toLocaleString()}
                          </div>
                          <div className="p-2 bg-light rounded mt-2 text-secondary small">
                            "{act.notes}"
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "tasks" && (
                <div>
                  {customerFollowUps.length === 0 ? (
                    <div className="text-center py-4 text-muted small">No scheduled follow-up tasks for this account.</div>
                  ) : (
                    <div className="list-group list-group-flush">
                      {customerFollowUps.map((flw) => (
                        <div key={flw.id} className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
                          <div>
                            <div className="fw-semibold text-dark">{flw.title}</div>
                            <div className="text-muted extra-small">
                              Due: {flw.dueDate} at {flw.dueTime} • Assigned: {flw.assignedToName}
                            </div>
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
      {showEditModal && (
        <AddEditCustomerModal
          customer={customer}
          isOpen={true}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showFollowUpModal && (
        <ScheduleFollowUpModal
          initialEntity={{ id: customer.id, type: "Customer" }}
          isOpen={true}
          onClose={() => setShowFollowUpModal(false)}
        />
      )}

      {showActivityModal && (
        <LogActivityModal isOpen={true} onClose={() => setShowActivityModal(false)} />
      )}
    </div>
  );
};

export default CustomerDetails;
