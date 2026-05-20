"use client";

import { useState, useMemo } from "react";
import { Search, Mail } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { getFilteredEmailReplies, EmailReply } from "@/lib/mock-data";
import { format } from "date-fns";

interface EmailRepliesDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string | null;
}

export function EmailRepliesDrawer({
  open,
  onOpenChange,
  projectId,
}: EmailRepliesDrawerProps) {
  const [search, setSearch] = useState("");
  const [selectedReply, setSelectedReply] = useState<EmailReply | null>(null);

  const replies = useMemo(() => {
    return getFilteredEmailReplies(projectId);
  }, [projectId]);

  const filteredReplies = useMemo(() => {
    if (!search) return replies;
    const lower = search.toLowerCase();
    return replies.filter(
      (r) =>
        r.leadName.toLowerCase().includes(lower) ||
        r.company.toLowerCase().includes(lower) ||
        r.campaign.toLowerCase().includes(lower) ||
        r.subject.toLowerCase().includes(lower) ||
        r.messagePreview.toLowerCase().includes(lower)
    );
  }, [replies, search]);

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full border-slate-200 bg-white sm:max-w-xl">
          <SheetHeader className="space-y-4">
            <SheetTitle className="text-slate-900">Email Replies</SheetTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search replies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-slate-300 bg-white pl-10 text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </SheetHeader>
          <ScrollArea className="mt-6 h-[calc(100vh-180px)]">
            {filteredReplies.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-slate-100 p-4">
                  <Mail className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-slate-900">
                  No replies found
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  {search
                    ? "Try adjusting your search"
                    : "No email replies yet"}
                </p>
              </div>
            ) : (
              <div className="space-y-2 pr-4">
                {filteredReplies.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => setSelectedReply(reply)}
                    className="w-full rounded-lg border border-slate-200 bg-white p-4 text-left transition-colors hover:border-emerald-400 hover:bg-slate-50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900">
                            {reply.leadName}
                          </span>
                          <span className="text-slate-400">·</span>
                          <span className="truncate text-sm text-slate-500">
                            {reply.company}
                          </span>
                        </div>
                        <p className="mt-1 truncate text-sm font-medium text-slate-700">
                          {reply.subject}
                        </p>
                        <Badge
                          variant="secondary"
                          className="mt-1 bg-emerald-100 text-emerald-700"
                        >
                          {reply.campaign}
                        </Badge>
                        <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                          {reply.messagePreview}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs text-slate-400">
                        {format(new Date(reply.date), "MMM d")}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Full Message Dialog */}
      <Dialog
        open={!!selectedReply}
        onOpenChange={() => setSelectedReply(null)}
      >
        <DialogContent className="border-slate-200 bg-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-slate-900">
              Reply from {selectedReply?.leadName}
            </DialogTitle>
          </DialogHeader>
          {selectedReply && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 text-sm">
                <Badge
                  variant="secondary"
                  className="bg-slate-100 text-slate-700"
                >
                  {selectedReply.company}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700"
                >
                  {selectedReply.campaign}
                </Badge>
                <span className="text-slate-500">
                  {format(new Date(selectedReply.date), "MMMM d, yyyy")}
                </span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="mb-2 text-sm font-medium text-slate-600">
                  Subject: {selectedReply.subject}
                </p>
                <p className="whitespace-pre-wrap text-slate-700">
                  {selectedReply.fullMessage}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
