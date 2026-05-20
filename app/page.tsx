"use client";

import { useState, useMemo, useEffect } from "react";
import { subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/top-bar";
import { DemoBanner } from "@/components/dashboard/demo-banner";
import { LinkedInSection } from "@/components/dashboard/linkedin-section";
import { EmailSection } from "@/components/dashboard/email-section";
import { LinkedInRepliesDrawer } from "@/components/dashboard/linkedin-replies-drawer";
import { EmailRepliesDrawer } from "@/components/dashboard/email-replies-drawer";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"consolidated" | "project">(
    "consolidated"
  );
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d" | "custom">(
    "30d"
  );
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>(
    undefined
  );
  const [linkedInDrawerOpen, setLinkedInDrawerOpen] = useState(false);
  const [emailDrawerOpen, setEmailDrawerOpen] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const computedDateRange = useMemo(() => {
    const end = new Date();
    let start: Date;

    switch (dateRange) {
      case "7d":
        start = subDays(end, 7);
        break;
      case "30d":
        start = subDays(end, 30);
        break;
      case "90d":
        start = subDays(end, 90);
        break;
      case "custom":
        start = customDateRange?.from || subDays(end, 30);
        return {
          start,
          end: customDateRange?.to || end,
        };
      default:
        start = subDays(end, 30);
    }

    return { start, end };
  }, [dateRange, customDateRange]);

  return (
    <div className="min-h-screen bg-slate-900">
      <Sidebar />
      <div className="ml-64">
        <DemoBanner />
        <TopBar
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          dateRange={dateRange}
          setDateRange={setDateRange}
          customDateRange={customDateRange}
          setCustomDateRange={setCustomDateRange}
        />
        <main className="p-6">
          <div className="mx-auto max-w-7xl space-y-8">
            <LinkedInSection
              projectId={selectedProject}
              dateRange={computedDateRange}
              onViewReplies={() => setLinkedInDrawerOpen(true)}
              isLoading={isLoading}
            />
            <EmailSection
              projectId={selectedProject}
              dateRange={computedDateRange}
              onViewReplies={() => setEmailDrawerOpen(true)}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>

      {/* Reply Drawers */}
      <LinkedInRepliesDrawer
        open={linkedInDrawerOpen}
        onOpenChange={setLinkedInDrawerOpen}
        projectId={selectedProject}
      />
      <EmailRepliesDrawer
        open={emailDrawerOpen}
        onOpenChange={setEmailDrawerOpen}
        projectId={selectedProject}
      />
    </div>
  );
}
