import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { crmService } from "../services/crmService";
import { useAuth } from "./AuthContext";
import { useNotification } from "./NotificationContext";

const CrmDataContext = createContext();

export const CrmDataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { showToast } = useNotification();

  const [customers, setCustomers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [custData, leadData, oppData, flwData, actData, usrData, rleData, audData] = await Promise.all([
        crmService.getCustomers(),
        crmService.getLeads(),
        crmService.getOpportunities(),
        crmService.getFollowUps(),
        crmService.getActivities(),
        crmService.getUsers(),
        crmService.getRoles(),
        crmService.getAuditLogs()
      ]);

      setCustomers(custData);
      setLeads(leadData);
      setOpportunities(oppData);
      setFollowUps(flwData);
      setActivities(actData);
      setUsers(usrData);
      setRoles(rleData);
      setAuditLogs(audData);
    } catch (err) {
      console.error("Error loading CRM data:", err);
      showToast("Error loading CRM dataset: " + err.message, "danger");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  // Actions wrapped with automatic notifications and refresh
  const addCustomer = async (data) => {
    const created = await crmService.addCustomer(data, currentUser);
    showToast(`Customer "${created.name}" created successfully!`, "success");
    await refreshAllData();
    return created;
  };

  const updateCustomer = async (id, data) => {
    const updated = await crmService.updateCustomer(id, data, currentUser);
    showToast(`Customer updated successfully!`, "success");
    await refreshAllData();
    return updated;
  };

  const deleteCustomer = async (id) => {
    await crmService.deleteCustomer(id, currentUser);
    showToast(`Customer removed`, "warning");
    await refreshAllData();
  };

  const addLead = async (data) => {
    const created = await crmService.addLead(data, currentUser);
    showToast(`Lead for "${created.company}" created!`, "success");
    await refreshAllData();
    return created;
  };

  const updateLead = async (id, data) => {
    const updated = await crmService.updateLead(id, data, currentUser);
    showToast(`Lead updated!`, "success");
    await refreshAllData();
    return updated;
  };

  const convertLead = async (leadId, opts) => {
    const result = await crmService.convertLead(leadId, opts, currentUser);
    showToast(`Lead successfully converted to Customer "${result.customer.name}"!`, "success");
    await refreshAllData();
    return result;
  };

  const addOpportunity = async (data) => {
    const created = await crmService.addOpportunity(data, currentUser);
    showToast(`Opportunity "${created.name}" created!`, "success");
    await refreshAllData();
    return created;
  };

  const updateOpportunityStage = async (id, newStage, reason) => {
    const updated = await crmService.updateOpportunityStage(id, newStage, reason, currentUser);
    showToast(`Moved deal to "${newStage}"`, "info");
    await refreshAllData();
    return updated;
  };

  const addFollowUp = async (data) => {
    const created = await crmService.addFollowUp(data, currentUser);
    showToast(`Follow-up scheduled for ${created.dueDate}`, "success");
    await refreshAllData();
    return created;
  };

  const updateFollowUpStatus = async (id, status) => {
    const updated = await crmService.updateFollowUpStatus(id, status, currentUser);
    showToast(`Follow-up status marked as ${status}`, "info");
    await refreshAllData();
    return updated;
  };

  const logActivity = async (data) => {
    const created = await crmService.logActivity(data, currentUser);
    showToast(`Activity logged!`, "success");
    await refreshAllData();
    return created;
  };

  const addUser = async (data) => {
    const created = await crmService.addUser(data, currentUser);
    showToast(`User "${created.name}" added to system`, "success");
    await refreshAllData();
    return created;
  };

  const updateUser = async (id, data) => {
    const updated = await crmService.updateUser(id, data, currentUser);
    showToast(`User details updated!`, "success");
    await refreshAllData();
    return updated;
  };

  const updateRolePermissions = async (roleId, permissions) => {
    const updated = await crmService.updateRolePermissions(roleId, permissions, currentUser);
    showToast(`Role permissions updated!`, "success");
    await refreshAllData();
    return updated;
  };

  // Calculated Metrics
  const metrics = {
    totalRevenue: customers.reduce((sum, c) => sum + (c.annualRevenue || 0), 0),
    activeCustomersCount: customers.filter((c) => c.status === "Active").length,
    totalLeadsCount: leads.length,
    openLeadsCount: leads.filter((l) => l.status !== "Converted" && l.status !== "Unqualified").length,
    pipelineValue: opportunities.reduce((sum, o) => (o.stage !== "Closed Lost" && o.stage !== "Closed Won" ? sum + (o.dealValue || 0) : sum), 0),
    wonDealsValue: opportunities.filter((o) => o.stage === "Closed Won").reduce((sum, o) => sum + (o.dealValue || 0), 0),
    winRatePercent: opportunities.length > 0 ? Math.round((opportunities.filter((o) => o.stage === "Closed Won").length / opportunities.length) * 100) : 0,
    upcomingFollowUpsCount: followUps.filter((f) => f.status === "Upcoming" || f.status === "Overdue").length
  };

  return (
    <CrmDataContext.Provider
      value={{
        customers,
        leads,
        opportunities,
        followUps,
        activities,
        users,
        roles,
        auditLogs,
        loading,
        metrics,
        refreshAllData,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addLead,
        updateLead,
        convertLead,
        addOpportunity,
        updateOpportunityStage,
        addFollowUp,
        updateFollowUpStatus,
        logActivity,
        addUser,
        updateUser,
        updateRolePermissions
      }}
    >
      {children}
    </CrmDataContext.Provider>
  );
};

export const useCrmData = () => useContext(CrmDataContext);
