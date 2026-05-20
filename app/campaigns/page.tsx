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
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="ml-64">
        <div className="border-b border-slate-200 bg-white px-6 py-4">
          <h1 className="text-2xl font-semibold text-slate-900">Campaigns</h1>
          <p className="mt-1 text-sm text-slate-500">
            View all your outreach campaigns
          </p>
        </div>
        <main className="p-6">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-lg border border-slate-200 bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200 hover:bg-slate-50">
                    <TableHead className="text-slate-600">Campaign Name</TableHead>
                    <TableHead className="text-slate-600">Type</TableHead>
                    <TableHead className="text-slate-600">Project</TableHead>
                    <TableHead className="text-slate-600">Status</TableHead>
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
                        className="border-slate-200 hover:bg-slate-50"
                      >
                        <TableCell className="font-medium text-slate-900">
                          {campaign.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              campaign.type === "linkedin"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-emerald-100 text-emerald-700"
                            }
                          >
                            {campaign.type === "linkedin" ? "LinkedIn" : "Email"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {project?.name || "-"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-green-300 text-green-700"
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
