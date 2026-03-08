// ============================================================
// SITE CONFIGURATION — Harvin Properties
// ============================================================

const SITE_CONFIG = {
  name: "Harvin Properties",
  brandShort: "Harvin",
  brandAccent: "Properties",
  tagline: "Your Home, Our Priority",
  description: "Harvin Properties connects tenants, landlords, and managers on one trusted platform.",
  heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=80",
  year: new Date().getFullYear(),
};

// ============================================================
// USER TYPE CONFIGURATIONS
// ============================================================

const USER_TYPES = {
  tenant: {
    id: "tenant",
    label: "Tenant",
    icon: "🏠",
    accent: "#0EA5E9",
    description: "Find and manage your rental home",
    loginFields: [
      { id: "email", type: "email", label: "Email Address", placeholder: "you@email.com", required: true },
      { id: "password", type: "password", label: "Password", placeholder: "••••••••", required: true },
    ],
    registerFields: [
      { id: "firstName", type: "text", label: "First Name", placeholder: "Jane", required: true },
      { id: "lastName", type: "text", label: "Last Name", placeholder: "Doe", required: true },
      { id: "email", type: "email", label: "Email Address", placeholder: "you@email.com", required: true },
      { id: "phone", type: "tel", label: "Phone Number", placeholder: "+1 (555) 000-0000", required: true },
      { id: "currentAddress", type: "text", label: "Current Address", placeholder: "123 Main St, City, State", required: false },
      { id: "moveInDate", type: "date", label: "Desired Move-In Date", placeholder: "", required: false },
      { id: "password", type: "password", label: "Password", placeholder: "Create a strong password", required: true },
      { id: "confirmPassword", type: "password", label: "Confirm Password", placeholder: "Repeat your password", required: true },
    ],
  },

  landlord: {
    id: "landlord",
    label: "Landlord",
    icon: "🏢",
    accent: "#F59E0B",
    description: "List and oversee your properties",
    loginFields: [
      { id: "email", type: "email", label: "Email Address", placeholder: "owner@email.com", required: true },
      { id: "password", type: "password", label: "Password", placeholder: "••••••••", required: true },
    ],
    registerFields: [
      { id: "firstName", type: "text", label: "First Name", placeholder: "John", required: true },
      { id: "lastName", type: "text", label: "Last Name", placeholder: "Smith", required: true },
      { id: "email", type: "email", label: "Email Address", placeholder: "owner@email.com", required: true },
      { id: "phone", type: "tel", label: "Phone Number", placeholder: "+1 (555) 000-0000", required: true },
      { id: "companyName", type: "text", label: "Company / Trade Name", placeholder: "Smith Properties LLC", required: false },
      { id: "taxId", type: "text", label: "Tax ID / EIN", placeholder: "XX-XXXXXXX", required: false },
      { id: "propertyCount", type: "number", label: "Number of Properties", placeholder: "e.g. 5", required: true },
      { id: "password", type: "password", label: "Password", placeholder: "Create a strong password", required: true },
      { id: "confirmPassword", type: "password", label: "Confirm Password", placeholder: "Repeat your password", required: true },
    ],
  },

  manager: {
    id: "manager",
    label: "Property Manager",
    icon: "📋",
    accent: "#10B981",
    description: "Manage portfolios on behalf of owners",
    loginFields: [
      { id: "email", type: "email", label: "Work Email", placeholder: "manager@firm.com", required: true },
      { id: "licenseId", type: "text", label: "License / Employee ID", placeholder: "PM-000000", required: true },
      { id: "password", type: "password", label: "Password", placeholder: "••••••••", required: true },
    ],
    registerFields: [
      { id: "firstName", type: "text", label: "First Name", placeholder: "Alex", required: true },
      { id: "lastName", type: "text", label: "Last Name", placeholder: "Johnson", required: true },
      { id: "email", type: "email", label: "Work Email", placeholder: "manager@firm.com", required: true },
      { id: "phone", type: "tel", label: "Phone Number", placeholder: "+1 (555) 000-0000", required: true },
      { id: "firmName", type: "text", label: "Management Firm Name", placeholder: "Premier Property Group", required: true },
      { id: "licenseId", type: "text", label: "Property Manager License #", placeholder: "PM-000000", required: true },
      { id: "licenseState", type: "text", label: "Licensed State / Region", placeholder: "California", required: true },
      { id: "portfolioSize", type: "number", label: "Units Under Management", placeholder: "e.g. 200", required: false },
      { id: "password", type: "password", label: "Password", placeholder: "Create a strong password", required: true },
      { id: "confirmPassword", type: "password", label: "Confirm Password", placeholder: "Repeat your password", required: true },
    ],
  },
};

// ============================================================
// TEAM MEMBERS — 3 members only
// ============================================================

const TEAM_MEMBERS = [
  {
    name: "Vinutha Narayan",
    role: "CEO & Co-Founder",
    bio: "A seasoned real estate professional and licensed RE/MAX agent with deep roots in the Pacific Northwest. Vinutha founded Harvin Properties to bring transparency, technology, and trust to every lease.",
    avatar: "VN",
    photo: "images/vinutha.png",
    accentColor: "#0EA5E9",
    linkedin: "https://www.remax-integrity.com/agents/1964848/Vinutha+Narayana",
    twitter: "#",
  },
  {
    name: "Santosh",
    role: "CTO & Co-Founder",
    bio: "Full-stack architect with a passion for scalable systems. Santosh leads the technology vision behind Harvin Properties' platform.",
    avatar: "S",
    photo: null,
    accentColor: "#F59E0B",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Disha",
    role: "Head of Product",
    bio: "UX obsessive and product strategist. Disha's mission is to make complex property workflows feel effortless for everyone on the platform.",
    avatar: "D",
    photo: null,
    accentColor: "#EF4444",
    linkedin: "#",
    twitter: "#",
  },
];

// ============================================================
// FOOTER CONFIG
// ============================================================

const FOOTER_CONFIG = {
  columns: [
    {
      title: "Platform",
      links: ["Features", "Pricing", "Security", "Integrations", "API Docs"],
    },
    {
      title: "For Tenants",
      links: ["Find a Home", "Pay Rent Online", "Maintenance Requests", "Lease Management", "Renter Resources"],
    },
    {
      title: "For Owners",
      links: ["List a Property", "Owner Dashboard", "Financial Reports", "Tenant Screening", "Landlord Guide"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Blog", "Contact"],
    },
  ],
  social: [
    { name: "Twitter", icon: "𝕏", url: "#" },
    { name: "LinkedIn", icon: "in", url: "#" },
    { name: "Instagram", icon: "◈", url: "#" },
  ],
  legalLinks: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"],
};
