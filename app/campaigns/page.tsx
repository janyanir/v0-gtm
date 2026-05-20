"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { campaigns, projects } from "@/lib/mock-data";

export default function CampaignsPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Sidebar />
      <div className="ml-64">
        <div className="border-b border-slate-700 bg-slate-800 px-6 py-4">
          <h1 className="text-2xl font-semibold text-white">Campaigns</h1>
          <p className="mt-1 text-sm text-slate-400">
            View all your outreach campaigns
          </p>
        </div>
        <main className="p-6">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-lg border border-slate-700 bg-slate-800">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700 hover:bg-slate-700/50">
                    <TableHead className="text-slate-300">Campaign Name</TableHead>
                    <TableHead className="text-slate-300">Type</TableHead>
                    <TableHead className="text-slate-300">Project</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => {
                    const project = projects.find(
                      (p) => p.id === campaign.projectId
                    );
                    return (
                      <TableRow
                        key={campaign.id}
                        className="border-slate-700 hover:bg-slate-700/50"
                      >
                        <TableCell className="font-medium text-white">
                          {campaign.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              campaign.type === "linkedin"
                                ? "bg-indigo-500/20 text-indigo-300"
                                : "bg-emerald-500/20 text-emerald-300"
                            }
                          >
                            {campaign.type === "linkedin" ? "LinkedIn" : "Email"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {project?.name || "-"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-green-500/50 text-green-400"
                          >
                            Active
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
