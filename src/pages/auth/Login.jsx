import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck, Shield, Briefcase, Headphones } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("ananya.sharma@acxiomcrm.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  const roleAccounts = [
    {
      role: "Admin",
      name: "Ananya Sharma",
      email: "ananya.sharma@acxiomcrm.com",
      badge: "bg-danger-subtle text-danger",
      icon: ShieldCheck,
      desc: "Full System & Security Access"
    },
    {
      role: "Sales Manager",
      name: "Vikramaditya Rao",
      email: "vikramaditya.rao@acxiomcrm.com",
      badge: "bg-primary-subtle text-primary",
      icon: Briefcase,
      desc: "Pipeline & Team Reports"
    },
    {
      role: "Sales Rep",
      name: "Priya Sundaram",
      email: "priya.sundaram@acxiomcrm.com",
      badge: "bg-success-subtle text-success",
      icon: UserCheck,
      desc: "Leads & Deals Management"
    },
    {
      role: "Support Specialist",
      name: "Neha Kapoor",
      email: "neha.kapoor@acxiomcrm.com",
      badge: "bg-info-subtle text-info",
      icon: Headphones,
      desc: "Client View & Activity Logging"
    }
  ];

  const handleQuickRoleLogin = (accountEmail) => {
    setEmail(accountEmail);
    const res = login(accountEmail, "password123");
    if (res.success) {
      navigate("/dashboard");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const res = login(email, password);
    if (res.success) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <div className="mb-4 text-center">
        <h4 className="fw-bold text-dark">Sign In to AcxiomCRM</h4>
        <p className="text-muted small">Select a role-based demo account or enter credentials</p>
      </div>

      {error && <div className="alert alert-danger small p-2 mb-3">{error}</div>}

      {/* Role-Based Quick Login Selectors */}
      <div className="mb-4">
        <label className="form-label fw-bold extra-small text-uppercase text-muted mb-2">
          Interactive Role Authentication Quick Selectors:
        </label>
        <div className="d-flex flex-column gap-2">
          {roleAccounts.map((acc) => {
            const IconComponent = acc.icon;
            const isSelected = email.toLowerCase() === acc.email.toLowerCase();

            return (
              <div
                key={acc.role}
                className={`p-2 border rounded-3 cursor-pointer d-flex align-items-center justify-content-between transition ${
                  isSelected ? "bg-primary-subtle border-primary" : "bg-white hover-bg"
                }`}
                onClick={() => handleQuickRoleLogin(acc.email)}
              >
                <div className="d-flex align-items-center gap-2">
                  <div className={`p-2 rounded-2 ${acc.badge}`}>
                    <IconComponent size={16} />
                  </div>
                  <div>
                    <div className="fw-semibold text-dark" style={{ fontSize: "0.85rem" }}>
                      {acc.name} <span className={`badge ${acc.badge} ms-1`}>{acc.role}</span>
                    </div>
                    <div className="text-muted extra-small">{acc.desc}</div>
                  </div>
                </div>
                <button
                  type="button"
                  className={`btn btn-xs ${isSelected ? "btn-primary" : "btn-outline-secondary"}`}
                  style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}
                >
                  {isSelected ? "Active" : "Login as " + acc.role}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="position-relative my-4 text-center">
        <hr className="text-muted" />
        <span className="position-absolute top-50 start-50 translate-middle bg-white px-2 extra-small text-muted">
          OR ENTER CUSTOM EMAIL
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold small">Corporate Email</label>
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
          <div className="d-flex justify-content-between align-items-center mb-1">
            <label className="form-label fw-semibold small m-0">Password</label>
            <Link to="/forgot-password" className="small text-primary text-decoration-none">
              Forgot password?
            </Link>
          </div>
          <div className="input-group">
            <span className="input-group-text bg-light text-muted">
              <Lock size={16} />
            </span>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-crm-primary w-100 justify-content-center mb-3">
          Sign In to Portal <ArrowRight size={16} />
        </button>
      </form>

      <div className="text-center mt-3 small">
        Don't have an account?{" "}
        <Link to="/register" className="fw-semibold text-primary text-decoration-none">
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
