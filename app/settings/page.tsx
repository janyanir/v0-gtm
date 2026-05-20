"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

type ConnectionStatus = "idle" | "testing" | "connected" | "failed";

export default function SettingsPage() {
  const [heyReachApiKey, setHeyReachApiKey] = useState("");
  const [smartleadApiKey, setSmartleadApiKey] = useState("");
  const [heyReachStatus, setHeyReachStatus] = useState<ConnectionStatus>("idle");
  const [smartleadStatus, setSmartleadStatus] = useState<ConnectionStatus>("idle");

  const testHeyReachConnection = async () => {
    setHeyReachStatus("testing");
    // Simulate API test
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // For demo, we'll show connected if key is entered, failed if empty
    setHeyReachStatus(heyReachApiKey.length > 0 ? "connected" : "failed");
  };

  const testSmartleadConnection = async () => {
    setSmartleadStatus("testing");
    // Simulate API test
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // For demo, we'll show connected if key is entered, failed if empty
    setSmartleadStatus(smartleadApiKey.length > 0 ? "connected" : "failed");
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
            Configure your API integrations
          </p>
        </div>
        <main className="p-6">
          <div className="mx-auto max-w-2xl space-y-6">
            {/* HeyReach API Key */}
            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <CardTitle className="text-slate-900">HeyReach Integration</CardTitle>
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
                <CardTitle className="text-slate-900">Smartlead Integration</CardTitle>
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

            {/* Info Card */}
            <Card className="border-slate-200 bg-slate-100">
              <CardContent className="pt-6">
                <h3 className="font-medium text-slate-800">
                  How to get your API keys
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>
                    <strong className="text-slate-700">HeyReach:</strong> Go to
                    Settings → Integrations → API in your HeyReach dashboard
                  </li>
                  <li>
                    <strong className="text-slate-700">Smartlead:</strong> Go to
                    Settings → API Access in your Smartlead account
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
