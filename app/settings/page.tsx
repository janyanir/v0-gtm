"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Plus,
  FileSpreadsheet,
  PenLine,
} from "lucide-react";
import { useConnectionState, ConnectionStatus } from "@/lib/connection-store";
import { projects } from "@/lib/mock-data";

export default function SettingsPage() {
  const {
    state,
    updateHeyReach,
    updateSmartlead,
    updateGoogleSheets,
  } = useConnectionState();

  const [heyReachApiKey, setHeyReachApiKey] = useState(state.heyReach.apiKey);
  const [smartleadApiKey, setSmartleadApiKey] = useState(state.smartlead.apiKey);
  const [googleSheetUrl, setGoogleSheetUrl] = useState(state.googleSheets.sheetUrl);
  const [heyReachStatus, setHeyReachStatus] = useState<ConnectionStatus>(state.heyReach.status);
  const [smartleadStatus, setSmartleadStatus] = useState<ConnectionStatus>(state.smartlead.status);
  const [googleSheetsStatus, setGoogleSheetsStatus] = useState<ConnectionStatus>(state.googleSheets.status);

  // Manual update form state
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateType, setUpdateType] = useState<string>("note");
  const [updateSaved, setUpdateSaved] = useState(false);

  const testHeyReachConnection = async () => {
    setHeyReachStatus("testing");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const newStatus = heyReachApiKey.length > 0 ? "connected" : "failed";
    setHeyReachStatus(newStatus);
    updateHeyReach(heyReachApiKey, newStatus);
  };

  const testSmartleadConnection = async () => {
    setSmartleadStatus("testing");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const newStatus = smartleadApiKey.length > 0 ? "connected" : "failed";
    setSmartleadStatus(newStatus);
    updateSmartlead(smartleadApiKey, newStatus);
  };

  const testGoogleSheetsConnection = async () => {
    setGoogleSheetsStatus("testing");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const newStatus = googleSheetUrl.length > 0 ? "connected" : "failed";
    setGoogleSheetsStatus(newStatus);
    updateGoogleSheets(googleSheetUrl, newStatus);
  };

  const handleAddUpdate = () => {
    if (!selectedProject || !updateTitle || !updateDescription) return;
    // In a real app, this would save to a database
    // For demo, we just show a success message
    setUpdateSaved(true);
    setTimeout(() => {
      setUpdateSaved(false);
      setUpdateTitle("");
      setUpdateDescription("");
      setUpdateType("note");
    }, 2000);
  };

  const renderStatus = (status: ConnectionStatus) => {
    switch (status) {
      case "testing":
        return (
          <span className="flex items-center gap-1 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Testing...
          </span>
        );
      case "connected":
        return (
          <span className="flex items-center gap-1 text-sm text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
            Connected
          </span>
        );
      case "failed":
        return (
          <span className="flex items-center gap-1 text-sm text-red-600">
            <XCircle className="h-4 w-4" />
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="ml-64">
        <div className="border-b border-slate-200 bg-white px-6 py-4">
          <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
          <p className="mt-1 text-sm text-slate-500">
            Configure your API integrations and manage updates
          </p>
        </div>
        <main className="p-6">
          <div className="mx-auto max-w-2xl space-y-6">
            {/* HeyReach API Key */}
            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <CardTitle className="text-slate-900">
                  HeyReach Integration
                </CardTitle>
                <CardDescription className="text-slate-500">
                  Connect your HeyReach account to sync LinkedIn campaign data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="heyreach-key" className="text-slate-700">
                    API Key
                  </Label>
                  <Input
                    id="heyreach-key"
                    type="password"
                    placeholder="Enter your HeyReach API key"
                    value={heyReachApiKey}
                    onChange={(e) => {
                      setHeyReachApiKey(e.target.value);
                      setHeyReachStatus("idle");
                    }}
                    className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={testHeyReachConnection}
                    disabled={heyReachStatus === "testing"}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {heyReachStatus === "testing" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      "Test Connection"
                    )}
                  </Button>
                  {renderStatus(heyReachStatus)}
                </div>
              </CardContent>
            </Card>

            {/* Smartlead API Key */}
            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <CardTitle className="text-slate-900">
                  Smartlead Integration
                </CardTitle>
                <CardDescription className="text-slate-500">
                  Connect your Smartlead account to sync email campaign data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="smartlead-key" className="text-slate-700">
                    API Key
                  </Label>
                  <Input
                    id="smartlead-key"
                    type="password"
                    placeholder="Enter your Smartlead API key"
                    value={smartleadApiKey}
                    onChange={(e) => {
                      setSmartleadApiKey(e.target.value);
                      setSmartleadStatus("idle");
                    }}
                    className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={testSmartleadConnection}
                    disabled={smartleadStatus === "testing"}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {smartleadStatus === "testing" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      "Test Connection"
                    )}
                  </Button>
                  {renderStatus(smartleadStatus)}
                </div>
              </CardContent>
            </Card>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-slate-50 px-3 text-sm text-slate-500">
                  Project Updates
                </span>
              </div>
            </div>

            {/* Google Sheets Integration */}
            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                  <CardTitle className="text-slate-900">
                    Google Sheets Integration
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-500">
                  Connect a Google Sheet to automatically sync project updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="google-sheet-url" className="text-slate-700">
                    Google Sheet URL
                  </Label>
                  <Input
                    id="google-sheet-url"
                    type="url"
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    value={googleSheetUrl}
                    onChange={(e) => {
                      setGoogleSheetUrl(e.target.value);
                      setGoogleSheetsStatus("idle");
                    }}
                    className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                  />
                  <p className="text-xs text-slate-500">
                    Make sure the sheet is shared with view access. Required
                    columns: Project, Title, Description, Type, Date
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={testGoogleSheetsConnection}
                    disabled={googleSheetsStatus === "testing"}
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    {googleSheetsStatus === "testing" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      "Connect Sheet"
                    )}
                  </Button>
                  {renderStatus(googleSheetsStatus)}
                </div>
              </CardContent>
            </Card>

            {/* Manual Update Entry */}
            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <PenLine className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-slate-900">
                    Add Manual Update
                  </CardTitle>
                </div>
                <CardDescription className="text-slate-500">
                  Manually add a project update
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-select" className="text-slate-700">
                    Project
                  </Label>
                  <Select
                    value={selectedProject}
                    onValueChange={setSelectedProject}
                  >
                    <SelectTrigger
                      id="project-select"
                      className="border-slate-300 bg-white text-slate-900"
                    >
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="update-type" className="text-slate-700">
                    Update Type
                  </Label>
                  <Select value={updateType} onValueChange={setUpdateType}>
                    <SelectTrigger
                      id="update-type"
                      className="border-slate-300 bg-white text-slate-900"
                    >
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="milestone">Milestone</SelectItem>
                      <SelectItem value="note">Note</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="decision">Decision</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="update-title" className="text-slate-700">
                    Title
                  </Label>
                  <Input
                    id="update-title"
                    placeholder="Enter update title"
                    value={updateTitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                    className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="update-description" className="text-slate-700">
                    Description
                  </Label>
                  <Textarea
                    id="update-description"
                    placeholder="Enter update description"
                    value={updateDescription}
                    onChange={(e) => setUpdateDescription(e.target.value)}
                    rows={3}
                    className="border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    onClick={handleAddUpdate}
                    disabled={
                      !selectedProject || !updateTitle || !updateDescription
                    }
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Update
                  </Button>
                  {updateSaved && (
                    <span className="flex items-center gap-1 text-sm text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
                      Update saved!
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="border-slate-200 bg-slate-100">
              <CardContent className="pt-6">
                <h3 className="font-medium text-slate-800">
                  How to get your API keys
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>
                    <strong className="text-slate-700">HeyReach:</strong> Go to
                    Settings &rarr; Integrations &rarr; API in your HeyReach
                    dashboard
                  </li>
                  <li>
                    <strong className="text-slate-700">Smartlead:</strong> Go to
                    Settings &rarr; API Access in your Smartlead account
                  </li>
                  <li>
                    <strong className="text-slate-700">Google Sheets:</strong>{" "}
                    Share your sheet with &quot;Anyone with the link can
                    view&quot; and paste the URL above
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
