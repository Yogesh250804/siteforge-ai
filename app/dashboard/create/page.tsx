"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Compass, 
  Briefcase, 
  RefreshCw,
  Info,
  ChevronRight,
  Palette,
  Laptop
} from "lucide-react";
import { templates } from "@/lib/templates";
import { generateSiteAction } from "@/app/actions/generator";
import { BusinessInfo } from "@/lib/types/database";

const STEPS = [
  { id: 1, name: "Business Details", desc: "Introduce your brand" },
  { id: 2, name: "Choose Design", desc: "Select your baseline template" },
  { id: 3, name: "AI Generation", desc: "Forging your custom site" }
];

export default function CreateProjectPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("restaurant");

  // AI progress state
  const [genProgress, setGenProgress] = useState(0);
  const [genMessage, setGenMessage] = useState("");

  const handleNext = () => {
    if (currentStep === 1) {
      if (!name.trim()) {
        setError("Business name is required.");
        return;
      }
      if (!industry.trim()) {
        setError("Industry/Niche is required.");
        return;
      }
      setError(null);
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleCreate = () => {
    setError(null);
    setCurrentStep(3);
    
    // Animate progress messages
    const messages = [
      { progress: 15, msg: "Establishing secure context tunnel..." },
      { progress: 35, msg: "Analyzing keywords and brand description..." },
      { progress: 60, msg: "Gemini API drafting copy and sections..." },
      { progress: 85, msg: "Compiling theme values and custom SEO tags..." },
      { progress: 98, msg: "Saving new instance records to Database..." }
    ];

    messages.forEach((step, idx) => {
      setTimeout(() => {
        setGenProgress(step.progress);
        setGenMessage(step.msg);
      }, idx * 1000);
    });

    startTransition(async () => {
      const businessInfo: BusinessInfo = {
        name,
        industry,
        description,
        address,
        phone,
        email
      };

      // Ensure min 5 seconds simulation for premium look
      const startTime = Date.now();
      const result = await generateSiteAction(businessInfo, selectedTemplate);
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, 5200 - elapsed);

      setTimeout(() => {
        if (result.success && result.projectId) {
          router.push(`/dashboard/project/${result.projectId}`);
        } else {
          setError(result.error || "Failed to generate website.");
          setCurrentStep(1); // revert on error
        }
      }, delay);
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      {/* Back button */}
      {currentStep < 3 && (
        <button
          onClick={() => {
            if (currentStep === 1) router.push("/dashboard");
            else handleBack();
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>
      )}

      {/* Progress Steps Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {STEPS.map((step) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            return (
              <div key={step.id} className="flex-1 relative last:flex-none">
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm border transition-all ${
                      isCompleted 
                        ? "bg-indigo-600 border-indigo-600 text-white" 
                        : isCurrent
                          ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 ring-4 ring-indigo-50 dark:ring-indigo-950/30"
                          : "border-slate-200 dark:border-slate-850 text-slate-400 bg-white dark:bg-slate-900"
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                      {step.name}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-none">
                      {step.desc}
                    </p>
                  </div>
                </div>
                {step.id < 3 && (
                  <div className="hidden sm:block absolute top-[18px] left-[150px] right-6 h-px bg-slate-200 dark:bg-slate-800" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main card panel */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-8">
        
        {/* STEP 1: BUSINESS INFO */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Info className="w-5 h-5 text-indigo-500" />
                Tell us about your Business
              </h2>
              <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">
                Provide basic context and description. Gemini uses this to draft your site copywriting.
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-xs font-semibold text-red-700 dark:text-red-300">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Rise Cafe"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Niche / Industry *
                </label>
                <input
                  type="text"
                  required
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g., Coffee shop, Hair salon, Gym"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@yourbusiness.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Short Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Describe your services, values, unique offerings..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Street Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, New York"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all flex items-center gap-2 group"
              >
                Choose Template
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CHOOSE DESIGN TEMPLATE */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-500" />
                Select baseline template
              </h2>
              <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">
                Choose the structural preset layout. The AI will customize colors, headings, and sections automatically.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-1">
              {templates.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    selectedTemplate === tmpl.id
                      ? "border-indigo-600 bg-indigo-50/30 dark:bg-indigo-950/20 ring-1 ring-indigo-600"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: tmpl.colorScheme.primary + "20" }}
                    >
                      <div
                        className="w-5 h-5 rounded-md"
                        style={{ backgroundColor: tmpl.colorScheme.primary }}
                      />
                    </div>
                    {selectedTemplate === tmpl.id && (
                      <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-[9px] font-extrabold">
                        SELECTED
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-3">
                    {tmpl.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {tmpl.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {tmpl.defaultSections.slice(0, 3).map((sect) => (
                      <span 
                        key={sect.id} 
                        className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-850 text-[9px] font-bold text-slate-500 dark:text-slate-400"
                      >
                        {sect.name}
                      </span>
                    ))}
                    {tmpl.defaultSections.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-850 text-[9px] font-bold text-slate-500 dark:text-slate-400">
                        +{tmpl.defaultSections.length - 3} more
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleBack}
                className="px-5 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleCreate}
                disabled={isPending}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Forge Website
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: LOADING GENERATION SCREEN */}
        {currentStep === 3 && (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="relative mb-8">
              <div className="w-20 h-20 rounded-full border-4 border-slate-100 dark:border-slate-850 border-t-indigo-600 animate-spin" />
              <Sparkles className="w-8 h-8 text-indigo-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
              Generating Site Forge Context
            </h3>
            <p className="text-xs text-slate-450 dark:text-slate-400 max-w-sm mb-6">
              Please wait while our Gemini contextual layout engine structures your pages and copywriting variables.
            </p>

            {/* Progress line */}
            <div className="w-full max-w-md bg-slate-100 dark:bg-slate-850 h-2.5 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-500"
                style={{ width: `${genProgress}%` }}
              />
            </div>

            <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono animate-pulse">
              {genMessage || "Preparing context schema..."}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
