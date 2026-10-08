import React from "react";

const statusStyles = {
  // General / Customer / Lead
  Active: "crm-badge-success",
  Converted: "crm-badge-success",
  "Closed Won": "crm-badge-success",
  Completed: "crm-badge-success",
  Hot: "crm-badge-danger",
  High: "crm-badge-danger",
  Overdue: "crm-badge-danger",
  "Closed Lost": "crm-badge-danger",
  
  Proposal: "crm-badge-info",
  Negotiation: "crm-badge-info",
  Qualification: "crm-badge-info",
  Contacted: "crm-badge-info",
  Upcoming: "crm-badge-info",
  Warm: "crm-badge-warning",
  Medium: "crm-badge-warning",
  Pending: "crm-badge-warning",
  
  Inactive: "crm-badge-secondary",
  Unqualified: "crm-badge-secondary",
  New: "crm-badge-info",
  Cold: "crm-badge-secondary",
  Low: "crm-badge-secondary",
  Missed: "crm-badge-secondary"
};

const Badge = ({ status, text }) => {
  const badgeClass = statusStyles[status] || "crm-badge-secondary";
  return (
    <span className={`crm-badge ${badgeClass}`}>
      <span className="rounded-circle d-inline-block" style={{ width: "6px", height: "6px", backgroundColor: "currentColor" }}></span>
      {text || status}
    </span>
  );
};

export default Badge;
