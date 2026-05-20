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
    <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800 px-6 py-4">
      <div className="flex items-center gap-4">
        {/* View Toggle */}
        <div className="flex rounded-lg bg-slate-700 p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setViewMode("consolidated");
              setSelectedProject(null);
            }}
            className={
              viewMode === "consolidated"
                ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white"
                : "text-slate-300 hover:bg-slate-600 hover:text-white"
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
                ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white"
                : "text-slate-300 hover:bg-slate-600 hover:text-white"
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
            <SelectTrigger className="w-[220px] border-slate-600 bg-slate-700 text-white">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent className="border-slate-600 bg-slate-700">
              {projects.map((project) => (
                <SelectItem
                  key={project.id}
                  value={project.id}
                  className="text-white focus:bg-slate-600 focus:text-white"
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
        <div className="flex rounded-lg bg-slate-700 p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDateRange("7d")}
            className={
              dateRange === "7d"
                ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white"
                : "text-slate-300 hover:bg-slate-600 hover:text-white"
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
                ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white"
                : "text-slate-300 hover:bg-slate-600 hover:text-white"
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
                ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white"
                : "text-slate-300 hover:bg-slate-600 hover:text-white"
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
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white"
                    : "text-slate-300 hover:bg-slate-600 hover:text-white"
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
              className="w-auto border-slate-600 bg-slate-700 p-0"
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
                className="text-white"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
