"use client";

import { useState } from "react";
import { Search } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { linkedInReplies, emailReplies } from "@/lib/mock-data";
import { format } from "date-fns";

export default function LeadsPage() {
  const [search, setSearch] = useState("");

  // Combine LinkedIn and Email leads with their source
  const allLeads = [
    ...linkedInReplies.map((r) => ({
      id: r.id,
      name: r.leadName,
      company: r.company,
      campaign: r.campaign,
      date: r.date,
      source: "linkedin" as const,
    })),
    ...emailReplies.map((r) => ({
      id: r.id,
      name: r.leadName,
      company: r.company,
      campaign: r.campaign,
      date: r.date,
      source: "email" as const,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Remove duplicates by name + company
  const uniqueLeads = allLeads.filter(
    (lead, index, self) =>
      index ===
      self.findIndex((l) => l.name === lead.name && l.company === lead.company)
  );

  const filteredLeads = search
    ? uniqueLeads.filter(
        (lead) =>
          lead.name.toLowerCase().includes(search.toLowerCase()) ||
          lead.company.toLowerCase().includes(search.toLowerCase()) ||
          lead.campaign.toLowerCase().includes(search.toLowerCase())
      )
    : uniqueLeads;

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="ml-64">
        <div className="border-b border-slate-200 bg-white px-6 py-4">
          <h1 className="text-2xl font-semibold text-slate-900">Leads</h1>
          <p className="mt-1 text-sm text-slate-500">
            View leads who have responded to your campaigns
          </p>
        </div>
        <main className="p-6">
          <div className="mx-auto max-w-5xl space-y-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-slate-300 bg-white pl-10 text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div className="rounded-lg border border-slate-200 bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200 hover:bg-slate-50">
                    <TableHead className="text-slate-600">Name</TableHead>
                    <TableHead className="text-slate-600">Company</TableHead>
                    <TableHead className="text-slate-600">Campaign</TableHead>
                    <TableHead className="text-slate-600">Source</TableHead>
                    <TableHead className="text-slate-600">Last Activity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="py-12 text-center text-slate-500"
                      >
                        {search ? "No leads found matching your search" : "No leads yet"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead) => (
                      <TableRow
                        key={lead.id}
                        className="border-slate-200 hover:bg-slate-50"
                      >
                        <TableCell className="font-medium text-slate-900">
                          {lead.name}
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {lead.company}
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {lead.campaign}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              lead.source === "linkedin"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-emerald-100 text-emerald-700"
                            }
                          >
                            {lead.source === "linkedin" ? "LinkedIn" : "Email"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-500">
                          {format(new Date(lead.date), "MMM d, yyyy")}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
