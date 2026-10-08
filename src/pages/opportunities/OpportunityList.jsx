import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useCrmData } from "../../context/CrmDataContext";
import Badge from "../../components/common/Badge";
import AddEditOpportunityModal from "../../components/modals/AddEditOpportunityModal";
import Modal from "../../components/common/Modal";
import {
  Briefcase,
  Plus,
  LayoutGrid,
  List,
  DollarSign,
  TrendingUp,
  MoveRight,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

const stages = [
  { name: "Prospecting", color: "#94a3b8" },
  { name: "Qualification", color: "#6366f1" },
  { name: "Proposal", color: "#3b82f6" },
  { name: "Negotiation", color: "#f59e0b" },
  { name: "Closed Won", color: "#10b981" },
  { name: "Closed Lost", color: "#ef4444" }
];

const OpportunityList = () => {
  const { onOpenGlobalModal } = useOutletContext();
  const { opportunities, updateOpportunityStage, metrics } = useCrmData();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("kanban"); // 'kanban' or 'list'
  const [editingOpp, setEditingOpp] = useState(null);

  // Won/Lost Reason Modal State
  const [reasonModal, setReasonModal] = useState({ isOpen: false, oppId: null, targetStage: null, reason: "" });

  const handleStageMove = async (oppId, newStage) => {
    if (newStage === "Closed Won" || newStage === "Closed Lost") {
      setReasonModal({ isOpen: true, oppId, targetStage: newStage, reason: "" });
    } else {
      await updateOpportunityStage(oppId, newStage);
    }
  };

  const handleConfirmReason = async () => {
    if (reasonModal.oppId && reasonModal.targetStage) {
      await updateOpportunityStage(reasonModal.oppId, reasonModal.targetStage, reasonModal.reason);
      setReasonModal({ isOpen: false, oppId: null, targetStage: null, reason: "" });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">Sales Pipeline & Deals</h4>
          <p className="text-muted small m-0">
            Pipeline Total Value: <strong className="text-primary">${metrics.pipelineValue?.toLocaleString()}</strong> • Won Deals: <strong className="text-success">${metrics.wonDealsValue?.toLocaleString()}</strong>
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          {/* View Toggle */}
          <div className="btn-group border rounded p-1 bg-white">
            <button
              className={`btn btn-sm py-1 ${viewMode === "kanban" ? "btn-primary text-white" : "btn-light"}`}
              onClick={() => setViewMode("kanban")}
            >
              <LayoutGrid size={15} /> Kanban Board
            </button>
            <button
              className={`btn btn-sm py-1 ${viewMode === "list" ? "btn-primary text-white" : "btn-light"}`}
              onClick={() => setViewMode("list")}
            >
              <List size={15} /> List View
            </button>
          </div>

          <button className="btn btn-crm-primary btn-sm" onClick={() => onOpenGlobalModal("add-opp")}>
            <Plus size={15} /> New Deal
          </button>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === "kanban" && (
        <div className="kanban-board">
          {stages.map((stageObj) => {
            const stageDeals = opportunities.filter((o) => o.stage === stageObj.name);
            const totalStageValue = stageDeals.reduce((sum, d) => sum + (d.dealValue || 0), 0);

            return (
              <div key={stageObj.name} className="kanban-column">
                <div
                  className="kanban-column-header bg-white"
                  style={{ borderBottomColor: stageObj.color }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <span className="rounded-circle" style={{ width: "8px", height: "8px", backgroundColor: stageObj.color }}></span>
                    <span className="text-dark fw-bold" style={{ fontSize: "0.85rem" }}>{stageObj.name}</span>
                    <span className="badge bg-light text-muted border">{stageDeals.length}</span>
                  </div>
                  <div className="fw-semibold text-muted" style={{ fontSize: "0.75rem" }}>
                    ${(totalStageValue / 1000).toFixed(0)}k
                  </div>
                </div>

                <div className="kanban-cards-container">
                  {stageDeals.map((deal) => (
                    <div key={deal.id} className="kanban-card">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="text-muted extra-small">{deal.customerName}</span>
                        <span className="badge bg-primary-subtle text-primary extra-small">{deal.winProbability}% win</span>
                      </div>

                      <div className="fw-bold text-dark mb-2" style={{ fontSize: "0.875rem" }}>
                        {deal.name}
                      </div>

                      <div className="fw-bold text-success fs-6 mb-2">
                        ${deal.dealValue?.toLocaleString()}
                      </div>

                      <div className="d-flex align-items-center justify-content-between extra-small text-muted border-top pt-2 mt-2">
                        <span>{deal.ownerName}</span>
                        <span>{deal.expectedCloseDate}</span>
                      </div>

                      {/* Quick Move Dropdown */}
                      <div className="dropdown mt-2 border-top pt-2">
                        <button
                          className="btn btn-sm btn-light border w-100 py-0 text-muted dropdown-toggle extra-small d-flex align-items-center justify-content-between"
                          type="button"
                          data-bs-toggle="dropdown"
                        >
                          <span>Move Stage</span>
                          <MoveRight size={12} />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                          {stages
                            .filter((s) => s.name !== deal.stage)
                            .map((s) => (
                              <li key={s.name}>
                                <button
                                  className="dropdown-item extra-small"
                                  onClick={() => handleStageMove(deal.id, s.name)}
                                >
                                  Move to {s.name}
                                </button>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === "list" && (
        <div className="crm-table-container">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Deal Name</th>
                <th>Customer Account</th>
                <th>Deal Value ($)</th>
                <th>Stage</th>
                <th>Win Prob</th>
                <th>Expected Close</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opp) => (
                <tr key={opp.id}>
                  <td className="fw-semibold text-dark">{opp.name}</td>
                  <td>{opp.customerName}</td>
                  <td className="fw-bold text-success">${opp.dealValue?.toLocaleString()}</td>
                  <td><Badge status={opp.stage} /></td>
                  <td>{opp.winProbability}%</td>
                  <td className="small text-muted">{opp.expectedCloseDate}</td>
                  <td className="small">{opp.ownerName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Won/Lost Reason Input Modal */}
      {reasonModal.isOpen && (
        <Modal
          title={`Record Reason for ${reasonModal.targetStage}`}
          isOpen={true}
          onClose={() => setReasonModal({ isOpen: false, oppId: null, targetStage: null, reason: "" })}
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
              placeholder="e.g. Superior API flexibility and dedicated support SLA OR Competitor legacy hardware lock-in..."
              value={reasonModal.reason}
              onChange={(e) => setReasonModal({ ...reasonModal, reason: e.target.value })}
            ></textarea>
          </div>

          <div className="d-flex justify-content-end gap-2 border-top pt-2">
            <button
              className="btn btn-crm-outline"
              onClick={() => setReasonModal({ isOpen: false, oppId: null, targetStage: null, reason: "" })}
            >
              Cancel
            </button>
            <button className="btn btn-crm-primary" onClick={handleConfirmReason}>
              Confirm Stage Move
            </button>
          </div>
        </Modal>
      )}

      {/* Add Opportunity Modal */}
      {editingOpp && (
        <AddEditOpportunityModal
          opportunity={editingOpp}
          isOpen={true}
          onClose={() => setEditingOpp(null)}
        />
      )}
    </div>
  );
};

export default OpportunityList;
