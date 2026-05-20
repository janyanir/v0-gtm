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
    <div className="min-h-screen bg-slate-900">
      <Sidebar />
      <div className="ml-64">
        <div className="border-b border-slate-700 bg-slate-800 px-6 py-4">
          <h1 className="text-2xl font-semibold text-white">Leads</h1>
          <p className="mt-1 text-sm text-slate-400">
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
                className="border-slate-600 bg-slate-700 pl-10 text-white placeholder:text-slate-400"
              />
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700 hover:bg-slate-700/50">
                    <TableHead className="text-slate-300">Name</TableHead>
                    <TableHead className="text-slate-300">Company</TableHead>
                    <TableHead className="text-slate-300">Campaign</TableHead>
                    <TableHead className="text-slate-300">Source</TableHead>
                    <TableHead className="text-slate-300">Last Activity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="py-12 text-center text-slate-400"
                      >
                        {search ? "No leads found matching your search" : "No leads yet"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead) => (
                      <TableRow
                        key={lead.id}
                        className="border-slate-700 hover:bg-slate-700/50"
                      >
                        <TableCell className="font-medium text-white">
                          {lead.name}
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {lead.company}
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {lead.campaign}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              lead.source === "linkedin"
                                ? "bg-indigo-500/20 text-indigo-300"
                                : "bg-emerald-500/20 text-emerald-300"
                            }
                          >
                            {lead.source === "linkedin" ? "LinkedIn" : "Email"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-400">
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
