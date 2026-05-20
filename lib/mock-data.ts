// Types
export interface Project {
  id: string;
  name: string;
  keywords: string[];
}

export interface Campaign {
  id: string;
  name: string;
  projectId: string;
  type: "linkedin" | "email";
}

export interface LinkedInMetrics {
  date: string;
  invitesSent: number;
  invitesAccepted: number;
  repliesReceived: number;
  campaignId: string;
}

export interface EmailMetrics {
  date: string;
  emailsSent: number;
  repliesReceived: number;
  campaignId: string;
}

export interface LinkedInReply {
  id: string;
  leadName: string;
  company: string;
  campaign: string;
  campaignId: string;
  date: string;
  messagePreview: string;
  fullMessage: string;
}

export interface EmailReply {
  id: string;
  leadName: string;
  company: string;
  campaign: string;
  campaignId: string;
  date: string;
  subject: string;
  messagePreview: string;
  fullMessage: string;
}

export interface ProjectUpdate {
  id: string;
  projectId: string;
  date: string;
  title: string;
  description: string;
  type: "milestone" | "note" | "meeting" | "decision";
  source: "google_sheets" | "manual";
}

// Mock Projects
export const projects: Project[] = [
  {
    id: "proj-1",
    name: "Enterprise SaaS Outreach",
    keywords: ["enterprise", "saas"],
  },
  {
    id: "proj-2",
    name: "Startup Growth Campaign",
    keywords: ["startup", "growth"],
  },
  {
    id: "proj-3",
    name: "Agency Partner Program",
    keywords: ["agency", "partner"],
  },
];

// Mock Campaigns
export const campaigns: Campaign[] = [
  // Enterprise SaaS Outreach campaigns
  {
    id: "camp-1",
    name: "Enterprise Decision Makers",
    projectId: "proj-1",
    type: "linkedin",
  },
  {
    id: "camp-2",
    name: "Enterprise Cold Email",
    projectId: "proj-1",
    type: "email",
  },
  // Startup Growth campaigns
  {
    id: "camp-3",
    name: "Startup Founders Connect",
    projectId: "proj-2",
    type: "linkedin",
  },
  {
    id: "camp-4",
    name: "Growth Startup Emails",
    projectId: "proj-2",
    type: "email",
  },
  {
    id: "camp-5",
    name: "Startup CTO Outreach",
    projectId: "proj-2",
    type: "linkedin",
  },
  // Agency Partner campaigns
  {
    id: "camp-6",
    name: "Agency Partners LinkedIn",
    projectId: "proj-3",
    type: "linkedin",
  },
  {
    id: "camp-7",
    name: "Agency Partner Emails",
    projectId: "proj-3",
    type: "email",
  },
];

// Generate dates for the last 90 days
function generateDates(days: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
}

// Generate LinkedIn metrics
function generateLinkedInMetrics(): LinkedInMetrics[] {
  const dates = generateDates(90);
  const linkedInCampaigns = campaigns.filter((c) => c.type === "linkedin");
  const metrics: LinkedInMetrics[] = [];

  for (const date of dates) {
    for (const campaign of linkedInCampaigns) {
      const invitesSent = Math.floor(Math.random() * 30) + 10;
      const acceptRate = 0.25 + Math.random() * 0.15;
      const replyRate = 0.15 + Math.random() * 0.1;
      metrics.push({
        date,
        invitesSent,
        invitesAccepted: Math.floor(invitesSent * acceptRate),
        repliesReceived: Math.floor(invitesSent * acceptRate * replyRate),
        campaignId: campaign.id,
      });
    }
  }
  return metrics;
}

// Generate Email metrics
function generateEmailMetrics(): EmailMetrics[] {
  const dates = generateDates(90);
  const emailCampaigns = campaigns.filter((c) => c.type === "email");
  const metrics: EmailMetrics[] = [];

  for (const date of dates) {
    for (const campaign of emailCampaigns) {
      const emailsSent = Math.floor(Math.random() * 100) + 50;
      const replyRate = 0.02 + Math.random() * 0.03;
      metrics.push({
        date,
        emailsSent,
        repliesReceived: Math.floor(emailsSent * replyRate),
        campaignId: campaign.id,
      });
    }
  }
  return metrics;
}

// Generate LinkedIn replies
function generateLinkedInReplies(): LinkedInReply[] {
  const replies: LinkedInReply[] = [];
  const names = [
    "Sarah Johnson",
    "Michael Chen",
    "Emily Williams",
    "James Brown",
    "Jessica Martinez",
    "David Lee",
    "Amanda Taylor",
    "Christopher Garcia",
    "Ashley Wilson",
    "Daniel Thompson",
    "Rachel Moore",
    "Kevin Anderson",
    "Lauren Thomas",
    "Ryan Jackson",
    "Megan White",
  ];
  const companies = [
    "TechCorp Inc",
    "Innovation Labs",
    "Digital Ventures",
    "CloudScale Systems",
    "DataDrive Analytics",
    "FutureTech Solutions",
    "Apex Consulting",
    "NextGen Software",
    "Prime Digital",
    "Quantum Dynamics",
  ];
  const messages = [
    {
      preview: "Thanks for reaching out! I'd be happy to...",
      full: "Thanks for reaching out! I'd be happy to learn more about your solution. We've been looking for ways to improve our outreach efficiency. Could you share some case studies from similar companies in our industry? I have about 30 minutes free next Tuesday if you'd like to set up a quick call.",
    },
    {
      preview: "Interesting timing - we were just discussing...",
      full: "Interesting timing - we were just discussing this exact challenge in our leadership meeting yesterday. Our current process is quite manual and we're definitely feeling the pain. I'd love to see a demo of how your platform handles the automation side. What does your calendar look like next week?",
    },
    {
      preview: "I appreciate the connection. Let me loop in...",
      full: "I appreciate the connection. Let me loop in our VP of Sales who handles these decisions. She's been evaluating several solutions in this space. I've forwarded your profile to her and she should reach out directly. In the meantime, do you have any documentation you can share?",
    },
    {
      preview: "Not a great time right now, but check back...",
      full: "Not a great time right now, but check back in Q2. We're in the middle of a major system migration and all new purchases are frozen until April. That said, I'm definitely interested and have bookmarked your company. Would it be okay to reach out when we're ready to evaluate?",
    },
    {
      preview: "This looks promising! We've struggled with...",
      full: "This looks promising! We've struggled with scaling our outbound efforts without sacrificing personalization. The AI-powered approach you mentioned is exactly what we need. Can you send over pricing details? Also, do you offer a pilot program for enterprise clients?",
    },
  ];

  const linkedInCampaigns = campaigns.filter((c) => c.type === "linkedin");

  for (let i = 0; i < 45; i++) {
    const campaign =
      linkedInCampaigns[Math.floor(Math.random() * linkedInCampaigns.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    replies.push({
      id: `li-reply-${i}`,
      leadName: names[Math.floor(Math.random() * names.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      campaign: campaign.name,
      campaignId: campaign.id,
      date: date.toISOString().split("T")[0],
      messagePreview: message.preview,
      fullMessage: message.full,
    });
  }

  return replies.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Generate Email replies
function generateEmailReplies(): EmailReply[] {
  const replies: EmailReply[] = [];
  const names = [
    "Robert Smith",
    "Jennifer Davis",
    "William Johnson",
    "Elizabeth Brown",
    "Thomas Wilson",
    "Patricia Moore",
    "Charles Taylor",
    "Margaret Anderson",
    "Joseph Thomas",
    "Barbara Jackson",
    "George Harris",
    "Susan Martin",
    "Edward Thompson",
    "Nancy Garcia",
    "Frank Martinez",
  ];
  const companies = [
    "Acme Corporation",
    "Global Industries",
    "Summit Enterprises",
    "Pioneer Tech",
    "Horizon Group",
    "Velocity Partners",
    "Atlas Solutions",
    "Evergreen Systems",
    "Pinnacle Inc",
    "Bridgewater Co",
  ];
  const subjects = [
    "Re: Quick question about your outreach platform",
    "Re: Streamlining your sales process",
    "Re: Partnership opportunity",
    "Re: Improving team productivity",
    "Re: Following up on our conversation",
  ];
  const messages = [
    {
      preview: "Hi, thanks for your email. We're currently...",
      full: "Hi, thanks for your email. We're currently evaluating solutions in this space and your timing is perfect. I've shared your email with our procurement team and they'll be reaching out to schedule a proper evaluation. In the meantime, could you send over your security documentation and SOC 2 compliance details?",
    },
    {
      preview: "I read through your case studies and I'm impressed...",
      full: "I read through your case studies and I'm impressed with the results you've achieved for similar companies. We're a 200-person sales org and currently doing everything manually. The ROI numbers you shared are compelling. Let's set up a call to discuss implementation timelines and what a pilot would look like.",
    },
    {
      preview: "Thanks for reaching out. I'm not the right person...",
      full: "Thanks for reaching out. I'm not the right person for this, but I've forwarded your email to our Head of Revenue Operations, Mark Stevens. He owns all of our sales tech stack decisions. Expect to hear from him within the next few days. Good luck!",
    },
    {
      preview: "Interesting proposal. We tried a similar tool last year...",
      full: "Interesting proposal. We tried a similar tool last year but had issues with deliverability and CRM integration. How does your platform handle those challenges? Also, what kind of onboarding support do you provide? We'd need hands-on help getting our 50+ reps up to speed.",
    },
    {
      preview: "Perfect timing! We're rebuilding our entire outbound...",
      full: "Perfect timing! We're rebuilding our entire outbound motion for 2024 and this is exactly what we need. I've already spoken with my CFO about budget. Can you send over a detailed proposal including pricing tiers and implementation costs? We're hoping to have something in place by end of Q1.",
    },
  ];

  const emailCampaigns = campaigns.filter((c) => c.type === "email");

  for (let i = 0; i < 35; i++) {
    const campaign =
      emailCampaigns[Math.floor(Math.random() * emailCampaigns.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    replies.push({
      id: `email-reply-${i}`,
      leadName: names[Math.floor(Math.random() * names.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      campaign: campaign.name,
      campaignId: campaign.id,
      date: date.toISOString().split("T")[0],
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      messagePreview: message.preview,
      fullMessage: message.full,
    });
  }

  return replies.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export const linkedInMetrics = generateLinkedInMetrics();
export const emailMetrics = generateEmailMetrics();
export const linkedInReplies = generateLinkedInReplies();
export const emailReplies = generateEmailReplies();

// Mock Project Updates
export const projectUpdates: ProjectUpdate[] = [
  // Enterprise SaaS Outreach updates
  {
    id: "update-1",
    projectId: "proj-1",
    date: "2026-05-18",
    title: "Q2 Target Accounts Finalized",
    description: "Finalized list of 150 enterprise accounts to target. Focus on Fortune 500 companies in tech and finance sectors.",
    type: "milestone",
    source: "google_sheets",
  },
  {
    id: "update-2",
    projectId: "proj-1",
    date: "2026-05-15",
    title: "Campaign Performance Review",
    description: "LinkedIn acceptance rate up 12% after messaging optimization. Email open rates steady at 45%.",
    type: "meeting",
    source: "manual",
  },
  {
    id: "update-3",
    projectId: "proj-1",
    date: "2026-05-10",
    title: "New ICP Criteria Added",
    description: "Added company size filter (500+ employees) and tech stack requirements to improve lead quality.",
    type: "decision",
    source: "google_sheets",
  },
  // Startup Growth Campaign updates
  {
    id: "update-4",
    projectId: "proj-2",
    date: "2026-05-19",
    title: "Series A/B Focus Shift",
    description: "Pivoting to target Series A and B startups exclusively. Seed-stage response rates too low.",
    type: "decision",
    source: "manual",
  },
  {
    id: "update-5",
    projectId: "proj-2",
    date: "2026-05-14",
    title: "New Messaging Templates",
    description: "Deployed 3 new LinkedIn message templates focusing on growth pain points. A/B testing in progress.",
    type: "note",
    source: "google_sheets",
  },
  {
    id: "update-6",
    projectId: "proj-2",
    date: "2026-05-08",
    title: "CTO Outreach Launch",
    description: "Launched dedicated CTO outreach campaign. Initial results showing 2x higher engagement than founder campaigns.",
    type: "milestone",
    source: "manual",
  },
  // Agency Partner Program updates
  {
    id: "update-7",
    projectId: "proj-3",
    date: "2026-05-17",
    title: "Partner Tier Structure Defined",
    description: "Established Gold, Silver, and Bronze partner tiers with corresponding benefits and requirements.",
    type: "milestone",
    source: "google_sheets",
  },
  {
    id: "update-8",
    projectId: "proj-3",
    date: "2026-05-12",
    title: "Agency Event Attendance",
    description: "Scheduled attendance at 3 agency networking events in June. Will collect leads for follow-up campaigns.",
    type: "meeting",
    source: "manual",
  },
  {
    id: "update-9",
    projectId: "proj-3",
    date: "2026-05-05",
    title: "Referral Program Launch",
    description: "Soft-launched referral incentive program with existing agency partners. 15% commission on referred deals.",
    type: "decision",
    source: "google_sheets",
  },
];

// Helper functions
export function getFilteredLinkedInMetrics(
  projectId: string | null,
  dateRange: { start: Date; end: Date }
): LinkedInMetrics[] {
  let filtered = linkedInMetrics;

  if (projectId) {
    const projectCampaignIds = campaigns
      .filter((c) => c.projectId === projectId && c.type === "linkedin")
      .map((c) => c.id);
    filtered = filtered.filter((m) => projectCampaignIds.includes(m.campaignId));
  }

  filtered = filtered.filter((m) => {
    const date = new Date(m.date);
    return date >= dateRange.start && date <= dateRange.end;
  });

  return filtered;
}

export function getFilteredEmailMetrics(
  projectId: string | null,
  dateRange: { start: Date; end: Date }
): EmailMetrics[] {
  let filtered = emailMetrics;

  if (projectId) {
    const projectCampaignIds = campaigns
      .filter((c) => c.projectId === projectId && c.type === "email")
      .map((c) => c.id);
    filtered = filtered.filter((m) => projectCampaignIds.includes(m.campaignId));
  }

  filtered = filtered.filter((m) => {
    const date = new Date(m.date);
    return date >= dateRange.start && date <= dateRange.end;
  });

  return filtered;
}

export function getFilteredLinkedInReplies(
  projectId: string | null
): LinkedInReply[] {
  if (!projectId) return linkedInReplies;

  const projectCampaignIds = campaigns
    .filter((c) => c.projectId === projectId && c.type === "linkedin")
    .map((c) => c.id);
  return linkedInReplies.filter((r) =>
    projectCampaignIds.includes(r.campaignId)
  );
}

export function getFilteredEmailReplies(projectId: string | null): EmailReply[] {
  if (!projectId) return emailReplies;

  const projectCampaignIds = campaigns
    .filter((c) => c.projectId === projectId && c.type === "email")
    .map((c) => c.id);
  return emailReplies.filter((r) => projectCampaignIds.includes(r.campaignId));
}

export function aggregateLinkedInMetricsByDate(
  metrics: LinkedInMetrics[]
): { date: string; invitesSent: number; invitesAccepted: number; repliesReceived: number }[] {
  const aggregated: Record<
    string,
    { invitesSent: number; invitesAccepted: number; repliesReceived: number }
  > = {};

  for (const m of metrics) {
    if (!aggregated[m.date]) {
      aggregated[m.date] = { invitesSent: 0, invitesAccepted: 0, repliesReceived: 0 };
    }
    aggregated[m.date].invitesSent += m.invitesSent;
    aggregated[m.date].invitesAccepted += m.invitesAccepted;
    aggregated[m.date].repliesReceived += m.repliesReceived;
  }

  return Object.entries(aggregated)
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function aggregateEmailMetricsByDate(
  metrics: EmailMetrics[]
): { date: string; emailsSent: number; repliesReceived: number }[] {
  const aggregated: Record<string, { emailsSent: number; repliesReceived: number }> = {};

  for (const m of metrics) {
    if (!aggregated[m.date]) {
      aggregated[m.date] = { emailsSent: 0, repliesReceived: 0 };
    }
    aggregated[m.date].emailsSent += m.emailsSent;
    aggregated[m.date].repliesReceived += m.repliesReceived;
  }

  return Object.entries(aggregated)
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
