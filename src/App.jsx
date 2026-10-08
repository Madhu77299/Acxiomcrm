import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { CrmDataProvider } from "./context/CrmDataContext";

// Layouts & Protection Guards
import AppLayout from "./components/layout/AppLayout";
import AuthLayout from "./components/layout/AuthLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Unauthorized from "./pages/auth/Unauthorized";

// Main CRM Modules
import Dashboard from "./pages/dashboard/Dashboard";
import CustomerList from "./pages/customers/CustomerList";
import CustomerDetails from "./pages/customers/CustomerDetails";
import LeadList from "./pages/leads/LeadList";
import LeadDetails from "./pages/leads/LeadDetails";
import OpportunityList from "./pages/opportunities/OpportunityList";
import OpportunityDetails from "./pages/opportunities/OpportunityDetails";
import FollowUpList from "./pages/followups/FollowUpList";
import ActivityList from "./pages/activities/ActivityList";
import UserList from "./pages/users/UserList";
import RolePermissions from "./pages/users/RolePermissions";
import ReportsDashboard from "./pages/reports/ReportsDashboard";
import AuditLogs from "./pages/audit/AuditLogs";
import ProfileSettings from "./pages/settings/ProfileSettings";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CrmDataProvider>
          <HashRouter>
            <Routes>
              {/* Public Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>

              {/* Protected Role-Based CRM Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  
                  {/* Customers Module */}
                  <Route element={<ProtectedRoute requiredModule="customers" />}>
                    <Route path="/customers" element={<CustomerList />} />
                    <Route path="/customers/:id" element={<CustomerDetails />} />
                  </Route>
                  
                  {/* Leads Module */}
                  <Route element={<ProtectedRoute requiredModule="leads" />}>
                    <Route path="/leads" element={<LeadList />} />
                    <Route path="/leads/:id" element={<LeadDetails />} />
                  </Route>
                  
                  {/* Opportunities Module */}
                  <Route element={<ProtectedRoute requiredModule="opportunities" />}>
                    <Route path="/opportunities" element={<OpportunityList />} />
                    <Route path="/opportunities/:id" element={<OpportunityDetails />} />
                  </Route>
                  
                  {/* Follow-Ups Module */}
                  <Route element={<ProtectedRoute requiredModule="followups" />}>
                    <Route path="/followups" element={<FollowUpList />} />
                  </Route>

                  {/* Activities */}
                  <Route path="/activities" element={<ActivityList />} />

                  {/* Users & Roles Module (Restricted to Admins & Managers) */}
                  <Route element={<ProtectedRoute requiredModule="users" />}>
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/roles" element={<RolePermissions />} />
                  </Route>

                  {/* Reports & Intelligence Module */}
                  <Route element={<ProtectedRoute requiredModule="reports" />}>
                    <Route path="/reports" element={<ReportsDashboard />} />
                  </Route>

                  {/* Audit Logs Module */}
                  <Route element={<ProtectedRoute requiredModule="auditLogs" />}>
                    <Route path="/audit" element={<AuditLogs />} />
                  </Route>

                  {/* Settings */}
                  <Route path="/settings" element={<ProfileSettings />} />
                </Route>
              </Route>

              {/* Catch-all Fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </HashRouter>
        </CrmDataProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
