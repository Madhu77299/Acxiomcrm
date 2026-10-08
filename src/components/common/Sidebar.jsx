import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Briefcase,
  CalendarCheck,
  Activity,
  ShieldAlert,
  BarChart3,
  FileText,
  Settings,
  Layers
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { hasPermission } = useAuth();

  return (
    <aside className="crm-sidebar">
      {/* CRM Logo Header */}
      <div className="d-flex align-items-center gap-2 px-3 py-3 border-bottom">
        <div
          className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center shadow-sm"
          style={{ width: "36px", height: "36px" }}
        >
          <Layers size={22} className="fw-bold" />
        </div>
        <div>
          <div className="fw-bold text-dark fs-6" style={{ letterSpacing: "-0.02em" }}>
            Acxiom<span className="text-primary">CRM</span>
          </div>
          <div className="text-muted" style={{ fontSize: "0.68rem", marginTop: "-3px" }}>
            Enterprise Sales Platform
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-grow-1 py-3 overflow-y-auto">
        <div className="crm-nav-section-title">Main Overview</div>
        <NavLink to="/dashboard" className={({ isActive }) => `crm-nav-link ${isActive ? "active" : ""}`}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <div className="crm-nav-section-title">Sales Operations</div>
        {hasPermission("customers", "view") && (
          <NavLink to="/customers" className={({ isActive }) => `crm-nav-link ${isActive ? "active" : ""}`}>
            <Users size={18} />
            <span>Customers</span>
          </NavLink>
        )}

        {hasPermission("leads", "view") && (
          <NavLink to="/leads" className={({ isActive }) => `crm-nav-link ${isActive ? "active" : ""}`}>
            <UserPlus size={18} />
            <span>Leads</span>
          </NavLink>
        )}

        {hasPermission("opportunities", "view") && (
          <NavLink to="/opportunities" className={({ isActive }) => `crm-nav-link ${isActive ? "active" : ""}`}>
            <Briefcase size={18} />
            <span>Opportunities</span>
          </NavLink>
        )}

        {hasPermission("followups", "view") && (
          <NavLink to="/followups" className={({ isActive }) => `crm-nav-link ${isActive ? "active" : ""}`}>
            <CalendarCheck size={18} />
            <span>Follow-Ups</span>
          </NavLink>
        )}

        <NavLink to="/activities" className={({ isActive }) => `crm-nav-link ${isActive ? "active" : ""}`}>
          <Activity size={18} />
          <span>Activities</span>
        </NavLink>

        <div className="crm-nav-section-title">Intelligence & Admin</div>
        {hasPermission("reports", "view") && (
          <NavLink to="/reports" className={({ isActive }) => `crm-nav-link ${isActive ? "active" : ""}`}>
            <BarChart3 size={18} />
            <span>Analytics & Reports</span>
          </NavLink>
        )}

        {hasPermission("users", "view") && (
          <NavLink to="/users" className={({ isActive }) => `crm-nav-link ${isActive ? "active" : ""}`}>
            <ShieldAlert size={18} />
            <span>Users & Roles</span>
          </NavLink>
        )}

        {hasPermission("auditLogs", "view") && (
          <NavLink to="/audit" className={({ isActive }) => `crm-nav-link ${isActive ? "active" : ""}`}>
            <FileText size={18} />
            <span>Audit Logs</span>
          </NavLink>
        )}

        <NavLink to="/settings" className={({ isActive }) => `crm-nav-link ${isActive ? "active" : ""}`}>
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
      </div>

      {/* Footer Backend Connector Notice */}
      <div className="p-3 m-2 border rounded-3 bg-light text-center">
        <div className="fw-semibold text-dark mb-1" style={{ fontSize: "0.75rem" }}>
          ASP.NET Core Ready
        </div>
        <div className="text-muted" style={{ fontSize: "0.7rem" }}>
          Service Layer Connected
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
