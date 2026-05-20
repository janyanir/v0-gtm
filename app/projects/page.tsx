"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects, campaigns, projectUpdates, ProjectUpdate } from "@/lib/mock-data";
import { format } from "date-fns";
import { FileSpreadsheet, PenLine, Flag, MessageSquare, Calendar, Lightbulb } from "lucide-react";

function getUpdateIcon(type: ProjectUpdate["type"]) {
  switch (type) {
    case "milestone":
      return <Flag className="h-4 w-4 text-blue-600" />;
    case "note":
      return <Lightbulb className="h-4 w-4 text-amber-600" />;
    case "meeting":
      return <Calendar className="h-4 w-4 text-purple-600" />;
    case "decision":
      return <MessageSquare className="h-4 w-4 text-emerald-600" />;
  }
}

function getUpdateTypeBadge(type: ProjectUpdate["type"]) {
  const styles = {
    milestone: "bg-blue-100 text-blue-700",
    note: "bg-amber-100 text-amber-700",
    meeting: "bg-purple-100 text-purple-700",
    decision: "bg-emerald-100 text-emerald-700",
  };
  return (
    <Badge variant="secondary" className={styles[type]}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>
  );
}

function getSourceBadge(source: ProjectUpdate["source"]) {
  if (source === "google_sheets") {
    return (
      <Badge variant="outline" className="border-green-300 text-green-700 gap-1">
        <FileSpreadsheet className="h-3 w-3" />
        Google Sheets
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="border-slate-300 text-slate-600 gap-1">
      <PenLine className="h-3 w-3" />
      Manual
    </Badge>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="ml-64">
        <div className="border-b border-slate-200 bg-white px-6 py-4">
          <h1 className="text-2xl font-semibold text-slate-900">Projects</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your GTM projects, campaigns, and updates
          </p>
        </div>
        <main className="p-6">
          <div className="mx-auto max-w-5xl space-y-8">
            {projects.map((project) => {
              const projectCampaigns = campaigns.filter(
                (c) => c.projectId === project.id
              );
              const linkedInCampaigns = projectCampaigns.filter(
                (c) => c.type === "linkedin"
              );
              const emailCampaigns = projectCampaigns.filter(
                (c) => c.type === "email"
              );
              const updates = projectUpdates
                .filter((u) => u.projectId === project.id)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

              return (
                <Card key={project.id} className="border-slate-200 bg-white">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-slate-900">{project.name}</CardTitle>
                      <div className="flex gap-2">
                        {project.keywords.map((keyword) => (
                          <Badge
                            key={keyword}
                            variant="secondary"
                            className="bg-slate-100 text-slate-600"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Campaigns Section */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-600">
                          <div className="h-2 w-2 rounded-full bg-blue-600" />
                          LinkedIn Campaigns ({linkedInCampaigns.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {linkedInCampaigns.map((campaign) => (
                            <Badge
                              key={campaign.id}
                              variant="outline"
                              className="border-blue-300 bg-white text-blue-700"
                            >
                              {campaign.name}
                            </Badge>
                          ))}
                          {linkedInCampaigns.length === 0 && (
                            <span className="text-sm text-slate-400">No campaigns</span>
                          )}
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                          <div className="h-2 w-2 rounded-full bg-emerald-600" />
                          Email Campaigns ({emailCampaigns.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {emailCampaigns.map((campaign) => (
                            <Badge
                              key={campaign.id}
                              variant="outline"
                              className="border-emerald-300 bg-white text-emerald-700"
                            >
                              {campaign.name}
                            </Badge>
                          ))}
                          {emailCampaigns.length === 0 && (
                            <span className="text-sm text-slate-400">No campaigns</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Updates Section */}
                    <div className="border-t border-slate-200 pt-6">
                      <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <FileSpreadsheet className="h-4 w-4" />
                        Project Updates
                        <span className="ml-2 text-xs font-normal text-slate-500">
                          (synced from Google Sheets or entered manually)
                        </span>
                      </h4>
                      <div className="space-y-3">
                        {updates.map((update) => (
                          <div
                            key={update.id}
                            className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:bg-slate-50"
                          >
                            <div className="mt-0.5">
                              {getUpdateIcon(update.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-medium text-slate-900">
                                  {update.title}
                                </span>
                                {getUpdateTypeBadge(update.type)}
                                {getSourceBadge(update.source)}
                              </div>
                              <p className="mt-1 text-sm text-slate-600">
                                {update.description}
                              </p>
                              <p className="mt-2 text-xs text-slate-400">
                                {format(new Date(update.date), "MMM d, yyyy")}
                              </p>
                            </div>
                          </div>
                        ))}
                        {updates.length === 0 && (
                          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                            <FileSpreadsheet className="mx-auto h-8 w-8 text-slate-400" />
                            <p className="mt-2 text-sm text-slate-500">
                              No updates yet. Connect Google Sheets or add updates manually.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
