import React from "react";
import { Outlet } from "react-router-dom";
import { Layers } from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div className="w-100" style={{ maxWidth: "440px" }}>
        <div className="text-center mb-4">
          <div
            className="bg-primary text-white rounded-3 d-inline-flex align-items-center justify-content-center shadow mb-2"
            style={{ width: "48px", height: "48px" }}
          >
            <Layers size={28} />
          </div>
          <h3 className="fw-bold text-dark m-0" style={{ letterSpacing: "-0.02em" }}>
            Acxiom<span className="text-primary">CRM</span>
          </h3>
          <p className="text-muted small">Enterprise Customer Relationship Platform</p>
        </div>

        <div className="card shadow-sm border-0 rounded-3 p-4 bg-white">
          <Outlet />
        </div>

        <div className="text-center mt-4 text-muted extra-small">
          &copy; {new Date().getFullYear()} AcxiomCRM Platform. Production Frontend for Enterprise Organizations.
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
