import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold text-dark">Reset Password</h4>
        <p className="text-muted small">Enter your email to receive password reset instructions</p>
      </div>

      {submitted ? (
        <div className="text-center py-3">
          <CheckCircle2 size={48} className="text-success mb-3" />
          <h6 className="fw-bold text-dark">Reset Link Dispatched</h6>
          <p className="text-muted small mb-4">
            If an account exists for <strong>{email}</strong>, you will receive reset instructions shortly.
          </p>
          <Link to="/login" className="btn btn-crm-outline w-100 justify-content-center">
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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

          <button type="submit" className="btn btn-crm-primary w-100 justify-content-center mb-3">
            Send Reset Instructions
          </button>

          <div className="text-center">
            <Link to="/login" className="small text-muted text-decoration-none d-inline-flex align-items-center gap-1">
              <ArrowLeft size={14} /> Back to Sign In
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
