import React, { useState } from "react";
import { useCrmData } from "../../context/CrmDataContext";
import { BarChart3, Download, Printer, Filter, Calendar, TrendingUp } from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ReportsDashboard = () => {
  const { customers, leads, opportunities, followUps, activities, auditLogs } = useCrmData();

  const [activeReportTab, setActiveReportTab] = useState("pipeline"); // 'pipeline', 'customer', 'lead', 'conversion', 'activity', 'audit'
  const [dateRange, setDateRange] = useState("Q3-2026");

  // Chart Data Generators
  const leadSourceData = {
    labels: ["Website Form", "LinkedIn", "Trade Show", "Referral", "Cold Call"],
    datasets: [
      {
        label: "Leads Generated",
        data: [14, 9, 7, 12, 4],
        backgroundColor: "#2563eb"
      }
    ]
  };

  const dealStageValueData = {
    labels: ["Prospecting", "Qualification", "Proposal", "Negotiation", "Won"],
    datasets: [
      {
        label: "Pipeline Value ($)",
        data: [52000, 140000, 145000, 220000, 88000],
        backgroundColor: ["#94a3b8", "#6366f1", "#3b82f6", "#f59e0b", "#10b981"]
      }
    ]
  };

  const conversionRateData = {
    labels: ["Converted to Customer", "Qualified (Active)", "Unqualified/Lost"],
    datasets: [
      {
        data: [12, 18, 6],
        backgroundColor: ["#10b981", "#3b82f6", "#ef4444"]
      }
    ]
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">Reports & Sales Intelligence</h4>
          <p className="text-muted small m-0">Comprehensive analytics across customers, deals, conversion rates, and user performance</p>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-crm-outline btn-sm" onClick={handlePrintReport}>
            <Printer size={15} /> Print Report
          </button>
          <button className="btn btn-crm-primary btn-sm" onClick={handlePrintReport}>
            <Download size={15} /> Export PDF Report
          </button>
        </div>
      </div>

      {/* Date Range & Filter Bar */}
      <div className="filter-bar d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <Calendar size={16} className="text-muted" />
          <span className="fw-semibold text-dark small">Reporting Period:</span>
          <select
            className="form-select form-select-sm shadow-none"
            style={{ width: "180px" }}
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="Q3-2026">Q3 2026 (Current)</option>
            <option value="Q2-2026">Q2 2026</option>
            <option value="YTD">Year To Date (2026)</option>
          </select>
        </div>
      </div>

      {/* Report Type Selector Tabs */}
      <div className="crm-card mb-4">
        <div className="crm-card-header p-0 px-3">
          <div className="crm-nav-tabs">
            <span
              className={`crm-tab-item ${activeReportTab === "pipeline" ? "active" : ""}`}
              onClick={() => setActiveReportTab("pipeline")}
            >
              Pipeline & Deal Report
            </span>
            <span
              className={`crm-tab-item ${activeReportTab === "customer" ? "active" : ""}`}
              onClick={() => setActiveReportTab("customer")}
            >
              Customer Accounts
            </span>
            <span
              className={`crm-tab-item ${activeReportTab === "lead" ? "active" : ""}`}
              onClick={() => setActiveReportTab("lead")}
            >
              Lead Attribution
            </span>
            <span
              className={`crm-tab-item ${activeReportTab === "conversion" ? "active" : ""}`}
              onClick={() => setActiveReportTab("conversion")}
            >
              Conversion Funnel
            </span>
            <span
              className={`crm-tab-item ${activeReportTab === "activity" ? "active" : ""}`}
              onClick={() => setActiveReportTab("activity")}
            >
              User Performance
            </span>
          </div>
        </div>

        <div className="crm-card-body">
          {activeReportTab === "pipeline" && (
            <div>
              <div className="row g-3 mb-4">
                <div className="col-md-8">
                  <h6 className="fw-bold mb-3">Deal Value per Pipeline Stage ($)</h6>
                  <div style={{ height: "300px" }}>
                    <Bar data={dealStageValueData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                </div>
                <div className="col-md-4">
                  <h6 className="fw-bold mb-3">Pipeline Key Metrics</h6>
                  <div className="p-3 bg-light rounded-3 border mb-3">
                    <div className="text-muted extra-small">Total Pipeline Value</div>
                    <h4 className="fw-bold text-primary m-0">$645,000</h4>
                  </div>
                  <div className="p-3 bg-light rounded-3 border mb-3">
                    <div className="text-muted extra-small">Average Deal Size</div>
                    <h4 className="fw-bold text-dark m-0">$129,000</h4>
                  </div>
                  <div className="p-3 bg-light rounded-3 border">
                    <div className="text-muted extra-small">Win Probability Index</div>
                    <h4 className="fw-bold text-success m-0">68% Win Index</h4>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeReportTab === "lead" && (
            <div className="row g-3">
              <div className="col-md-7">
                <h6 className="fw-bold mb-3">Leads Acquisition by Source</h6>
                <div style={{ height: "300px" }}>
                  <Bar data={leadSourceData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
              <div className="col-md-5">
                <h6 className="fw-bold mb-3">Top Performing Channels</h6>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Website Inbound Form</span>
                    <span className="badge bg-primary">14 Leads (35%)</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Client Referrals</span>
                    <span className="badge bg-success">12 Leads (30%)</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>LinkedIn Campaign</span>
                    <span className="badge bg-info">9 Leads (22%)</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeReportTab === "conversion" && (
            <div className="row g-3">
              <div className="col-md-6">
                <h6 className="fw-bold mb-3">Lead Conversion Breakdown</h6>
                <div style={{ height: "280px" }}>
                  <Doughnut data={conversionRateData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
              <div className="col-md-6">
                <h6 className="fw-bold mb-3">Funnel Conversion Rate Summary</h6>
                <div className="p-4 border rounded-3 bg-white">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between fw-semibold small mb-1">
                      <span>Lead to Opportunity Conversion</span>
                      <span className="text-primary">68%</span>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div className="progress-bar bg-primary" style={{ width: "68%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="d-flex justify-content-between fw-semibold small mb-1">
                      <span>Proposal to Closed-Won Conversion</span>
                      <span className="text-success">75%</span>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div className="progress-bar bg-success" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeReportTab === "customer" && (
            <div>
              <h6 className="fw-bold mb-3">Customer Tier Distribution & Revenue Breakdown</h6>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="p-3 border rounded bg-white">
                    <div className="text-muted extra-small">Enterprise Tier Revenue</div>
                    <h4 className="fw-bold text-dark m-0">$40.5M</h4>
                    <span className="extra-small text-muted">2 Accounts</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 border rounded bg-white">
                    <div className="text-muted extra-small">Mid-Market Tier Revenue</div>
                    <h4 className="fw-bold text-dark m-0">$16.2M</h4>
                    <span className="extra-small text-muted">2 Accounts</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 border rounded bg-white">
                    <div className="text-muted extra-small">SMB Tier Revenue</div>
                    <h4 className="fw-bold text-dark m-0">$3.2M</h4>
                    <span className="extra-small text-muted">1 Account</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeReportTab === "activity" && (
            <div>
              <h6 className="fw-bold mb-3">Sales Rep Performance & Logged Activity Summary</h6>
              <table className="crm-table">
                <thead>
                  <tr>
                    <th>Sales Rep</th>
                    <th>Calls Made</th>
                    <th>Meetings Held</th>
                    <th>Deals Managed</th>
                    <th>Closed Won Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-semibold">Priya Sundaram</td>
                    <td>24</td>
                    <td>12</td>
                    <td>2 Deals</td>
                    <td className="fw-bold text-success">₹8,80,000</td>
                  </tr>
                  <tr>
                    <td className="fw-semibold">Rohan Mehta</td>
                    <td>18</td>
                    <td>8</td>
                    <td>2 Deals</td>
                    <td className="fw-bold text-success">₹22,000,000</td>
                  </tr>
                  <tr>
                    <td className="fw-semibold">Vikramaditya Rao</td>
                    <td>15</td>
                    <td>6</td>
                    <td>1 Deal</td>
                    <td className="fw-bold text-muted">₹5,20,000 (In progress)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;
