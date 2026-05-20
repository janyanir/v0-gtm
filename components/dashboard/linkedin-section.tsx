"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "./metric-card";
import {
  getFilteredLinkedInMetrics,
  aggregateLinkedInMetricsByDate,
} from "@/lib/mock-data";
import { useConnectionState } from "@/lib/connection-store";
import { format } from "date-fns";

interface LinkedInSectionProps {
  projectId: string | null;
  dateRange: { start: Date; end: Date };
  onViewReplies: () => void;
  isLoading?: boolean;
}

export function LinkedInSection({
  projectId,
  dateRange,
  onViewReplies,
  isLoading = false,
}: LinkedInSectionProps) {
  const { state } = useConnectionState();
  const isConnected = state.heyReach.status === "connected";

  const metrics = useMemo(() => {
    return getFilteredLinkedInMetrics(projectId, dateRange);
  }, [projectId, dateRange]);

  const aggregatedData = useMemo(() => {
    const data = aggregateLinkedInMetricsByDate(metrics);
    // Limit to reasonable number of data points for chart
    if (data.length > 30) {
      const step = Math.ceil(data.length / 30);
      return data.filter((_, i) => i % step === 0);
    }
    return data;
  }, [metrics]);

  const totals = useMemo(() => {
    return metrics.reduce(
      (acc, m) => ({
        invitesSent: acc.invitesSent + m.invitesSent,
        invitesAccepted: acc.invitesAccepted + m.invitesAccepted,
        repliesReceived: acc.repliesReceived + m.repliesReceived,
      }),
      { invitesSent: 0, invitesAccepted: 0, repliesReceived: 0 }
    );
  }, [metrics]);

  const acceptRate =
    totals.invitesSent > 0
      ? ((totals.invitesAccepted / totals.invitesSent) * 100).toFixed(1)
      : "0";

  const replyRate =
    totals.invitesAccepted > 0
      ? ((totals.repliesReceived / totals.invitesAccepted) * 100).toFixed(1)
      : "0";

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-slate-900">LinkedIn Outreach</h2>
        {isConnected ? (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            HeyReach Connected
          </Badge>
        ) : (
          <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-700">
            Demo Data
          </Badge>
        )}
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Connection Invites Sent"
          value={totals.invitesSent.toLocaleString()}
          colorClass="text-blue-600"
          isLoading={isLoading}
        />
        <MetricCard
          title="Invites Accepted"
          value={totals.invitesAccepted.toLocaleString()}
          subtitle={`${acceptRate}% of sent`}
          colorClass="text-emerald-600"
          isLoading={isLoading}
        />
        <MetricCard
          title="Replies Received"
          value={totals.repliesReceived.toLocaleString()}
          subtitle={`${replyRate}% of accepted`}
          colorClass="text-amber-600"
          onViewReplies={onViewReplies}
          isLoading={isLoading}
        />
      </div>

      {/* Chart */}
      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-slate-500">
            LinkedIn Activity Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full bg-slate-200" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aggregatedData}>
                <XAxis
                  dataKey="date"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickFormatter={(value) => format(new Date(value), "MMM d")}
                />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    color: "#1e293b",
                  }}
                  labelFormatter={(value) =>
                    format(new Date(value), "MMM d, yyyy")
                  }
                />
                <Legend />
                <Bar
                  dataKey="invitesSent"
                  name="Invites Sent"
                  fill="#2563eb"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="invitesAccepted"
                  name="Accepted"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="repliesReceived"
                  name="Replies"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
