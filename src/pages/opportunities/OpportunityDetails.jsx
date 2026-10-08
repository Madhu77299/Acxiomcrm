import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCrmData } from "../../context/CrmDataContext";
import Badge from "../../components/common/Badge";
import AddEditOpportunityModal from "../../components/modals/AddEditOpportunityModal";
import Modal from "../../components/common/Modal";
import {
  ArrowLeft,
  Briefcase,
  DollarSign,
  TrendingUp,
  Building,
  Calendar,
  Clock,
  Edit2,
  CheckCircle2,
  XCircle,
  MoveRight
} from "lucide-react";

const stages = ["Prospecting", "Qualification", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];

const OpportunityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { opportunities, updateOpportunityStage } = useCrmData();

  const opp = opportunities.find((o) => o.id === id);

  const [showEditModal, setShowEditModal] = useState(false);
  const [reasonModal, setReasonModal] = useState({ isOpen: false, targetStage: "", reason: "" });

  if (!opp) {
    return (
      <div className="text-center py-5">
        <h5>Deal record not found</h5>
        <Link to="/opportunities" className="btn btn-crm-outline btn-sm mt-2">
          <ArrowLeft size={16} /> Return to Opportunities
        </Link>
      </div>
    );
  }

  const handleStageClick = async (targetStage) => {
    if (targetStage === "Closed Won" || targetStage === "Closed Lost") {
      setReasonModal({ isOpen: true, targetStage, reason: "" });
    } else {
      await updateOpportunityStage(opp.id, targetStage);
    }
  };

  const handleConfirmReason = async () => {
    if (reasonModal.targetStage) {
      await updateOpportunityStage(opp.id, reasonModal.targetStage, reasonModal.reason);
      setReasonModal({ isOpen: false, targetStage: "", reason: "" });
    }
  };

  const weightedRevenue = Math.round(((opp.dealValue || 0) * (opp.winProbability || 0)) / 100);

  return (
    <div>
      {/* Top Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-sm btn-light border p-2" onClick={() => navigate("/opportunities")}>
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="d-flex align-items-center gap-2">
              <h4 className="fw-bold text-dark m-0">{opp.name}</h4>
              <Badge status={opp.stage} />
            </div>
            <div className="text-muted small">Deal ID: {opp.id} • Customer: {opp.customerName}</div>
          </div>
        </div>

        <button className="btn btn-crm-primary btn-sm" onClick={() => setShowEditModal(true)}>
          <Edit2 size={15} /> Edit Opportunity
        </button>
      </div>

      {/* Interactive Stage Stepper */}
      <div className="crm-card p-3 mb-4 bg-white">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span className="fw-bold text-dark small">Pipeline Stage Progress Stepper:</span>
          <span className="fw-semibold text-primary small">Active Stage: {opp.stage}</span>
        </div>
        <div className="d-flex gap-2">
          {stages.map((st) => (
            <button
              key={st}
              className={`btn btn-sm flex-grow-1 ${
                opp.stage === st
                  ? "btn-primary font-semibold shadow-sm"
                  : "btn-light border text-muted"
              }`}
              onClick={() => handleStageClick(st)}
            >
              {st} {opp.stage === st && "✓"}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Cards Row */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="crm-card p-3">
            <span className="text-muted extra-small text-uppercase fw-bold">Deal Contract Value</span>
            <h3 className="fw-bold text-success mt-1 mb-0">${opp.dealValue?.toLocaleString()}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="crm-card p-3">
            <span className="text-muted extra-small text-uppercase fw-bold">Win Probability</span>
            <h3 className="fw-bold text-primary mt-1 mb-0">{opp.winProbability}%</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="crm-card p-3">
            <span className="text-muted extra-small text-uppercase fw-bold">Weighted Expected Revenue</span>
            <h3 className="fw-bold text-dark mt-1 mb-0">${weightedRevenue?.toLocaleString()}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="crm-card p-3">
            <span className="text-muted extra-small text-uppercase fw-bold">Target Close Date</span>
            <h3 className="fw-bold text-dark mt-1 mb-0" style={{ fontSize: "1.2rem" }}>{opp.expectedCloseDate}</h3>
          </div>
        </div>
      </div>

      {/* Main Details & Stage History Grid */}
      <div className="row g-3">
        <div className="col-lg-5">
          <div className="crm-card p-4">
            <h6 className="fw-bold border-bottom pb-2 mb-3">Deal Metadata & Account Info</h6>

            <div className="d-flex flex-column gap-3">
              <div>
                <div className="text-muted extra-small">Customer Account</div>
                <Link to={`/customers/${opp.customerId}`} className="fw-semibold text-primary text-decoration-none">
                  {opp.customerName}
                </Link>
              </div>

              <div>
                <div className="text-muted extra-small">Primary Contact Person</div>
                <div className="fw-medium text-dark">{opp.contactPerson || "Robert Vance"}</div>
              </div>

              <div>
                <div className="text-muted extra-small">Deal Owner</div>
                <div className="fw-medium text-dark">{opp.ownerName}</div>
              </div>

              <div>
                <div className="text-muted extra-small">Lead Source</div>
                <div className="fw-medium text-dark">{opp.leadSource || "Website Inquiry"}</div>
              </div>

              {opp.wonLostReason && (
                <div>
                  <div className="text-muted extra-small">Won / Lost Note</div>
                  <div className="p-2 bg-light rounded text-secondary small mt-1">
                    "{opp.wonLostReason}"
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="crm-card p-4">
            <h6 className="fw-bold border-bottom pb-2 mb-3">Stage Progression Audit History</h6>

            <div className="py-2">
              {(!opp.stageHistory || opp.stageHistory.length === 0) ? (
                <div className="text-muted small">No stage transitions recorded yet.</div>
              ) : (
                opp.stageHistory.map((h, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-icon"></div>
                    <div>
                      <div className="fw-semibold text-dark">
                        Moved to Stage: <span className="badge bg-primary-subtle text-primary">{h.stage}</span>
                      </div>
                      <div className="text-muted extra-small">Transition Date: {h.date}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Won/Lost Modal */}
      {reasonModal.isOpen && (
        <Modal
          title={`Record Reason for ${reasonModal.targetStage}`}
          isOpen={true}
          onClose={() => setReasonModal({ isOpen: false, targetStage: "", reason: "" })}
          size="md"
        >
          <div className="mb-3">
            <label className="form-label fw-semibold small">
              Why was this deal marked as <strong>{reasonModal.targetStage}</strong>?
            </label>
            <textarea
              className="form-control"
              rows="3"
              required
              placeholder="e.g. Contract approved by board..."
              value={reasonModal.reason}
              onChange={(e) => setReasonModal({ ...reasonModal, reason: e.target.value })}
            ></textarea>
          </div>

          <div className="d-flex justify-content-end gap-2 border-top pt-2">
            <button
              className="btn btn-crm-outline"
              onClick={() => setReasonModal({ isOpen: false, targetStage: "", reason: "" })}
            >
              Cancel
            </button>
            <button className="btn btn-crm-primary" onClick={handleConfirmReason}>
              Confirm Stage Shift
            </button>
          </div>
        </Modal>
      )}

      {showEditModal && (
        <AddEditOpportunityModal
          opportunity={opp}
          isOpen={true}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default OpportunityDetails;
