"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects, campaigns } from "@/lib/mock-data";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Sidebar />
      <div className="ml-64">
        <div className="border-b border-slate-700 bg-slate-800 px-6 py-4">
          <h1 className="text-2xl font-semibold text-white">Projects</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage your GTM projects and associated campaigns
          </p>
        </div>
        <main className="p-6">
          <div className="mx-auto max-w-4xl space-y-6">
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

              return (
                <Card key={project.id} className="border-slate-700 bg-slate-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{project.name}</CardTitle>
                      <div className="flex gap-2">
                        {project.keywords.map((keyword) => (
                          <Badge
                            key={keyword}
                            variant="secondary"
                            className="bg-slate-700 text-slate-300"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-2 text-sm font-medium text-indigo-400">
                          LinkedIn Campaigns ({linkedInCampaigns.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {linkedInCampaigns.map((campaign) => (
                            <Badge
                              key={campaign.id}
                              variant="outline"
                              className="border-indigo-500/50 text-indigo-300"
                            >
                              {campaign.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-2 text-sm font-medium text-emerald-400">
                          Email Campaigns ({emailCampaigns.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {emailCampaigns.map((campaign) => (
                            <Badge
                              key={campaign.id}
                              variant="outline"
                              className="border-emerald-500/50 text-emerald-300"
                            >
                              {campaign.name}
                            </Badge>
                          ))}
                        </div>
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
