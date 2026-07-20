"use client";

import React, { useState, useEffect, useTransition } from "react";
import { X, Sparkles, Check, Globe, RefreshCw, ExternalLink } from "lucide-react";
import { deployProjectAction } from "@/app/actions/deploy";

interface DeployModalProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
}

export function DeployModal({ open, onClose, projectId }: DeployModalProps) {
  const [isPending, startTransition] = useTransition();
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState("Preparing server credentials...");
  const [successUrl, setSuccessUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    // Reset state
    setProgress(0);
    setSuccessUrl(null);
    setError(null);
    setLog("Initializing deployment tunnel...");

    const logs = [
      { prg: 20, text: "Bundling Next.js production files..." },
      { prg: 50, text: "Optimizing Tailwind CSS variables..." },
      { prg: 75, text: "Provisioning SSL certificate and custom domain..." },
      { prg: 95, text: "Registering global Vercel serverless functions..." }
    ];

    logs.forEach((step, index) => {
      setTimeout(() => {
        setProgress(step.prg);
        setLog(step.text);
      }, (index + 1) * 800);
    });

    startTransition(async () => {
      const res = await deployProjectAction(projectId);
      
      // Ensure min 4 seconds simulation
      setTimeout(() => {
        if (res.success && res.deployedUrl) {
          setProgress(100);
          setLog("Site deployed successfully!");
          setSuccessUrl(res.deployedUrl);
        } else {
          setError(res.error || "Deployment failed.");
        }
      }, 3800);
    });

  }, [open, projectId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={() => {
          if (!isPending && progress === 100) onClose();
        }}
      />

      {/* Dialog body */}
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl w-full max-w-md p-6 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-500" />
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Publish to Vercel</h3>
          </div>
          {(progress === 100 || error) && (
            <button 
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content body */}
        <div className="flex flex-col items-center justify-center text-center py-6">
          {error ? (
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 flex items-center justify-center mx-auto text-red-600">
                <X className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Deployment Failed</h4>
                <p className="text-xs text-slate-400 mt-1">{error}</p>
              </div>
            </div>
          ) : progress < 100 ? (
            <div className="w-full space-y-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-slate-100 dark:border-slate-850 border-t-indigo-600 animate-spin mx-auto" />
                <Sparkles className="w-6 h-6 text-indigo-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono animate-pulse">{log}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 w-full">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-center mx-auto text-emerald-600">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">Your website is Live!</h4>
                <p className="text-xs text-slate-405 mt-1">Successfully published to Vercel production hosting.</p>
              </div>

              {/* Link Container */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500 truncate max-w-[220px]">{successUrl}</span>
                <a
                  href={successUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-505 text-white rounded-lg flex items-center gap-1 shrink-0"
                >
                  <span>Visit</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
