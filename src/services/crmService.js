// AcxiomCRM Core Service Layer
import {
  initialCustomers,
  initialLeads,
  initialOpportunities,
  initialFollowUps,
  initialActivities,
  initialUsers,
  initialRoles,
  initialAuditLogs
} from "./mockData";
import { httpClient, simulateDelay } from "./api";

const STORAGE_KEYS = {
  CUSTOMERS: "acxiom_v3_customers",
  LEADS: "acxiom_v3_leads",
  OPPORTUNITIES: "acxiom_v3_opportunities",
  FOLLOWUPS: "acxiom_v3_followups",
  ACTIVITIES: "acxiom_v3_activities",
  USERS: "acxiom_v3_users",
  ROLES: "acxiom_v3_roles",
  AUDIT_LOGS: "acxiom_v3_audit_logs"
};

const getStoredItem = (key, fallback) => {
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return fallback;
    }
  }
  localStorage.setItem(key, JSON.stringify(fallback));
  return fallback;
};

const setStoredItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const crmService = {
  // --- Audit Logger Helper ---
  async logAudit(action, entity, details, user = "Ananya Sharma") {
    const logs = getStoredItem(STORAGE_KEYS.AUDIT_LOGS, initialAuditLogs);
    const newLog = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      action,
      entity,
      performedBy: typeof user === "string" ? user : user.name || "System User",
      userEmail: typeof user === "object" ? user.email : "user@acxiomcrm.com",
      timestamp: new Date().toISOString(),
      ipAddress: "192.168.1.100",
      details
    };
    const updated = [newLog, ...logs];
    setStoredItem(STORAGE_KEYS.AUDIT_LOGS, updated);
    return newLog;
  },

  // --- CUSTOMERS ---
  async getCustomers() {
    const apiRes = await httpClient("/customers");
    if (apiRes) return apiRes;
    return getStoredItem(STORAGE_KEYS.CUSTOMERS, initialCustomers);
  },

  async addCustomer(customerData, currentUser) {
    const customers = getStoredItem(STORAGE_KEYS.CUSTOMERS, initialCustomers);
    const newCust = {
      id: `CUST-${1000 + customers.length + 1}`,
      createdAt: new Date().toISOString(),
      status: "Active",
      ...customerData
    };
    const updated = [newCust, ...customers];
    setStoredItem(STORAGE_KEYS.CUSTOMERS, updated);
    await this.logAudit("CUSTOMER_CREATED", `Customer: ${newCust.name} (${newCust.id})`, `Created new customer profile for ${newCust.name}`, currentUser);
    return newCust;
  },

  async updateCustomer(id, customerData, currentUser) {
    const customers = getStoredItem(STORAGE_KEYS.CUSTOMERS, initialCustomers);
    const updated = customers.map((c) => (c.id === id ? { ...c, ...customerData } : c));
    setStoredItem(STORAGE_KEYS.CUSTOMERS, updated);
    await this.logAudit("CUSTOMER_UPDATED", `Customer ID: ${id}`, `Updated customer profile details`, currentUser);
    return updated.find((c) => c.id === id);
  },

  async deleteCustomer(id, currentUser) {
    const customers = getStoredItem(STORAGE_KEYS.CUSTOMERS, initialCustomers);
    const target = customers.find((c) => c.id === id);
    const filtered = customers.filter((c) => c.id !== id);
    setStoredItem(STORAGE_KEYS.CUSTOMERS, filtered);
    await this.logAudit("CUSTOMER_DELETED", `Customer ID: ${id}`, `Deleted customer ${target ? target.name : id}`, currentUser);
    return true;
  },

  // --- LEADS ---
  async getLeads() {
    const apiRes = await httpClient("/leads");
    if (apiRes) return apiRes;
    return getStoredItem(STORAGE_KEYS.LEADS, initialLeads);
  },

  async addLead(leadData, currentUser) {
    const leads = getStoredItem(STORAGE_KEYS.LEADS, initialLeads);
    const newLead = {
      id: `LEAD-${2000 + leads.length + 1}`,
      createdAt: new Date().toISOString(),
      status: "New",
      score: leadData.score || 50,
      rating: leadData.rating || "Warm",
      ...leadData
    };
    const updated = [newLead, ...leads];
    setStoredItem(STORAGE_KEYS.LEADS, updated);
    await this.logAudit("LEAD_CREATED", `Lead: ${newLead.company} (${newLead.id})`, `Added lead for ${newLead.contactName} at ${newLead.company}`, currentUser);
    return newLead;
  },

  async updateLead(id, leadData, currentUser) {
    const leads = getStoredItem(STORAGE_KEYS.LEADS, initialLeads);
    const updated = leads.map((l) => (l.id === id ? { ...l, ...leadData } : l));
    setStoredItem(STORAGE_KEYS.LEADS, updated);
    await this.logAudit("LEAD_UPDATED", `Lead ID: ${id}`, `Updated lead details`, currentUser);
    return updated.find((l) => l.id === id);
  },

  async convertLead(leadId, conversionOpts, currentUser) {
    // Lead Conversion Workflow: Creates Customer + Opportunity seamlessly!
    const leads = getStoredItem(STORAGE_KEYS.LEADS, initialLeads);
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) throw new Error("Lead not found");

    // 1. Create Customer
    const newCustomer = await this.addCustomer(
      {
        name: conversionOpts.customerName || lead.company,
        contactName: lead.contactName,
        email: lead.email,
        phone: lead.phone,
        industry: lead.industry || "General",
        tier: conversionOpts.tier || "SMB",
        annualRevenue: lead.estimatedValue ? lead.estimatedValue * 10 : 1000000,
        ownerId: lead.ownerId,
        ownerName: lead.ownerName,
        website: conversionOpts.website || "",
        tags: ["Converted Lead"]
      },
      currentUser
    );

    // 2. Create Opportunity if requested
    let newOpp = null;
    if (conversionOpts.createOpportunity) {
      newOpp = await this.addOpportunity(
        {
          name: conversionOpts.opportunityName || `${lead.company} Deal`,
          customerId: newCustomer.id,
          customerName: newCustomer.name,
          dealValue: conversionOpts.dealValue || lead.estimatedValue || 50000,
          stage: "Prospecting",
          winProbability: 30,
          expectedCloseDate: conversionOpts.expectedCloseDate || new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
          ownerId: lead.ownerId,
          ownerName: lead.ownerName,
          contactPerson: lead.contactName,
          leadSource: lead.source
        },
        currentUser
      );
    }

    // 3. Mark lead as Converted
    await this.updateLead(leadId, { status: "Converted" }, currentUser);

    await this.logAudit(
      "LEAD_CONVERTED",
      `Lead ID: ${leadId}`,
      `Successfully converted lead ${lead.company} to Customer ${newCustomer.name}` + (newOpp ? ` and created deal ${newOpp.name}` : ""),
      currentUser
    );

    return { customer: newCustomer, opportunity: newOpp };
  },

  // --- OPPORTUNITIES ---
  async getOpportunities() {
    const apiRes = await httpClient("/opportunities");
    if (apiRes) return apiRes;
    return getStoredItem(STORAGE_KEYS.OPPORTUNITIES, initialOpportunities);
  },

  async addOpportunity(oppData, currentUser) {
    const opps = getStoredItem(STORAGE_KEYS.OPPORTUNITIES, initialOpportunities);
    const newOpp = {
      id: `OPP-${3000 + opps.length + 1}`,
      stage: oppData.stage || "Prospecting",
      winProbability: oppData.winProbability || 25,
      stageHistory: [{ stage: oppData.stage || "Prospecting", date: new Date().toISOString().split("T")[0] }],
      ...oppData
    };
    const updated = [newOpp, ...opps];
    setStoredItem(STORAGE_KEYS.OPPORTUNITIES, updated);
    await this.logAudit("OPPORTUNITY_CREATED", `Opportunity: ${newOpp.name}`, `Created opportunity with value $${newOpp.dealValue}`, currentUser);
    return newOpp;
  },

  async updateOpportunityStage(id, newStage, wonLostReason = "", currentUser) {
    const opps = getStoredItem(STORAGE_KEYS.OPPORTUNITIES, initialOpportunities);
    const opp = opps.find((o) => o.id === id);
    if (!opp) return null;

    let prob = opp.winProbability;
    if (newStage === "Prospecting") prob = 20;
    else if (newStage === "Qualification") prob = 40;
    else if (newStage === "Proposal") prob = 70;
    else if (newStage === "Negotiation") prob = 85;
    else if (newStage === "Closed Won") prob = 100;
    else if (newStage === "Closed Lost") prob = 0;

    const history = [...(opp.stageHistory || []), { stage: newStage, date: new Date().toISOString().split("T")[0] }];
    const updatedOpp = {
      ...opp,
      stage: newStage,
      winProbability: prob,
      wonLostReason: wonLostReason || opp.wonLostReason,
      stageHistory: history
    };

    const updated = opps.map((o) => (o.id === id ? updatedOpp : o));
    setStoredItem(STORAGE_KEYS.OPPORTUNITIES, updated);
    await this.logAudit("OPPORTUNITY_STAGE_CHANGED", `Opportunity: ${opp.name}`, `Moved stage from ${opp.stage} to ${newStage}`, currentUser);
    return updatedOpp;
  },

  // --- FOLLOW-UPS ---
  async getFollowUps() {
    const apiRes = await httpClient("/followups");
    if (apiRes) return apiRes;
    return getStoredItem(STORAGE_KEYS.FOLLOWUPS, initialFollowUps);
  },

  async addFollowUp(followUpData, currentUser) {
    const list = getStoredItem(STORAGE_KEYS.FOLLOWUPS, initialFollowUps);
    const newFlw = {
      id: `FLW-${4000 + list.length + 1}`,
      status: "Upcoming",
      ...followUpData
    };
    const updated = [newFlw, ...list];
    setStoredItem(STORAGE_KEYS.FOLLOWUPS, updated);
    await this.logAudit("FOLLOWUP_SCHEDULED", `FollowUp: ${newFlw.title}`, `Scheduled ${newFlw.type} for ${newFlw.dueDate}`, currentUser);
    return newFlw;
  },

  async updateFollowUpStatus(id, newStatus, currentUser) {
    const list = getStoredItem(STORAGE_KEYS.FOLLOWUPS, initialFollowUps);
    const updated = list.map((f) => (f.id === id ? { ...f, status: newStatus } : f));
    setStoredItem(STORAGE_KEYS.FOLLOWUPS, updated);
    await this.logAudit("FOLLOWUP_UPDATED", `FollowUp ID: ${id}`, `Status changed to ${newStatus}`, currentUser);
    return updated.find((f) => f.id === id);
  },

  // --- ACTIVITIES ---
  async getActivities() {
    const apiRes = await httpClient("/activities");
    if (apiRes) return apiRes;
    return getStoredItem(STORAGE_KEYS.ACTIVITIES, initialActivities);
  },

  async logActivity(activityData, currentUser) {
    const list = getStoredItem(STORAGE_KEYS.ACTIVITIES, initialActivities);
    const newAct = {
      id: `ACT-${5000 + list.length + 1}`,
      dateTime: new Date().toISOString(),
      performedByName: currentUser ? currentUser.name : "Sales Rep",
      status: "Completed",
      ...activityData
    };
    const updated = [newAct, ...list];
    setStoredItem(STORAGE_KEYS.ACTIVITIES, updated);
    await this.logAudit("ACTIVITY_LOGGED", `Activity: ${newAct.title}`, `Logged ${newAct.type} for ${newAct.entityName}`, currentUser);
    return newAct;
  },

  // --- USERS & ROLES ---
  async getUsers() {
    return getStoredItem(STORAGE_KEYS.USERS, initialUsers);
  },

  async addUser(userData, currentUser) {
    const users = getStoredItem(STORAGE_KEYS.USERS, initialUsers);
    const newUser = {
      id: `usr_${100 + users.length + 1}`,
      status: "Active",
      createdAt: new Date().toISOString(),
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000)}?w=150&auto=format&fit=crop&q=80`,
      ...userData
    };
    const updated = [...users, newUser];
    setStoredItem(STORAGE_KEYS.USERS, updated);
    await this.logAudit("USER_CREATED", `User: ${newUser.name}`, `Created new user ${newUser.email} with role ${newUser.role}`, currentUser);
    return newUser;
  },

  async updateUser(id, userData, currentUser) {
    const users = getStoredItem(STORAGE_KEYS.USERS, initialUsers);
    const updated = users.map((u) => (u.id === id ? { ...u, ...userData } : u));
    setStoredItem(STORAGE_KEYS.USERS, updated);
    await this.logAudit("USER_UPDATED", `User ID: ${id}`, `Updated user profile/role`, currentUser);
    return updated.find((u) => u.id === id);
  },

  async getRoles() {
    return getStoredItem(STORAGE_KEYS.ROLES, initialRoles);
  },

  async updateRolePermissions(roleId, permissions, currentUser) {
    const roles = getStoredItem(STORAGE_KEYS.ROLES, initialRoles);
    const updated = roles.map((r) => (r.id === roleId ? { ...r, permissions } : r));
    setStoredItem(STORAGE_KEYS.ROLES, updated);
    await this.logAudit("ROLE_PERMISSIONS_UPDATED", `Role ID: ${roleId}`, `Updated permissions matrix`, currentUser);
    return updated.find((r) => r.id === roleId);
  },

  // --- AUDIT LOGS ---
  async getAuditLogs() {
    return getStoredItem(STORAGE_KEYS.AUDIT_LOGS, initialAuditLogs);
  }
};
