import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { User, Mail, Lock, Shield, ArrowRight } from "lucide-react";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Sales Rep");

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email, role);
    navigate("/dashboard");
  };

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold text-dark">Create Sales Account</h4>
        <p className="text-muted small">Join your enterprise workspace on AcxiomCRM</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold small">Full Name *</label>
          <div className="input-group">
            <span className="input-group-text bg-light text-muted">
              <User size={16} />
            </span>
            <input
              type="text"
              className="form-control"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold small">Corporate Email *</label>
          <div className="input-group">
            <span className="input-group-text bg-light text-muted">
              <Mail size={16} />
            </span>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold small">Initial CRM Role</label>
          <div className="input-group">
            <span className="input-group-text bg-light text-muted">
              <Shield size={16} />
            </span>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Sales Rep">Sales Rep</option>
              <option value="Sales Manager">Sales Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold small">Password *</label>
          <div className="input-group">
            <span className="input-group-text bg-light text-muted">
              <Lock size={16} />
            </span>
            <input
              type="password"
              className="form-control"
              required
              placeholder="••••••••"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-crm-primary w-100 justify-content-center mb-3">
          Create Account <ArrowRight size={16} />
        </button>
      </form>

      <div className="text-center small">
        Already registered?{" "}
        <Link to="/login" className="fw-semibold text-primary text-decoration-none">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;
