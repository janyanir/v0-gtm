"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { projects } from "@/lib/mock-data";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

interface TopBarProps {
  viewMode: "consolidated" | "project";
  setViewMode: (mode: "consolidated" | "project") => void;
  selectedProject: string | null;
  setSelectedProject: (projectId: string | null) => void;
  dateRange: "7d" | "30d" | "90d" | "custom";
  setDateRange: (range: "7d" | "30d" | "90d" | "custom") => void;
  customDateRange: DateRange | undefined;
  setCustomDateRange: (range: DateRange | undefined) => void;
}

export function TopBar({
  viewMode,
  setViewMode,
  selectedProject,
  setSelectedProject,
  dateRange,
  setDateRange,
  customDateRange,
  setCustomDateRange,
}: TopBarProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div className="flex items-center gap-4">
        {/* View Toggle */}
        <div className="flex rounded-lg bg-slate-100 p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setViewMode("consolidated");
              setSelectedProject(null);
            }}
            className={
              viewMode === "consolidated"
                ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }
          >
            Consolidated View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("project")}
            className={
              viewMode === "project"
                ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }
          >
            Project View
          </Button>
        </div>

        {/* Project Selector (only in project view) */}
        {viewMode === "project" && (
          <Select
            value={selectedProject || ""}
            onValueChange={(value) => setSelectedProject(value || null)}
          >
            <SelectTrigger className="w-[220px] border-slate-300 bg-white text-slate-900">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent className="border-slate-200 bg-white">
              {projects.map((project) => (
                <SelectItem
                  key={project.id}
                  value={project.id}
                  className="text-slate-900 focus:bg-slate-100 focus:text-slate-900"
                >
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Date Picker */}
      <div className="flex items-center gap-2">
        <div className="flex rounded-lg bg-slate-100 p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDateRange("7d")}
            className={
              dateRange === "7d"
                ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }
          >
            Last 7D
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDateRange("30d")}
            className={
              dateRange === "30d"
                ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }
          >
            Last 30D
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDateRange("90d")}
            className={
              dateRange === "90d"
                ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }
          >
            Last 90D
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={
                  dateRange === "custom"
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                    : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }
              >
                <Calendar className="mr-2 h-4 w-4" />
                {dateRange === "custom" && customDateRange?.from
                  ? `${format(customDateRange.from, "MMM d")} - ${
                      customDateRange.to
                        ? format(customDateRange.to, "MMM d")
                        : "..."
                    }`
                  : "Custom"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto border-slate-200 bg-white p-0"
              align="end"
            >
              <CalendarComponent
                mode="range"
                selected={customDateRange}
                onSelect={(range) => {
                  setCustomDateRange(range);
                  if (range?.from && range?.to) {
                    setDateRange("custom");
                  }
                }}
                numberOfMonths={2}
                className="text-slate-900"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
