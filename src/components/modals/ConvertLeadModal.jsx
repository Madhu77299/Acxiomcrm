import React, { useState } from "react";
import Modal from "../common/Modal";
import { useCrmData } from "../../context/CrmDataContext";
import { ArrowRight, Building, Briefcase, CheckCircle2 } from "lucide-react";

const ConvertLeadModal = ({ lead, isOpen, onClose }) => {
  const { convertLead } = useCrmData();

  const [opts, setOpts] = useState({
    customerName: lead?.company || "",
    tier: "Enterprise",
    website: "",
    createOpportunity: true,
    opportunityName: lead ? `${lead.company} - Platform License` : "",
    dealValue: lead?.estimatedValue || 75000,
    expectedCloseDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0]
  });

  const [submitting, setSubmitting] = useState(false);

  if (!lead) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await convertLead(lead.id, opts);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal title={`Convert Lead: ${lead.company}`} isOpen={isOpen} onClose={onClose} size="lg">
      <div className="mb-4 p-3 bg-primary-subtle border border-primary-subtle rounded-3">
        <div className="d-flex align-items-center gap-2 fw-semibold text-primary mb-1">
          <CheckCircle2 size={18} /> Lead Qualification Conversion Workflow
        </div>
        <p className="small text-secondary mb-0">
          Converting this lead will automatically transfer <strong>{lead.contactName}</strong> and create an active Customer Account in AcxiomCRM.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Customer Account Setup */}
        <div className="border rounded-3 p-3 mb-3 bg-white">
          <div className="d-flex align-items-center gap-2 fw-semibold text-dark mb-3">
            <Building size={18} className="text-primary" /> 1. Customer Account Details
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold small">Account / Company Name</label>
              <input
                type="text"
                className="form-control"
                required
                value={opts.customerName}
                onChange={(e) => setOpts({ ...opts, customerName: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold small">Account Tier</label>
              <select
                className="form-select"
                value={opts.tier}
                onChange={(e) => setOpts({ ...opts, tier: e.target.value })}
              >
                <option value="Enterprise">Enterprise</option>
                <option value="Mid-Market">Mid-Market</option>
                <option value="SMB">SMB</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 2: Opportunity Deal Setup */}
        <div className="border rounded-3 p-3 mb-4 bg-white">
          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="createOppCheck"
              checked={opts.createOpportunity}
              onChange={(e) => setOpts({ ...opts, createOpportunity: e.target.checked })}
            />
            <label className="form-check-label fw-semibold text-dark" htmlFor="createOppCheck">
              <Briefcase size={16} className="text-info me-1" /> Create an initial Sales Opportunity for this deal
            </label>
          </div>

          {opts.createOpportunity && (
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Opportunity Name *</label>
                <input
                  type="text"
                  className="form-control"
                  required={opts.createOpportunity}
                  value={opts.opportunityName}
                  onChange={(e) => setOpts({ ...opts, opportunityName: e.target.value })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Deal Value ($)</label>
                <input
                  type="number"
                  className="form-control"
                  required={opts.createOpportunity}
                  value={opts.dealValue}
                  onChange={(e) => setOpts({ ...opts, dealValue: Number(e.target.value) })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Target Close Date</label>
                <input
                  type="date"
                  className="form-control"
                  required={opts.createOpportunity}
                  value={opts.expectedCloseDate}
                  onChange={(e) => setOpts({ ...opts, expectedCloseDate: e.target.value })}
                />
              </div>
            </div>
          )}
        </div>

        <div className="d-flex justify-content-end gap-2 border-top pt-3">
          <button type="button" className="btn btn-crm-outline" onClick={onClose} disabled={submitting}>
            Cancel
          </button>
          <button type="submit" className="btn btn-crm-primary" disabled={submitting}>
            {submitting ? "Converting..." : "Complete Conversion"} <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ConvertLeadModal;
