import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCrmData } from "../../context/CrmDataContext";
import { Shield, ArrowLeft, Save, Check, X } from "lucide-react";

const RolePermissions = () => {
  const { roles, updateRolePermissions } = useCrmData();
  const [selectedRole, setSelectedRole] = useState(roles[0]?.id || "role_admin");
  const [currentPermissions, setCurrentPermissions] = useState(roles[0]?.permissions || {});

  const targetRoleObj = roles.find((r) => r.id === selectedRole);

  const handleSelectRole = (r) => {
    setSelectedRole(r.id);
    setCurrentPermissions(r.permissions || {});
  };

  const togglePerm = (moduleKey, actionKey) => {
    setCurrentPermissions((prev) => ({
      ...prev,
      [moduleKey]: {
        ...prev[moduleKey],
        [actionKey]: !prev[moduleKey]?.[actionKey]
      }
    }));
  };

  const handleSave = async () => {
    await updateRolePermissions(selectedRole, currentPermissions);
  };

  const modulesList = [
    { key: "customers", label: "Customers", actions: ["view", "create", "edit", "delete"] },
    { key: "leads", label: "Leads", actions: ["view", "create", "edit", "delete", "assign", "convert"] },
    { key: "opportunities", label: "Opportunities & Deals", actions: ["view", "create", "edit", "delete"] },
    { key: "followups", label: "Follow-Ups & Tasks", actions: ["view", "create", "edit", "delete"] },
    { key: "reports", label: "Analytics & Reports", actions: ["view", "export"] },
    { key: "users", label: "Users Management", actions: ["view", "create", "edit", "delete", "roles"] },
    { key: "auditLogs", label: "System Audit Logs", actions: ["view"] }
  ];

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <Link to="/users" className="btn btn-sm btn-light border p-2">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h4 className="fw-bold text-dark m-0">Role-Based Access Control (RBAC)</h4>
            <p className="text-muted small m-0">Configure granular module permissions and system capabilities per role</p>
          </div>
        </div>

        <button className="btn btn-crm-primary btn-sm" onClick={handleSave}>
          <Save size={15} /> Save Matrix Permissions
        </button>
      </div>

      <div className="row g-3">
        {/* Left Column: Role Selector Cards */}
        <div className="col-lg-4">
          <div className="crm-card p-3">
            <h6 className="fw-bold mb-3">Select System Role</h6>
            <div className="d-flex flex-column gap-2">
              {roles.map((r) => (
                <div
                  key={r.id}
                  className={`p-3 border rounded-3 cursor-pointer transition ${
                    selectedRole === r.id ? "bg-primary-subtle border-primary text-primary" : "bg-white text-dark hover-bg"
                  }`}
                  onClick={() => handleSelectRole(r)}
                >
                  <div className="fw-bold" style={{ fontSize: "0.95rem" }}>{r.name}</div>
                  <div className="text-muted extra-small mt-1">{r.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Permission Matrix Table */}
        <div className="col-lg-8">
          <div className="crm-card">
            <div className="crm-card-header">
              <div className="d-flex align-items-center gap-2">
                <Shield size={18} className="text-primary" />
                <h6 className="fw-bold m-0">Permissions Matrix: {targetRoleObj?.name}</h6>
              </div>
            </div>

            <div className="crm-card-body p-0">
              <div className="crm-table-container border-0">
                <table className="crm-table">
                  <thead>
                    <tr>
                      <th>Module / Feature</th>
                      <th>View</th>
                      <th>Create</th>
                      <th>Edit</th>
                      <th>Delete</th>
                      <th>Special (Assign/Convert/Export)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modulesList.map((m) => {
                      const permObj = currentPermissions[m.key] || {};
                      return (
                        <tr key={m.key}>
                          <td className="fw-semibold text-dark">{m.label}</td>

                          {/* View */}
                          <td>
                            <input
                              type="checkbox"
                              className="form-check-input cursor-pointer"
                              checked={!!permObj.view}
                              onChange={() => togglePerm(m.key, "view")}
                            />
                          </td>

                          {/* Create */}
                          <td>
                            {m.actions.includes("create") ? (
                              <input
                                type="checkbox"
                                className="form-check-input cursor-pointer"
                                checked={!!permObj.create}
                                onChange={() => togglePerm(m.key, "create")}
                              />
                            ) : <span className="text-muted small">-</span>}
                          </td>

                          {/* Edit */}
                          <td>
                            {m.actions.includes("edit") ? (
                              <input
                                type="checkbox"
                                className="form-check-input cursor-pointer"
                                checked={!!permObj.edit}
                                onChange={() => togglePerm(m.key, "edit")}
                              />
                            ) : <span className="text-muted small">-</span>}
                          </td>

                          {/* Delete */}
                          <td>
                            {m.actions.includes("delete") ? (
                              <input
                                type="checkbox"
                                className="form-check-input cursor-pointer"
                                checked={!!permObj.delete}
                                onChange={() => togglePerm(m.key, "delete")}
                              />
                            ) : <span className="text-muted small">-</span>}
                          </td>

                          {/* Special Actions */}
                          <td>
                            <div className="d-flex gap-2">
                              {m.actions.includes("assign") && (
                                <label className="extra-small d-flex align-items-center gap-1 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="form-check-input cursor-pointer"
                                    checked={!!permObj.assign}
                                    onChange={() => togglePerm(m.key, "assign")}
                                  /> Assign
                                </label>
                              )}
                              {m.actions.includes("convert") && (
                                <label className="extra-small d-flex align-items-center gap-1 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="form-check-input cursor-pointer"
                                    checked={!!permObj.convert}
                                    onChange={() => togglePerm(m.key, "convert")}
                                  /> Convert
                                </label>
                              )}
                              {m.actions.includes("export") && (
                                <label className="extra-small d-flex align-items-center gap-1 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="form-check-input cursor-pointer"
                                    checked={!!permObj.export}
                                    onChange={() => togglePerm(m.key, "export")}
                                  /> Export
                                </label>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePermissions;
