import React from "react";
import { useOutletContext, Link } from "react-router-dom";
import { useCrmData } from "../../context/CrmDataContext";
import StatCard from "../../components/common/StatCard";
import Badge from "../../components/common/Badge";
import {
  DollarSign,
  Users,
  Briefcase,
  TrendingUp,
  UserPlus,
  Calendar,
  Plus,
  CheckCircle2,
  ArrowRight,
  Activity
} from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { onOpenGlobalModal } = useOutletContext();
  const { metrics, opportunities, followUps, activities, updateFollowUpStatus } = useCrmData();

  // Revenue Line Chart Data
  const revenueChartData = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "Closed Revenue ($)",
        data: [180000, 240000, 210000, 310000, 290000, 420000],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.08)",
        fill: true,
        tension: 0.35,
        pointBackgroundColor: "#2563eb",
        pointBorderColor: "#ffffff",
        pointHoverRadius: 6
      }
    ]
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (context) => ` Revenue: $${context.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { color: "#f1f5f9" },
        ticks: {
          callback: (value) => `$${value / 1000}k`
        }
      }
    }
  };

  // Pipeline Doughnut Chart Data
  const pipelineStages = ["Prospecting", "Qualification", "Proposal", "Negotiation", "Closed Won"];
  const stageCounts = pipelineStages.map(
    (stage) => opportunities.filter((o) => o.stage === stage).length
  );

  const pipelineChartData = {
    labels: pipelineStages,
    datasets: [
      {
        data: stageCounts,
        backgroundColor: [
          "#94a3b8", // Prospecting
          "#6366f1", // Qualification
          "#3b82f6", // Proposal
          "#f59e0b", // Negotiation
          "#10b981"  // Closed Won
        ],
        borderWidth: 2,
        borderColor: "#ffffff"
      }
    ]
  };

  const pipelineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: { boxWidth: 12, padding: 12, font: { size: 12 } }
      }
    },
    cutout: "70%"
  };

  const upcomingTasks = followUps.filter((f) => f.status === "Upcoming" || f.status === "Overdue").slice(0, 4);

  return (
    <div>
      {/* Page Title & Action Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark m-0">Executive Dashboard</h4>
          <p className="text-muted small m-0">Overview of sales revenue, active pipeline, and pending follow-ups</p>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-crm-outline btn-sm" onClick={() => onOpenGlobalModal("schedule-flw")}>
            <Calendar size={15} /> Schedule Task
          </button>
          <button className="btn btn-crm-primary btn-sm" onClick={() => onOpenGlobalModal("add-opp")}>
            <Plus size={15} /> New Deal
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="row g-3 mb-4">
        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Total Revenue"
            value={`$${(metrics.totalRevenue / 1000000).toFixed(2)}M`}
            change="+14.2%"
            isIncrease={true}
            icon={DollarSign}
            iconBgClass="bg-primary-subtle text-primary"
          />
        </div>

        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Active Pipeline"
            value={`$${(metrics.pipelineValue / 1000).toFixed(0)}k`}
            change="+8.5%"
            isIncrease={true}
            icon={Briefcase}
            iconBgClass="bg-info-subtle text-info"
          />
        </div>

        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Win Rate %"
            value={`${metrics.winRatePercent}%`}
            change="+3.1%"
            isIncrease={true}
            icon={TrendingUp}
            iconBgClass="bg-success-subtle text-success"
          />
        </div>

        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Active Customers"
            value={metrics.activeCustomersCount}
            change="+2 new"
            isIncrease={true}
            icon={Users}
            iconBgClass="bg-warning-subtle text-warning-emphasis"
          />
        </div>
      </div>

      {/* Analytics & Pipeline Charts */}
      <div className="row g-3 mb-4">
        <div className="col-lg-8">
          <div className="crm-card h-100">
            <div className="crm-card-header">
              <div>
                <h6 className="fw-semibold m-0">Monthly Revenue Trend ($)</h6>
                <div className="text-muted extra-small">Closed deals across enterprise and mid-market accounts</div>
              </div>
              <span className="badge bg-light text-dark border">Q2 - Q3 2026</span>
            </div>
            <div className="crm-card-body" style={{ height: "280px" }}>
              <Line data={revenueChartData} options={revenueChartOptions} />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="crm-card h-100">
            <div className="crm-card-header">
              <h6 className="fw-semibold m-0">Sales Pipeline Breakdown</h6>
              <Link to="/opportunities" className="small text-primary text-decoration-none">
                View Kanban
              </Link>
            </div>
            <div className="crm-card-body d-flex align-items-center justify-content-center" style={{ height: "280px" }}>
              <Doughnut data={pipelineChartData} options={pipelineChartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Target Progress Bar & Widgets Row */}
      <div className="row g-3 mb-4">
        {/* Sales Target Goal */}
        <div className="col-lg-12">
          <div className="crm-card p-3 bg-white">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-flex align-items-center gap-2">
                <div className="badge bg-primary-subtle text-primary p-2 rounded-2">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <div className="fw-semibold text-dark" style={{ fontSize: "0.9rem" }}>Q4 Quarterly Target Progress</div>
                  <div className="text-muted extra-small">Goal: $1,200,000 in closed-won contracts</div>
                </div>
              </div>
              <div className="fw-bold text-primary fs-6">$668,000 / $1.2M (55.6%)</div>
            </div>
            <div className="progress" style={{ height: "8px" }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: "55.6%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Widgets: Upcoming Tasks & Activity Feed */}
      <div className="row g-3">
        {/* Upcoming Tasks */}
        <div className="col-lg-6">
          <div className="crm-card h-100">
            <div className="crm-card-header">
              <div className="d-flex align-items-center gap-2">
                <Calendar size={18} className="text-primary" />
                <h6 className="fw-semibold m-0">Upcoming & Pending Follow-Ups</h6>
              </div>
              <Link to="/followups" className="small text-primary text-decoration-none">
                View All ({metrics.upcomingFollowUpsCount})
              </Link>
            </div>
            <div className="crm-card-body p-0">
              {upcomingTasks.length === 0 ? (
                <div className="text-center py-4 text-muted small">No pending follow-ups scheduled</div>
              ) : (
                <div className="list-group list-group-flush">
                  {upcomingTasks.map((t) => (
                    <div key={t.id} className="list-group-item px-3 py-3 d-flex align-items-center justify-content-between">
                      <div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="fw-semibold text-dark" style={{ fontSize: "0.875rem" }}>{t.title}</span>
                          <Badge status={t.status} />
                        </div>
                        <div className="text-muted extra-small mt-1">
                          {t.entityName} • Due: {t.dueDate} at {t.dueTime} • Assigned: {t.assignedToName}
                        </div>
                      </div>
                      <button
                        className="btn btn-sm btn-light border text-success hover-bg"
                        title="Mark Complete"
                        onClick={() => updateFollowUpStatus(t.id, "Completed")}
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="col-lg-6">
          <div className="crm-card h-100">
            <div className="crm-card-header">
              <div className="d-flex align-items-center gap-2">
                <Activity size={18} className="text-info" />
                <h6 className="fw-semibold m-0">Recent Customer Activity Feed</h6>
              </div>
              <Link to="/activities" className="small text-primary text-decoration-none">
                View History
              </Link>
            </div>
            <div className="crm-card-body p-3">
              {activities.slice(0, 4).map((act) => (
                <div key={act.id} className="timeline-item">
                  <div className="timeline-icon">
                    <span className="rounded-circle bg-primary" style={{ width: "8px", height: "8px" }}></span>
                  </div>
                  <div>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="fw-semibold text-dark" style={{ fontSize: "0.85rem" }}>{act.title}</span>
                      <span className="text-muted extra-small">{act.duration}</span>
                    </div>
                    <div className="text-muted extra-small">
                      {act.performedByName} with <strong>{act.entityName}</strong>
                    </div>
                    <div className="p-2 bg-light rounded mt-1 text-secondary" style={{ fontSize: "0.8rem" }}>
                      "{act.notes}"
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
