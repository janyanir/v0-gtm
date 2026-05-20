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
import { MetricCard } from "./metric-card";
import {
  getFilteredEmailMetrics,
  aggregateEmailMetricsByDate,
} from "@/lib/mock-data";
import { format } from "date-fns";

interface EmailSectionProps {
  projectId: string | null;
  dateRange: { start: Date; end: Date };
  onViewReplies: () => void;
  isLoading?: boolean;
}

export function EmailSection({
  projectId,
  dateRange,
  onViewReplies,
  isLoading = false,
}: EmailSectionProps) {
  const metrics = useMemo(() => {
    return getFilteredEmailMetrics(projectId, dateRange);
  }, [projectId, dateRange]);

  const aggregatedData = useMemo(() => {
    const data = aggregateEmailMetricsByDate(metrics);
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
        emailsSent: acc.emailsSent + m.emailsSent,
        repliesReceived: acc.repliesReceived + m.repliesReceived,
      }),
      { emailsSent: 0, repliesReceived: 0 }
    );
  }, [metrics]);

  const replyRate =
    totals.emailsSent > 0
      ? ((totals.repliesReceived / totals.emailsSent) * 100).toFixed(2)
      : "0";

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Email Outreach</h2>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <MetricCard
          title="Emails Sent"
          value={totals.emailsSent.toLocaleString()}
          colorClass="text-emerald-400"
          isLoading={isLoading}
        />
        <MetricCard
          title="Replies Received"
          value={totals.repliesReceived.toLocaleString()}
          subtitle={`${replyRate}% reply rate`}
          colorClass="text-teal-400"
          onViewReplies={onViewReplies}
          isLoading={isLoading}
        />
      </div>

      {/* Chart */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-slate-400">
            Email Activity Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full bg-slate-700" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aggregatedData}>
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  fontSize={12}
                  tickFormatter={(value) => format(new Date(value), "MMM d")}
                />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  labelFormatter={(value) =>
                    format(new Date(value), "MMM d, yyyy")
                  }
                />
                <Legend />
                <Bar
                  dataKey="emailsSent"
                  name="Emails Sent"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="repliesReceived"
                  name="Replies"
                  fill="#14b8a6"
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
