"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  colorClass?: string;
  onViewReplies?: () => void;
  isLoading?: boolean;
}

export function MetricCard({
  title,
  value,
  subtitle,
  colorClass = "text-white",
  onViewReplies,
  isLoading = false,
}: MetricCardProps) {
  if (isLoading) {
    return (
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader className="pb-2">
          <Skeleton className="h-4 w-32 bg-slate-700" />
        </CardHeader>
        <CardContent>
          <Skeleton className="mb-2 h-8 w-20 bg-slate-700" />
          <Skeleton className="h-4 w-24 bg-slate-700" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-700 bg-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn("text-3xl font-bold", colorClass)}>{value}</div>
        {subtitle && (
          <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
        )}
        {onViewReplies && (
          <Button
            variant="outline"
            size="sm"
            className="mt-3 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            onClick={onViewReplies}
          >
            View Replies
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
