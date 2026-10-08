import React, { useState } from "react";
import { useCrmData } from "../../context/CrmDataContext";
import Pagination from "../../components/common/Pagination";
import { FileText, Search, Shield, Filter, Terminal } from "lucide-react";

const AuditLogs = () => {
  const { auditLogs } = useCrmData();

  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const filteredLogs = auditLogs.filter((log) => {
    const matchesAction = actionFilter === "All" || log.action === actionFilter;
    const matchesSearch =
      log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.performedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesAction && matchesSearch;
  });

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">System Audit Trail & Security Logs</h4>
          <p className="text-muted small m-0">Immutable records of system actions, stage modifications, user access, and API operations</p>
        </div>

        <span className="badge bg-primary-subtle text-primary border p-2 font-monospace">
          <Terminal size={14} className="me-1" /> AUDIT_LOGGING_ACTIVE
        </span>
      </div>

      <div className="filter-bar">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-muted">
                <Search size={16} />
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0 shadow-none"
                placeholder="Search by action, user name, IP address, or entity..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div className="col-md-6">
            <select
              className="form-select shadow-none"
              value={actionFilter}
              onChange={(e) => {
                setActionFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Audit Event Actions</option>
              <option value="LEAD_CONVERTED">LEAD_CONVERTED</option>
              <option value="OPPORTUNITY_STAGE_CHANGED">OPPORTUNITY_STAGE_CHANGED</option>
              <option value="USER_PERMISSIONS_UPDATED">USER_PERMISSIONS_UPDATED</option>
              <option value="USER_LOGIN">USER_LOGIN</option>
              <option value="CUSTOMER_CREATED">CUSTOMER_CREATED</option>
            </select>
          </div>
        </div>
      </div>

      <div className="crm-table-container">
        <table className="crm-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action Category</th>
              <th>Target Entity</th>
              <th>Performed By</th>
              <th>IP Address</th>
              <th>Details & Context</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-5 text-muted">
                  No audit entries found
                </td>
              </tr>
            ) : (
              paginatedLogs.map((log) => (
                <tr key={log.id}>
                  <td className="small text-muted font-monospace">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>

                  <td>
                    <span className="badge bg-light text-dark border font-monospace">
                      {log.action}
                    </span>
                  </td>

                  <td className="fw-semibold text-dark">{log.entity}</td>

                  <td>
                    <div className="fw-medium text-dark">{log.performedBy}</div>
                    <div className="text-muted extra-small">{log.userEmail}</div>
                  </td>

                  <td className="extra-small font-monospace text-muted">{log.ipAddress}</td>

                  <td className="small text-secondary" style={{ maxWidth: "300px" }}>
                    {log.details}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredLogs.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default AuditLogs;
