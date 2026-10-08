import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { getApiConfig, saveApiConfig } from "../../services/api";
import { User, Lock, Bell, Server, Save, CheckCircle2 } from "lucide-react";

const ProfileSettings = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const { showToast } = useNotification();

  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || "Ananya Sharma",
    email: currentUser?.email || "ananya.sharma@acxiomcrm.com",
    phone: currentUser?.phone || "+91 98765 43210",
    department: currentUser?.department || "Executive Management"
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    newPass: "",
    confirmPass: ""
  });

  const [apiConfig, setApiConfigState] = useState(getApiConfig());

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setCurrentUser({ ...currentUser, ...profileData });
    showToast("Profile details updated successfully!", "success");
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPass !== passwordData.confirmPass) {
      showToast("New passwords do not match!", "danger");
      return;
    }
    showToast("Password changed successfully!", "success");
    setPasswordData({ current: "", newPass: "", confirmPass: "" });
  };

  const handleSaveApi = (e) => {
    e.preventDefault();
    saveApiConfig(apiConfig);
    showToast("ASP.NET API Integration settings saved!", "success");
  };

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold text-dark m-0">Account Settings & Preferences</h4>
        <p className="text-muted small m-0">Manage profile credentials, system security, notification alerts, and API settings</p>
      </div>

      <div className="row g-3">
        {/* Left Column Settings Tabs */}
        <div className="col-lg-3">
          <div className="crm-card p-2">
            <div className="d-flex flex-column gap-1">
              <button
                className={`btn text-start d-flex align-items-center gap-2 p-2 rounded-2 ${
                  activeTab === "profile" ? "btn-primary text-white" : "btn-light text-dark"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <User size={16} /> My Profile
              </button>
              <button
                className={`btn text-start d-flex align-items-center gap-2 p-2 rounded-2 ${
                  activeTab === "security" ? "btn-primary text-white" : "btn-light text-dark"
                }`}
                onClick={() => setActiveTab("security")}
              >
                <Lock size={16} /> Password & Security
              </button>
              <button
                className={`btn text-start d-flex align-items-center gap-2 p-2 rounded-2 ${
                  activeTab === "notifications" ? "btn-primary text-white" : "btn-light text-dark"
                }`}
                onClick={() => setActiveTab("notifications")}
              >
                <Bell size={16} /> Notification Alerts
              </button>
              <button
                className={`btn text-start d-flex align-items-center gap-2 p-2 rounded-2 ${
                  activeTab === "api" ? "btn-primary text-white" : "btn-light text-dark"
                }`}
                onClick={() => setActiveTab("api")}
              >
                <Server size={16} /> ASP.NET API Setup
              </button>
            </div>
          </div>
        </div>

        {/* Right Column Tab Content */}
        <div className="col-lg-9">
          <div className="crm-card">
            <div className="crm-card-body">
              {activeTab === "profile" && (
                <form onSubmit={handleSaveProfile}>
                  <h6 className="fw-bold mb-3 border-bottom pb-2">Profile Information</h6>

                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small">Corporate Email</label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small">Department</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profileData.department}
                        onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-crm-primary">
                      <Save size={16} /> Save Profile Changes
                    </button>
                  </div>
                </form>
              )}

              {activeTab === "security" && (
                <form onSubmit={handleSavePassword}>
                  <h6 className="fw-bold mb-3 border-bottom pb-2">Change Password</h6>

                  <div className="row g-3 mb-4">
                    <div className="col-12">
                      <label className="form-label fw-semibold small">Current Password</label>
                      <input
                        type="password"
                        className="form-control"
                        required
                        value={passwordData.current}
                        onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        required
                        value={passwordData.newPass}
                        onChange={(e) => setPasswordData({ ...passwordData, newPass: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small">Confirm New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        required
                        value={passwordData.confirmPass}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPass: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-crm-primary">
                      <Save size={16} /> Update Password
                    </button>
                  </div>
                </form>
              )}

              {activeTab === "notifications" && (
                <div>
                  <h6 className="fw-bold mb-3 border-bottom pb-2">Email & In-App Notification Preferences</h6>

                  <div className="d-flex flex-column gap-3 mb-4">
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="n1" defaultChecked />
                      <label className="form-check-label fw-semibold text-dark" htmlFor="n1">
                        New Lead Assigned Alerts
                      </label>
                      <div className="text-muted extra-small">Receive immediate email notification when a sales lead is assigned to you.</div>
                    </div>

                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="n2" defaultChecked />
                      <label className="form-check-label fw-semibold text-dark" htmlFor="n2">
                        Upcoming Follow-Up Task Reminders
                      </label>
                      <div className="text-muted extra-small">Receive a daily morning summary of upcoming meetings and calls.</div>
                    </div>

                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="n3" defaultChecked />
                      <label className="form-check-label fw-semibold text-dark" htmlFor="n3">
                        Deal Pipeline Stage Change Notifications
                      </label>
                      <div className="text-muted extra-small">Notify team when a deal reaches Proposal or Closed Won.</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "api" && (
                <form onSubmit={handleSaveApi}>
                  <h6 className="fw-bold mb-3 border-bottom pb-2">ASP.NET Core Web API Connection Parameters</h6>

                  <div className="mb-3">
                    <div className="form-check form-switch mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="liveTogglePref"
                        checked={apiConfig.useLiveApi}
                        onChange={(e) => setApiConfigState({ ...apiConfig, useLiveApi: e.target.checked })}
                      />
                      <label className="form-check-label fw-semibold text-dark" htmlFor="liveTogglePref">
                        Enable Live ASP.NET Core Endpoint Connection
                      </label>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold small">API Base URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={apiConfig.baseUrl}
                      onChange={(e) => setApiConfigState({ ...apiConfig, baseUrl: e.target.value })}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold small">JWT Bearer Token</label>
                    <input
                      type="password"
                      className="form-control"
                      value={apiConfig.token}
                      onChange={(e) => setApiConfigState({ ...apiConfig, token: e.target.value })}
                    />
                  </div>

                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-crm-primary">
                      <Save size={16} /> Save API Parameters
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
