"use client";

import React, { useState, useEffect, useTransition } from "react";
import { X, Sparkles, Check, Globe, ExternalLink } from "lucide-react";
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

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (!isPending || progress === 100 || error)) {
        onClose();
      }
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, isPending, progress, error, onClose]);

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
      { prg: 95, text: "Registering global Vercel serverless functions..." },
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
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="deploy-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => {
          if (!isPending || progress === 100 || error) onClose();
        }}
      />

      {/* Dialog body */}
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl w-full max-w-md p-6 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3
              id="deploy-dialog-title"
              className="font-bold text-sm text-slate-900 dark:text-white"
            >
              Publish to Vercel
            </h3>
          </div>
          {(progress === 100 || error) && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content body */}
        <div className="flex flex-col items-center justify-center text-center py-4">
          {error ? (
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center justify-center mx-auto text-rose-600 dark:text-rose-400">
                <X className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Deployment Failed
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{error}</p>
              </div>
            </div>
          ) : progress < 100 ? (
            <div className="w-full space-y-6">
              <div className="relative flex items-center justify-center py-2">
                <div className="w-16 h-16 rounded-full border-4 border-slate-100 dark:border-slate-800 border-t-indigo-600 dark:border-t-indigo-400 animate-spin mx-auto" />
                <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400 absolute animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono animate-pulse">
                  {log}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 w-full">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  Your website is Live!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Successfully published to Vercel production hosting.
                </p>
              </div>

              {/* Link Container */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between text-xs font-bold">
                <span className="text-slate-600 dark:text-slate-400 truncate max-w-[220px]">
                  {successUrl}
                </span>
                <a
                  href={successUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
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
