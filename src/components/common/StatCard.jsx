import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({ title, value, change, isIncrease = true, icon: Icon, iconBgClass = "bg-primary-subtle text-primary" }) => {
  return (
    <div className="crm-card stat-card">
      <div>
        <span className="text-muted text-uppercase fw-semibold" style={{ fontSize: "0.725rem", letterSpacing: "0.04em" }}>
          {title}
        </span>
        <h3 className="fw-bold text-dark mt-1 mb-1" style={{ fontSize: "1.5rem" }}>
          {value}
        </h3>
        {change && (
          <div className="d-flex align-items-center gap-1" style={{ fontSize: "0.75rem" }}>
            {isIncrease ? (
              <span className="text-success fw-semibold d-inline-flex align-items-center">
                <TrendingUp size={14} className="me-1" /> {change}
              </span>
            ) : (
              <span className="text-danger fw-semibold d-inline-flex align-items-center">
                <TrendingDown size={14} className="me-1" /> {change}
              </span>
            )}
            <span className="text-muted">vs last month</span>
          </div>
        )}
      </div>

      {Icon && (
        <div className={`stat-icon-wrapper ${iconBgClass}`}>
          <Icon size={22} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
