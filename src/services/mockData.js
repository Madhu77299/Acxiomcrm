// Initial Realistic Seed Data for AcxiomCRM Enterprise Sales (Indian Enterprise Dataset)

export const initialUsers = [
  {
    id: "usr_101",
    name: "Ananya Sharma",
    email: "ananya.sharma@acxiomcrm.com",
    role: "Admin",
    department: "Executive Management",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43210",
    status: "Active",
    createdAt: "2025-01-10T09:00:00Z"
  },
  {
    id: "usr_102",
    name: "Vikramaditya Rao",
    email: "vikramaditya.rao@acxiomcrm.com",
    role: "Sales Manager",
    department: "Global Sales",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 12345",
    status: "Active",
    createdAt: "2025-01-15T10:30:00Z"
  },
  {
    id: "usr_103",
    name: "Priya Sundaram",
    email: "priya.sundaram@acxiomcrm.com",
    role: "Sales Rep",
    department: "Enterprise Accounts",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 67890",
    status: "Active",
    createdAt: "2025-02-01T11:00:00Z"
  },
  {
    id: "usr_104",
    name: "Rohan Mehta",
    email: "rohan.mehta@acxiomcrm.com",
    role: "Sales Rep",
    department: "Mid-Market Sales",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 89012",
    status: "Active",
    createdAt: "2025-02-10T14:15:00Z"
  },
  {
    id: "usr_105",
    name: "Neha Kapoor",
    email: "neha.kapoor@acxiomcrm.com",
    role: "Support Specialist",
    department: "Customer Success",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 23456",
    status: "Active",
    createdAt: "2025-03-01T08:45:00Z"
  }
];

export const initialRoles = [
  {
    id: "role_admin",
    name: "Admin",
    description: "Full unmitigated access to all CRM resources, user management, and system settings.",
    permissions: {
      customers: { view: true, create: true, edit: true, delete: true },
      leads: { view: true, create: true, edit: true, delete: true, assign: true, convert: true },
      opportunities: { view: true, create: true, edit: true, delete: true },
      followups: { view: true, create: true, edit: true, delete: true },
      reports: { view: true, export: true },
      users: { view: true, create: true, edit: true, delete: true, roles: true },
      auditLogs: { view: true }
    }
  },
  {
    id: "role_manager",
    name: "Sales Manager",
    description: "Manages team pipeline, assigns leads, views financial reports and team performance.",
    permissions: {
      customers: { view: true, create: true, edit: true, delete: false },
      leads: { view: true, create: true, edit: true, delete: true, assign: true, convert: true },
      opportunities: { view: true, create: true, edit: true, delete: true },
      followups: { view: true, create: true, edit: true, delete: true },
      reports: { view: true, export: true },
      users: { view: true, create: false, edit: false, delete: false, roles: false },
      auditLogs: { view: true }
    }
  },
  {
    id: "role_rep",
    name: "Sales Rep",
    description: "Manages assigned leads, customers, opportunities and schedules follow-ups.",
    permissions: {
      customers: { view: true, create: true, edit: true, delete: false },
      leads: { view: true, create: true, edit: true, delete: false, assign: false, convert: true },
      opportunities: { view: true, create: true, edit: true, delete: false },
      followups: { view: true, create: true, edit: true, delete: true },
      reports: { view: true, export: false },
      users: { view: false, create: false, edit: false, delete: false, roles: false },
      auditLogs: { view: false }
    }
  },
  {
    id: "role_support",
    name: "Support Specialist",
    description: "View customer profiles, log interaction activities and view support history.",
    permissions: {
      customers: { view: true, create: false, edit: true, delete: false },
      leads: { view: true, create: false, edit: false, delete: false, assign: false, convert: false },
      opportunities: { view: true, create: false, edit: false, delete: false },
      followups: { view: true, create: true, edit: true, delete: false },
      reports: { view: false, export: false },
      users: { view: false, create: false, edit: false, delete: false, roles: false },
      auditLogs: { view: false }
    }
  }
];

export const initialCustomers = [
  {
    id: "CUST-1001",
    name: "Tata Enterprise Technologies",
    contactName: "Rajesh Sundaram",
    email: "rajesh.sundaram@tata.com",
    phone: "+91 (22) 6665-8282",
    industry: "Financial Technology",
    tier: "Enterprise",
    status: "Active",
    annualRevenue: 125000000,
    employeeCount: 4500,
    ownerId: "usr_103",
    ownerName: "Priya Sundaram",
    website: "https://tata.com",
    address: "Bombay House, Fort, Mumbai, Maharashtra 400001",
    tags: ["Key Account", "High Priority", "SaaS Core"],
    createdAt: "2025-01-20T10:00:00Z"
  },
  {
    id: "CUST-1002",
    name: "Apollo Health Care Systems",
    contactName: "Dr. Ananya Reddy",
    email: "ananya.reddy@apollohealth.org",
    phone: "+91 (44) 2829-0200",
    industry: "Healthcare & Biotech",
    tier: "Enterprise",
    status: "Active",
    annualRevenue: 280000000,
    employeeCount: 12000,
    ownerId: "usr_104",
    ownerName: "Rohan Mehta",
    website: "https://apollohospitals.com",
    address: "21 Greams Lane, Chennai, Tamil Nadu 600006",
    tags: ["HIPAA Compliant", "Multi-Year Contract"],
    createdAt: "2025-02-14T14:30:00Z"
  },
  {
    id: "CUST-1003",
    name: "Infosys Cloud Dynamics",
    contactName: "Aditya Verma",
    email: "aditya.v@infosyscloud.io",
    phone: "+91 (80) 2852-0261",
    industry: "Software & Security",
    tier: "Mid-Market",
    status: "Active",
    annualRevenue: 64000000,
    employeeCount: 1800,
    ownerId: "usr_103",
    ownerName: "Priya Sundaram",
    website: "https://infosys.com",
    address: "Electronics City, Hosur Road, Bengaluru, Karnataka 560100",
    tags: ["Fast Growth", "API Integration"],
    createdAt: "2025-03-02T11:15:00Z"
  },
  {
    id: "CUST-1004",
    name: "Reliance Digital Logistics",
    contactName: "Mukesh Patel",
    email: "mukesh.patel@reliancedigital.in",
    phone: "+91 (22) 3555-5000",
    industry: "Transportation & Freight",
    tier: "Mid-Market",
    status: "Inactive",
    annualRevenue: 98000000,
    employeeCount: 3200,
    ownerId: "usr_104",
    ownerName: "Rohan Mehta",
    website: "https://reliancedigital.in",
    address: "Reliance Corporate Park, Navi Mumbai 400701",
    tags: ["Renewal Pending"],
    createdAt: "2025-03-18T09:20:00Z"
  },
  {
    id: "CUST-1005",
    name: "Network18 Media India",
    contactName: "Sanya Malhotra",
    email: "sanya.m@network18.in",
    phone: "+91 (120) 4000-000",
    industry: "Media & Broadcasting",
    tier: "SMB",
    status: "Active",
    annualRevenue: 32000000,
    employeeCount: 850,
    ownerId: "usr_102",
    ownerName: "Vikramaditya Rao",
    website: "https://network18online.com",
    address: "FC 7-9, Film City, Sector 16A, Noida, UP 201301",
    tags: ["Ad Platform Integration"],
    createdAt: "2025-04-05T16:00:00Z"
  }
];

export const initialLeads = [
  {
    id: "LEAD-2001",
    company: "Wipro Cloud Systems",
    contactName: "Kiran Kumar",
    title: "VP of Infrastructure",
    email: "kiran.kumar@wipro.com",
    phone: "+91 (80) 2844-0011",
    source: "Website Form",
    status: "New",
    score: 85,
    rating: "Hot",
    industry: "Cloud Infrastructure",
    estimatedValue: 750000,
    ownerId: "usr_103",
    ownerName: "Priya Sundaram",
    notes: "Inquired through demo request form regarding enterprise license options.",
    createdAt: "2026-10-01T10:15:00Z"
  },
  {
    id: "LEAD-2002",
    company: "Biocon Lifesciences",
    contactName: "Dr. Sunita Deshmukh",
    title: "Chief Research Officer",
    email: "sunita.deshmukh@biocon.com",
    phone: "+91 (80) 2808-2808",
    source: "LinkedIn Outreach",
    status: "Contacted",
    score: 72,
    rating: "Warm",
    industry: "Pharmaceuticals",
    estimatedValue: 1200000,
    ownerId: "usr_104",
    ownerName: "Rohan Mehta",
    notes: "Had initial discovery call. Sent product brochure and case studies.",
    createdAt: "2026-10-03T11:45:00Z"
  },
  {
    id: "LEAD-2003",
    company: "Flipkart Supply Chain",
    contactName: "Karthik Iyer",
    title: "Director of IT Ops",
    email: "karthik.i@flipkart.com",
    phone: "+91 (80) 4940-0000",
    source: "Trade Show Conference",
    status: "Qualified",
    score: 91,
    rating: "Hot",
    industry: "Retail & E-Commerce",
    estimatedValue: 950000,
    ownerId: "usr_103",
    ownerName: "Priya Sundaram",
    notes: "Met at TechExpo India 2026. Needs implementation before Q1 next year.",
    createdAt: "2026-10-04T15:20:00Z"
  },
  {
    id: "LEAD-2004",
    company: "HDFC Digital Financial",
    contactName: "Pooja Hegde",
    title: "Head of Procurement",
    email: "pooja.h@hdfc.com",
    phone: "+91 (22) 6631-6000",
    source: "Cold Call",
    status: "Unqualified",
    score: 35,
    rating: "Cold",
    industry: "Banking & Finance",
    estimatedValue: 450000,
    ownerId: "usr_104",
    ownerName: "Rohan Mehta",
    notes: "No current budget allocated for CRM overhaul this fiscal year.",
    createdAt: "2026-10-05T09:10:00Z"
  },
  {
    id: "LEAD-2005",
    company: "TCS AI Labs",
    contactName: "Vikramaditya Patel",
    title: "CTO",
    email: "vikram.p@tcs.com",
    phone: "+91 (22) 6778-9999",
    source: "Referral",
    status: "Qualified",
    score: 94,
    rating: "Hot",
    industry: "Artificial Intelligence",
    estimatedValue: 1800000,
    ownerId: "usr_102",
    ownerName: "Vikramaditya Rao",
    notes: "Referred by Tata Enterprise Technologies. High intent for custom API tier.",
    createdAt: "2026-10-06T14:00:00Z"
  }
];

export const initialOpportunities = [
  {
    id: "OPP-3001",
    name: "Wipro Enterprise Platform License & SLA",
    customerId: "CUST-1001",
    customerName: "Tata Enterprise Technologies",
    dealValue: 1450000,
    stage: "Proposal",
    winProbability: 75,
    expectedCloseDate: "2026-10-25",
    ownerId: "usr_103",
    ownerName: "Priya Sundaram",
    contactPerson: "Rajesh Sundaram",
    leadSource: "Website Form",
    notes: "Proposal submitted for 250 enterprise seats with custom SSO integration.",
    stageHistory: [
      { stage: "Prospecting", date: "2026-09-10" },
      { stage: "Qualification", date: "2026-09-18" },
      { stage: "Proposal", date: "2026-10-02" }
    ]
  },
  {
    id: "OPP-3002",
    name: "Apollo Health Workflow Suite Expansion",
    customerId: "CUST-1002",
    customerName: "Apollo Health Care Systems",
    dealValue: 2200000,
    stage: "Negotiation",
    winProbability: 85,
    expectedCloseDate: "2026-10-18",
    ownerId: "usr_104",
    ownerName: "Rohan Mehta",
    contactPerson: "Dr. Ananya Reddy",
    leadSource: "Existing Customer",
    notes: "Legal team reviewing final contract addendum regarding data compliance.",
    stageHistory: [
      { stage: "Prospecting", date: "2026-08-15" },
      { stage: "Qualification", date: "2026-08-30" },
      { stage: "Proposal", date: "2026-09-15" },
      { stage: "Negotiation", date: "2026-10-01" }
    ]
  },
  {
    id: "OPP-3003",
    name: "Infosys Cloud Security Compliance Suite",
    customerId: "CUST-1003",
    customerName: "Infosys Cloud Dynamics",
    dealValue: 880000,
    stage: "Closed Won",
    winProbability: 100,
    expectedCloseDate: "2026-10-05",
    ownerId: "usr_103",
    ownerName: "Priya Sundaram",
    contactPerson: "Aditya Verma",
    leadSource: "Referral",
    notes: "Contract signed! Onboarding scheduled for next Monday.",
    wonLostReason: "Superior API flexibility and dedicated support SLA.",
    stageHistory: [
      { stage: "Prospecting", date: "2026-08-01" },
      { stage: "Proposal", date: "2026-09-01" },
      { stage: "Negotiation", date: "2026-09-20" },
      { stage: "Closed Won", date: "2026-10-05" }
    ]
  },
  {
    id: "OPP-3004",
    name: "Reliance Fleet Tracking Upgrade",
    customerId: "CUST-1004",
    customerName: "Reliance Digital Logistics",
    dealValue: 650000,
    stage: "Closed Lost",
    winProbability: 0,
    expectedCloseDate: "2026-09-30",
    ownerId: "usr_104",
    ownerName: "Rohan Mehta",
    contactPerson: "Mukesh Patel",
    leadSource: "Cold Call",
    notes: "Client chose competitor due to existing legacy hardware lock-in.",
    wonLostReason: "Competitor legacy hardware integration requirement.",
    stageHistory: [
      { stage: "Prospecting", date: "2026-07-10" },
      { stage: "Qualification", date: "2026-08-01" },
      { stage: "Closed Lost", date: "2026-09-30" }
    ]
  },
  {
    id: "OPP-3005",
    name: "Network18 Digital Analytics Suite",
    customerId: "CUST-1005",
    customerName: "Network18 Media India",
    dealValue: 520000,
    stage: "Qualification",
    winProbability: 40,
    expectedCloseDate: "2026-11-15",
    ownerId: "usr_102",
    ownerName: "Vikramaditya Rao",
    contactPerson: "Sanya Malhotra",
    leadSource: "Inbound Call",
    notes: "Evaluating feature list against competitors.",
    stageHistory: [
      { stage: "Prospecting", date: "2026-09-28" },
      { stage: "Qualification", date: "2026-10-04" }
    ]
  }
];

export const initialFollowUps = [
  {
    id: "FLW-4001",
    title: "Contract Review & Pricing Sign-Off Call",
    entityType: "Opportunity",
    entityId: "OPP-3002",
    entityName: "Apollo Health Care Systems",
    assignedToId: "usr_104",
    assignedToName: "Rohan Mehta",
    type: "Call",
    priority: "High",
    status: "Upcoming",
    dueDate: "2026-10-10",
    dueTime: "14:00",
    notes: "Review compliance clause 4.2 with Dr. Ananya Reddy before final sign-off."
  },
  {
    id: "FLW-4002",
    title: "Send Revised Technical Architecture Specs",
    entityType: "Lead",
    entityId: "LEAD-2001",
    entityName: "Wipro Cloud Systems",
    assignedToId: "usr_103",
    assignedToName: "Priya Sundaram",
    type: "Email",
    priority: "Medium",
    status: "Overdue",
    dueDate: "2026-10-07",
    dueTime: "10:30",
    notes: "Include high-availability failover topology diagrams."
  },
  {
    id: "FLW-4003",
    title: "Onboarding Kickoff Meeting",
    entityType: "Customer",
    entityId: "CUST-1003",
    entityName: "Infosys Cloud Dynamics",
    assignedToId: "usr_103",
    assignedToName: "Priya Sundaram",
    type: "Meeting",
    priority: "High",
    status: "Upcoming",
    dueDate: "2026-10-12",
    dueTime: "11:00",
    notes: "Introduce Customer Success Manager and review milestone timeline."
  },
  {
    id: "FLW-4004",
    title: "Quarterly Account Health Check",
    entityType: "Customer",
    entityId: "CUST-1001",
    entityName: "Tata Enterprise Technologies",
    assignedToId: "usr_102",
    assignedToName: "Vikramaditya Rao",
    type: "Meeting",
    priority: "Medium",
    status: "Completed",
    dueDate: "2026-10-02",
    dueTime: "15:00",
    notes: "Client confirmed 99.99% satisfaction with current deployment."
  },
  {
    id: "FLW-4005",
    title: "Follow up on Unqualified Lead Feedback",
    entityType: "Lead",
    entityId: "LEAD-2004",
    entityName: "HDFC Digital Financial",
    assignedToId: "usr_104",
    assignedToName: "Rohan Mehta",
    type: "Call",
    priority: "Low",
    status: "Missed",
    dueDate: "2026-10-06",
    dueTime: "09:00",
    notes: "Check if budget cycle reopens in Q1."
  }
];

export const initialActivities = [
  {
    id: "ACT-5001",
    type: "Call",
    title: "Discovery Call with VP of Infra",
    entityName: "Wipro Cloud Systems",
    performedByName: "Priya Sundaram",
    dateTime: "2026-10-06T14:30:00Z",
    duration: "35 mins",
    notes: "Discussed multi-region server requirements. Client expressed urgency.",
    status: "Completed"
  },
  {
    id: "ACT-5002",
    type: "Meeting",
    title: "Product Demo & Custom Integration Review",
    entityName: "Flipkart Supply Chain",
    performedByName: "Priya Sundaram",
    dateTime: "2026-10-05T11:00:00Z",
    duration: "60 mins",
    notes: "Demonstrated POS system synchronization and real-time inventory hooks.",
    status: "Completed"
  },
  {
    id: "ACT-5003",
    type: "Email",
    title: "Sent Security Audit Brief & SOC2 Type II Report",
    entityName: "Apollo Health Care Systems",
    performedByName: "Rohan Mehta",
    dateTime: "2026-10-04T09:15:00Z",
    duration: "5 mins",
    notes: "Sent attached PDF report for legal compliance review.",
    status: "Completed"
  },
  {
    id: "ACT-5004",
    type: "Task",
    title: "Prepare Financial ROI Summary Deck",
    entityName: "TCS AI Labs",
    performedByName: "Vikramaditya Rao",
    dateTime: "2026-10-07T16:00:00Z",
    duration: "45 mins",
    notes: "Calculated 3-year TCO savings based on automated lead routing.",
    status: "Completed"
  }
];

export const initialAuditLogs = [
  {
    id: "AUD-9001",
    action: "LEAD_CONVERTED",
    entity: "Lead: LEAD-2003 (Flipkart Supply Chain)",
    performedBy: "Priya Sundaram",
    userEmail: "priya.sundaram@acxiomcrm.com",
    timestamp: "2026-10-08T11:20:00Z",
    ipAddress: "192.168.1.104",
    details: "Converted lead to active Customer CUST-1006 and created Opportunity OPP-3006."
  },
  {
    id: "AUD-9002",
    action: "OPPORTUNITY_STAGE_CHANGED",
    entity: "Opportunity: OPP-3001 (Wipro Enterprise Platform)",
    performedBy: "Priya Sundaram",
    userEmail: "priya.sundaram@acxiomcrm.com",
    timestamp: "2026-10-08T09:45:00Z",
    ipAddress: "192.168.1.104",
    details: "Moved stage from Qualification to Proposal (₹14,50,000)."
  },
  {
    id: "AUD-9003",
    action: "USER_PERMISSIONS_UPDATED",
    entity: "Role: Sales Rep",
    performedBy: "Ananya Sharma",
    userEmail: "ananya.sharma@acxiomcrm.com",
    timestamp: "2026-10-07T15:30:00Z",
    ipAddress: "192.168.1.101",
    details: "Granted permission to convert leads directly."
  },
  {
    id: "AUD-9004",
    action: "USER_LOGIN",
    entity: "Authentication",
    performedBy: "Vikramaditya Rao",
    userEmail: "vikramaditya.rao@acxiomcrm.com",
    timestamp: "2026-10-08T08:05:00Z",
    ipAddress: "192.168.1.102",
    details: "Successful login via Web Portal."
  }
];
