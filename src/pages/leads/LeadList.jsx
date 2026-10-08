import React, { useState } from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import { useCrmData } from "../../context/CrmDataContext";
import Badge from "../../components/common/Badge";
import Pagination from "../../components/common/Pagination";
import ConvertLeadModal from "../../components/modals/ConvertLeadModal";
import AddEditLeadModal from "../../components/modals/AddEditLeadModal";
import {
  Search,
  Plus,
  Filter,
  UserPlus,
  ArrowRightCircle,
  Eye,
  Edit2,
  Building,
  Mail,
  Phone,
  Flame,
  ArrowUpDown
} from "lucide-react";

const LeadList = () => {
  const { onOpenGlobalModal } = useOutletContext();
  const { leads } = useCrmData();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [sortField, setSortField] = useState("score");
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [convertingLead, setConvertingLead] = useState(null);
  const [editingLead, setEditingLead] = useState(null);

  const itemsPerPage = 5;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filteredLeads = leads
    .filter((l) => {
      const matchesSearch =
        l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "All" || l.status === statusFilter;
      const matchesRating = ratingFilter === "All" || l.rating === ratingFilter;

      return matchesSearch && matchesStatus && matchesRating;
    })
    .sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/* Header & Actions */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">Sales Leads</h4>
          <p className="text-muted small m-0">Qualify prospective leads, adjust dynamic scores, and convert to active accounts</p>
        </div>

        <button className="btn btn-crm-primary btn-sm" onClick={() => onOpenGlobalModal("add-lead")}>
          <Plus size={15} /> Add Lead
        </button>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="row g-3">
          <div className="col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-muted">
                <Search size={16} />
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0 shadow-none"
                placeholder="Search leads by company, contact person..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div className="col-md-3">
            <select
              className="form-select shadow-none"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Lead Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Unqualified">Unqualified</option>
              <option value="Converted">Converted</option>
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-select shadow-none"
              value={ratingFilter}
              onChange={(e) => {
                setRatingFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Ratings</option>
              <option value="Hot">Hot 🔥</option>
              <option value="Warm">Warm ☀️</option>
              <option value="Cold">Cold ❄️</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="crm-table-container">
        <table className="crm-table">
          <thead>
            <tr>
              <th className="cursor-pointer" onClick={() => handleSort("company")}>
                Company <ArrowUpDown size={12} />
              </th>
              <th className="cursor-pointer" onClick={() => handleSort("contactName")}>
                Contact <ArrowUpDown size={12} />
              </th>
              <th className="cursor-pointer" onClick={() => handleSort("score")}>
                Score <ArrowUpDown size={12} />
              </th>
              <th className="cursor-pointer" onClick={() => handleSort("estimatedValue")}>
                Est. Value <ArrowUpDown size={12} />
              </th>
              <th>Status & Rating</th>
              <th>Owner</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLeads.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-5 text-muted">
                  No lead records matched your filter criteria
                </td>
              </tr>
            ) : (
              paginatedLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <Link to={`/leads/${lead.id}`} className="fw-semibold text-dark text-decoration-none hover-primary">
                      {lead.company}
                    </Link>
                    <div className="text-muted extra-small">{lead.id} • {lead.industry}</div>
                  </td>

                  <td>
                    <div className="fw-medium text-dark">{lead.contactName}</div>
                    <div className="text-muted extra-small">{lead.email}</div>
                  </td>

                  <td>
                    <div className="text-dark small fw-medium">{lead.source}</div>
                    <div className="d-flex align-items-center gap-1 mt-1" style={{ width: "100px" }}>
                      <div className="progress flex-grow-1" style={{ height: "5px" }}>
                        <div
                          className={`progress-bar ${lead.score >= 80 ? "bg-success" : lead.score >= 50 ? "bg-warning" : "bg-secondary"}`}
                          style={{ width: `${lead.score}%` }}
                        ></div>
                      </div>
                      <span className="extra-small text-muted">{lead.score}</span>
                    </div>
                  </td>

                  <td>
                    <div className="fw-bold text-dark">
                      ${lead.estimatedValue?.toLocaleString()}
                    </div>
                  </td>

                  <td>
                    <div className="d-flex align-items-center gap-1">
                      <Badge status={lead.rating} />
                      <Badge status={lead.status} />
                    </div>
                  </td>

                  <td>
                    <div className="text-dark small">{lead.ownerName}</div>
                  </td>

                  <td className="text-end">
                    <div className="d-flex align-items-center justify-content-end gap-1">
                      <button
                        className="btn btn-sm btn-light border p-1"
                        title="View Lead Details"
                        onClick={() => navigate(`/leads/${lead.id}`)}
                      >
                        <Eye size={15} className="text-muted" />
                      </button>

                      {lead.status !== "Converted" ? (
                        <button
                          className="btn btn-sm btn-crm-primary py-1 px-2"
                          style={{ fontSize: "0.775rem" }}
                          onClick={() => setConvertingLead(lead)}
                        >
                          <ArrowRightCircle size={14} /> Convert
                        </button>
                      ) : (
                        <span className="badge bg-success-subtle text-success me-1">Converted</span>
                      )}

                      <button
                        className="btn btn-sm btn-light border p-1"
                        onClick={() => setEditingLead(lead)}
                      >
                        <Edit2 size={15} className="text-primary" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredLeads.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Convert Lead Modal */}
      {convertingLead && (
        <ConvertLeadModal
          lead={convertingLead}
          isOpen={true}
          onClose={() => setConvertingLead(null)}
        />
      )}

      {/* Edit Lead Modal */}
      {editingLead && (
        <AddEditLeadModal
          lead={editingLead}
          isOpen={true}
          onClose={() => setEditingLead(null)}
        />
      )}
    </div>
  );
};

export default LeadList;
