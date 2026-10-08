import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useCrmData } from "../../context/CrmDataContext";
import Badge from "../../components/common/Badge";
import Pagination from "../../components/common/Pagination";
import { Activity, Plus, Phone, Mail, Users, CheckSquare, Search } from "lucide-react";

const ActivityList = () => {
  const { onOpenGlobalModal } = useOutletContext();
  const { activities } = useCrmData();

  const [activeType, setActiveType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredActivities = activities.filter((act) => {
    const matchesType = activeType === "All" || act.type === activeType;
    const matchesSearch =
      act.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.performedByName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const typeIcons = {
    Call: <Phone size={16} className="text-primary" />,
    Meeting: <Users size={16} className="text-warning" />,
    Email: <Mail size={16} className="text-info" />,
    Task: <CheckSquare size={16} className="text-success" />
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">Interaction Activity History</h4>
          <p className="text-muted small m-0">Log phone calls, customer emails, product demos, and client meetings</p>
        </div>

        <button className="btn btn-crm-primary btn-sm" onClick={() => onOpenGlobalModal("log-activity")}>
          <Plus size={15} /> Log Activity
        </button>
      </div>

      <div className="crm-card mb-4">
        <div className="crm-card-header p-0 px-3 d-flex justify-content-between align-items-center">
          <div className="crm-nav-tabs">
            {["All", "Call", "Meeting", "Email", "Task"].map((type) => (
              <span
                key={type}
                className={`crm-tab-item ${activeType === type ? "active" : ""}`}
                onClick={() => {
                  setActiveType(type);
                  setCurrentPage(1);
                }}
              >
                {type} {type !== "All" && "s"} (
                {type === "All"
                  ? activities.length
                  : activities.filter((a) => a.type === type).length}
                )
              </span>
            ))}
          </div>

          <div style={{ width: "260px" }} className="py-2">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-white text-muted"><Search size={14} /></span>
              <input
                type="text"
                className="form-control"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="crm-card-body p-3">
          {paginatedActivities.length === 0 ? (
            <div className="text-center py-5 text-muted">No activity records found.</div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {paginatedActivities.map((act) => (
                <div key={act.id} className="p-3 border rounded-3 bg-white shadow-sm">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <div className="p-2 bg-light rounded">{typeIcons[act.type] || <Activity size={16} />}</div>
                      <div>
                        <h6 className="fw-bold text-dark m-0" style={{ fontSize: "0.95rem" }}>{act.title}</h6>
                        <div className="text-muted extra-small">
                          Account: <strong>{act.entityName}</strong> • Logged by <strong>{act.performedByName}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="text-end">
                      <Badge status={act.status} />
                      <div className="text-muted extra-small mt-1">{new Date(act.dateTime).toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="p-2 bg-light rounded text-secondary small">
                    "{act.notes}"
                  </div>
                </div>
              ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalItems={filteredActivities.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityList;
