import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCrmData } from "../../context/CrmDataContext";
import {
  Search,
  Plus,
  Server,
  User,
  Shield,
  LogOut,
  ChevronDown,
  Building,
  UserPlus,
  Briefcase,
  Calendar
} from "lucide-react";
import ApiConfigModal from "./ApiConfigModal";

const Header = ({ onOpenGlobalModal }) => {
  const { currentUser, switchUserRole, logout, roles } = useAuth();
  const { customers, leads, opportunities } = useCrmData();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);

  const filteredCustomers = searchQuery.trim()
    ? customers.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.contactName.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const filteredLeads = searchQuery.trim()
    ? leads.filter(l => l.company.toLowerCase().includes(searchQuery.toLowerCase()) || l.contactName.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const filteredOpps = searchQuery.trim()
    ? opportunities.filter(o => o.name.toLowerCase().includes(searchQuery.toLowerCase()) || o.customerName.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <>
      <header className="crm-header">
        {/* Global Search Bar */}
        <div className="position-relative" style={{ width: "360px" }}>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0 text-muted pe-1">
              <Search size={16} />
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-2 bg-light shadow-none"
              placeholder="Search customers, leads, deals..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              style={{ fontSize: "0.875rem" }}
            />
          </div>

          {/* Quick Search Popup Results */}
          {showSearchResults && searchQuery.trim().length > 0 && (
            <div className="position-absolute start-0 end-0 bg-white border rounded-3 shadow-lg mt-1 p-2" style={{ zIndex: 1050, maxHeight: "350px", overflowY: "auto" }}>
              <div className="text-uppercase text-muted px-2 py-1" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                Customers ({filteredCustomers.length})
              </div>
              {filteredCustomers.slice(0, 3).map((c) => (
                <div key={c.id} className="p-2 hover-bg rounded d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold text-dark" style={{ fontSize: "0.85rem" }}>{c.name}</div>
                    <div className="text-muted" style={{ fontSize: "0.75rem" }}>{c.contactName} • {c.industry}</div>
                  </div>
                  <span className="badge bg-primary-subtle text-primary">{c.tier}</span>
                </div>
              ))}

              <div className="text-uppercase text-muted px-2 py-1 mt-2" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                Leads ({filteredLeads.length})
              </div>
              {filteredLeads.slice(0, 3).map((l) => (
                <div key={l.id} className="p-2 hover-bg rounded d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold text-dark" style={{ fontSize: "0.85rem" }}>{l.company}</div>
                    <div className="text-muted" style={{ fontSize: "0.75rem" }}>{l.contactName} • {l.status}</div>
                  </div>
                  <span className="badge bg-warning-subtle text-warning-emphasis">{l.rating}</span>
                </div>
              ))}

              <div className="text-uppercase text-muted px-2 py-1 mt-2" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                Opportunities ({filteredOpps.length})
              </div>
              {filteredOpps.slice(0, 3).map((o) => (
                <div key={o.id} className="p-2 hover-bg rounded d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold text-dark" style={{ fontSize: "0.85rem" }}>{o.name}</div>
                    <div className="text-muted" style={{ fontSize: "0.75rem" }}>${o.dealValue?.toLocaleString()} • {o.stage}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Header Actions */}
        <div className="d-flex align-items-center gap-3">
          {/* Quick Create Dropdown */}
          <div className="dropdown">
            <button className="btn btn-crm-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
              <Plus size={16} /> Quick Create
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-sm border">
              <li>
                <button className="dropdown-menu-item dropdown-item d-flex align-items-center gap-2" onClick={() => onOpenGlobalModal("add-customer")}>
                  <Building size={15} className="text-primary" /> Add Customer
                </button>
              </li>
              <li>
                <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => onOpenGlobalModal("add-lead")}>
                  <UserPlus size={15} className="text-success" /> Add Lead
                </button>
              </li>
              <li>
                <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => onOpenGlobalModal("add-opp")}>
                  <Briefcase size={15} className="text-info" /> Add Opportunity
                </button>
              </li>
              <li>
                <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => onOpenGlobalModal("schedule-flw")}>
                  <Calendar size={15} className="text-warning" /> Schedule Follow-Up
                </button>
              </li>
            </ul>
          </div>

          {/* ASP.NET API Backend Config Button */}
          <button
            className="btn btn-crm-outline btn-sm d-flex align-items-center gap-2"
            onClick={() => setShowApiModal(true)}
            title="Configure ASP.NET Core API Integration"
          >
            <Server size={15} className="text-primary" />
            <span className="d-none d-md-inline">API Integration</span>
          </button>

          {/* Role Switcher Demo Dropdown */}
          <div className="dropdown">
            <button className="btn btn-light btn-sm border dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown">
              <Shield size={14} className="text-muted" />
              <span className="fw-medium" style={{ fontSize: "0.8rem" }}>Role: {currentUser?.role}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-sm border">
              <li className="dropdown-header text-muted" style={{ fontSize: "0.75rem" }}>Switch Role (Interactive Preview):</li>
              {roles.map((r) => (
                <li key={r.id}>
                  <button className="dropdown-item small" onClick={() => switchUserRole(r.name)}>
                    {r.name} {currentUser?.role === r.name && "✓"}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* User Profile Avatar Menu */}
          <div className="dropdown">
            <div className="d-flex align-items-center gap-2 cursor-pointer dropdown-toggle" data-bs-toggle="dropdown" role="button">
              <img
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"}
                alt={currentUser?.name}
                className="rounded-circle border"
                style={{ width: "36px", height: "36px", objectFit: "cover" }}
              />
              <div className="d-none d-lg-block text-start" style={{ lineHeight: "1.2" }}>
                <div className="fw-semibold text-dark" style={{ fontSize: "0.85rem" }}>{currentUser?.name}</div>
                <div className="text-muted" style={{ fontSize: "0.725rem" }}>{currentUser?.department}</div>
              </div>
              <ChevronDown size={14} className="text-muted d-none d-lg-block" />
            </div>
            <ul className="dropdown-menu dropdown-menu-end shadow-sm border mt-2">
              <li className="px-3 py-2 border-bottom">
                <div className="fw-semibold">{currentUser?.name}</div>
                <div className="text-muted small">{currentUser?.email}</div>
              </li>
              <li>
                <a className="dropdown-item d-flex align-items-center gap-2 small py-2" href="#/settings">
                  <User size={15} /> My Profile & Preferences
                </a>
              </li>
              <li><hr className="dropdown-divider my-1" /></li>
              <li>
                <button className="dropdown-item d-flex align-items-center gap-2 small py-2 text-danger" onClick={logout}>
                  <LogOut size={15} /> Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* ASP.NET Core API Integration Config Modal */}
      {showApiModal && <ApiConfigModal onClose={() => setShowApiModal(false)} />}
    </>
  );
};

export default Header;
