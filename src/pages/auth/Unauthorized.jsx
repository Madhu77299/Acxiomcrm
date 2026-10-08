import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ShieldAlert, ArrowLeft, Lock } from "lucide-react";

const Unauthorized = ({ module, action }) => {
  const { currentUser } = useAuth();

  return (
    <div className="text-center py-5 px-3">
      <div
        className="bg-danger-subtle text-danger rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
        style={{ width: "64px", height: "64px" }}
      >
        <Lock size={32} />
      </div>
      <h4 className="fw-bold text-dark mb-2">403 - Access Restricted</h4>
      <p className="text-muted small mb-4" style={{ maxWidth: "460px", margin: "0 auto" }}>
        Your current role (<strong>{currentUser?.role}</strong>) does not have permission to{" "}
        <span className="text-danger fw-semibold">{action}</span> the{" "}
        <span className="text-dark fw-semibold">{module}</span> module.
      </p>

      <div className="p-3 bg-light rounded-3 border d-inline-block text-start mb-4" style={{ maxWidth: "400px" }}>
        <div className="d-flex align-items-center gap-2 text-dark font-medium extra-small mb-1">
          <ShieldAlert size={14} className="text-warning" /> Need higher access privileges?
        </div>
        <div className="text-muted extra-small">
          Contact your CRM System Administrator (Ananya Sharma) or switch roles in the header preview menu.
        </div>
      </div>

      <div>
        <Link to="/dashboard" className="btn btn-crm-primary btn-sm">
          <ArrowLeft size={16} /> Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
