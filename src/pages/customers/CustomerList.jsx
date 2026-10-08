import React, { useState } from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import { useCrmData } from "../../context/CrmDataContext";
import Badge from "../../components/common/Badge";
import Pagination from "../../components/common/Pagination";
import AddEditCustomerModal from "../../components/modals/AddEditCustomerModal";
import {
  Search,
  Plus,
  Filter,
  Download,
  Building,
  Eye,
  Edit2,
  Trash2,
  ExternalLink,
  DollarSign
} from "lucide-react";

const CustomerList = () => {
  const { onOpenGlobalModal } = useOutletContext();
  const { customers, deleteCustomer } = useCrmData();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const itemsPerPage = 5;

  // Multi-field Filtering
  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTier = tierFilter === "All" || c.tier === tierFilter;
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;

    return matchesSearch && matchesTier && matchesStatus;
  });

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // CSV Export Utility
  const handleExportCSV = () => {
    const headers = "ID,Name,Contact,Email,Phone,Industry,Tier,Status,Revenue,Owner\n";
    const rows = filteredCustomers
      .map(
        (c) =>
          `"${c.id}","${c.name}","${c.contactName}","${c.email}","${c.phone}","${c.industry}","${c.tier}","${c.status}","${c.annualRevenue}","${c.ownerName}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `AcxiomCRM_Customers_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div>
      {/* Header & Actions */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">Customer Accounts</h4>
          <p className="text-muted small m-0">Manage enterprise client accounts, account owners, and revenue history</p>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-crm-outline btn-sm" onClick={handleExportCSV}>
            <Download size={15} /> Export CSV
          </button>
          <button className="btn btn-crm-primary btn-sm" onClick={() => onOpenGlobalModal("add-customer")}>
            <Plus size={15} /> Add Customer
          </button>
        </div>
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
                placeholder="Filter by company name, contact, or email..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="d-flex align-items-center gap-2">
              <Filter size={15} className="text-muted" />
              <select
                className="form-select shadow-none"
                value={tierFilter}
                onChange={(e) => {
                  setTierFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Account Tiers</option>
                <option value="Enterprise">Enterprise Tier</option>
                <option value="Mid-Market">Mid-Market Tier</option>
                <option value="SMB">SMB Tier</option>
              </select>
            </div>
          </div>

          <div className="col-md-4">
            <select
              className="form-select shadow-none"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active Accounts</option>
              <option value="Inactive">Inactive Accounts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Data Table */}
      <div className="crm-table-container">
        <table className="crm-table">
          <thead>
            <tr>
              <th>Account Name</th>
              <th>Primary Contact</th>
              <th>Industry & Tier</th>
              <th>Annual Revenue</th>
              <th>Status</th>
              <th>Account Owner</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-5 text-muted">
                  No customer records matched your filter criteria
                </td>
              </tr>
            ) : (
              paginatedCustomers.map((cust) => (
                <tr key={cust.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-light p-2 rounded text-primary">
                        <Building size={16} />
                      </div>
                      <div>
                        <Link to={`/customers/${cust.id}`} className="fw-semibold text-dark text-decoration-none hover-primary">
                          {cust.name}
                        </Link>
                        <div className="text-muted extra-small">{cust.id}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="fw-medium text-dark">{cust.contactName}</div>
                    <div className="text-muted extra-small">{cust.email}</div>
                  </td>

                  <td>
                    <div className="text-dark fw-medium" style={{ fontSize: "0.85rem" }}>{cust.industry}</div>
                    <span className="badge bg-primary-subtle text-primary mt-1" style={{ fontSize: "0.7rem" }}>
                      {cust.tier}
                    </span>
                  </td>

                  <td>
                    <div className="fw-semibold text-dark">
                      ${cust.annualRevenue?.toLocaleString()}
                    </div>
                  </td>

                  <td>
                    <Badge status={cust.status} />
                  </td>

                  <td>
                    <div className="text-dark small">{cust.ownerName}</div>
                  </td>

                  <td className="text-end">
                    <div className="d-flex align-items-center justify-content-end gap-1">
                      <button
                        className="btn btn-sm btn-light border p-1"
                        title="View 360 Customer Details"
                        onClick={() => navigate(`/customers/${cust.id}`)}
                      >
                        <Eye size={15} className="text-muted" />
                      </button>

                      <button
                        className="btn btn-sm btn-light border p-1"
                        title="Edit Customer"
                        onClick={() => setEditingCustomer(cust)}
                      >
                        <Edit2 size={15} className="text-primary" />
                      </button>

                      <button
                        className="btn btn-sm btn-light border p-1"
                        title="Delete Customer"
                        onClick={() => {
                          if (window.confirm(`Delete customer ${cust.name}?`)) {
                            deleteCustomer(cust.id);
                          }
                        }}
                      >
                        <Trash2 size={15} className="text-danger" />
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
          totalItems={filteredCustomers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Edit Customer Modal Dialog */}
      {editingCustomer && (
        <AddEditCustomerModal
          customer={editingCustomer}
          isOpen={true}
          onClose={() => setEditingCustomer(null)}
        />
      )}
    </div>
  );
};

export default CustomerList;
