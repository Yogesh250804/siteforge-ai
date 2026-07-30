"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Palette, 
  Layout, 
  Globe, 
  ChevronRight, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Laptop, 
  Smartphone, 
  Check, 
  Search, 
  Building2, 
  Utensils, 
  Scissors, 
  Dumbbell, 
  MessageSquare,
  ShieldCheck,
  Zap,
  RefreshCw,
  Eye
} from "lucide-react";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [annualBilling, setAnnualBilling] = useState(true);
  
  // Demo interactive state
  const [businessName, setBusinessName] = useState("Sizzle & Smoke");
  const [businessType, setBusinessType] = useState("restaurant");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedSite, setGeneratedSite] = useState<any>(null);
  const [selectedTheme, setSelectedTheme] = useState("modern");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [editableHeading, setEditableHeading] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const demoTemplates = {
    restaurant: {
      heading: "Artisanal Dining Experience",
      subheading: "Fresh local ingredients, handcrafted recipes, and a warm atmosphere.",
      heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
      features: ["Seasonal Menu", "Private Events", "Chef's Table"],
      color: "from-amber-600 to-red-600"
    },
    gym: {
      heading: "Unleash Your Inner Beast",
      subheading: "State-of-the-art equipment, certified trainers, and group sessions.",
      heroImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
      features: ["24/7 Access", "Personal Training", "Spin & Yoga Classes"],
      color: "from-blue-600 to-cyan-600"
    },
    salon: {
      heading: "Elevate Your Natural Beauty",
      subheading: "Luxury haircuts, styling, coloring, and holistic treatments.",
      heroImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
      features: ["Expert Styling", "Organic Products", "Nail & Spa Services"],
      color: "from-purple-600 to-pink-600"
    }
  };

  const handleDemoGenerate = () => {
    if (!businessName.trim()) return;
    setIsGenerating(true);
    setGenerationStep(1);
    
    // Simulate generation process
    const timers = [
      setTimeout(() => setGenerationStep(2), 800),
      setTimeout(() => setGenerationStep(3), 1600),
      setTimeout(() => {
        const template = demoTemplates[businessType as keyof typeof demoTemplates] || demoTemplates.restaurant;
        setGeneratedSite({
          businessName,
          type: businessType,
          ...template
        });
        setEditableHeading(template.heading);
        setIsGenerating(false);
        setGenerationStep(0);
      }, 2500)
    ];

    return () => timers.forEach(clearTimeout);
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans`}>
      
      {/* Dynamic Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] overflow-hidden pointer-events-none opacity-40 dark:opacity-30">
        <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] rounded-full bg-indigo-600/30 blur-[100px] animate-pulse"></div>
        <div className="absolute top-[10%] right-[20%] w-[350px] h-[350px] rounded-full bg-violet-600/20 blur-[120px] animation-delay-2000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/75 dark:bg-slate-950/75 border-b border-slate-200/50 dark:border-slate-800/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 dark:from-white dark:via-indigo-100 dark:to-indigo-300 bg-clip-text text-transparent">
              SiteForge<span className="text-indigo-600">AI</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#demo" className="hover:text-indigo-600 transition-colors">Interactive Demo</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-indigo-600 transition-colors">Testimonials</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a href="/login" className="text-sm font-semibold hover:text-indigo-600 transition-colors">
              Sign In
            </a>
            <a 
              href="/register" 
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 rounded-xl transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-95"
            >
              Get Started Free
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-4">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-600 dark:text-slate-400 font-medium">Features</a>
            <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-600 dark:text-slate-400 font-medium">Interactive Demo</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-600 dark:text-slate-400 font-medium">Pricing</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-600 dark:text-slate-400 font-medium">Testimonials</a>
            <hr className="border-slate-100 dark:border-slate-900" />
            <div className="flex flex-col gap-3">
              <a href="/login" className="w-full text-center py-2 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-800">
                Sign In
              </a>
              <a href="/register" className="w-full text-center py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl">
                Get Started Free
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/30 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-8 animate-fade-in-down">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Supercharged by Gemini 1.5 Pro</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 dark:from-white dark:via-slate-100 dark:to-indigo-200 bg-clip-text text-transparent">
          Launch Beautiful AI-Generated Websites in Seconds
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Tell SiteForge AI about your business, choose from premium layouts, generate custom copy and assets instantly, and deploy to Vercel with one click.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a 
            href="#demo" 
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all hover:translate-y-[-2px] flex items-center justify-center gap-2 group"
          >
            Try Free Builder
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#features" 
            className="w-full sm:w-auto px-8 py-4 border border-slate-200 dark:border-slate-800 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 font-semibold rounded-xl transition-all"
          >
            Explore Features
          </a>
        </div>

        {/* Dashboard Mockup Preview */}
        <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-2 backdrop-blur-sm max-w-5xl mx-auto shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-950 aspect-[16/10] flex flex-col">
            {/* Window control header */}
            <div className="h-10 bg-slate-200/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="text-xs text-slate-400 font-mono">dashboard.siteforge.ai/projects</div>
              <div className="w-12"></div>
            </div>
            
            {/* Inner preview screen */}
            <div className="flex-1 flex bg-slate-50 dark:bg-slate-950 p-6 overflow-hidden">
              <div className="w-1/4 border-r border-slate-200 dark:border-slate-900 pr-6 flex flex-col gap-6 text-left">
                <div className="font-bold text-sm text-indigo-600 dark:text-indigo-400">SiteForge Dashboard</div>
                <div className="space-y-2">
                  <div className="h-8 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center px-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400 gap-2">
                    <Sparkles className="w-3.5 h-3.5" /> AI Generator
                  </div>
                  <div className="h-8 rounded-lg flex items-center px-3 text-xs font-semibold text-slate-500 dark:text-slate-400 gap-2 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer">
                    <Layout className="w-3.5 h-3.5" /> Layouts
                  </div>
                  <div className="h-8 rounded-lg flex items-center px-3 text-xs font-semibold text-slate-500 dark:text-slate-400 gap-2 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer">
                    <Palette className="w-3.5 h-3.5" /> Custom Styles
                  </div>
                </div>
              </div>
              
              <div className="flex-1 pl-6 flex flex-col gap-4 text-left">
                <div className="flex items-center justify-between">
                  <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  <div className="h-8 w-24 bg-indigo-600 rounded-lg"></div>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div className="border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/20 dark:bg-indigo-950/20 rounded-xl p-4 flex flex-col justify-between">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white"><Utensils className="w-4 h-4" /></div>
                    <div className="font-bold text-xs mt-4">Restaurant</div>
                    <div className="text-[10px] text-slate-400">Perfect for bistros, cafes & dining sites.</div>
                  </div>
                  <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between opacity-80">
                    <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center"><Scissors className="w-4 h-4" /></div>
                    <div className="font-bold text-xs mt-4">Hair Salon</div>
                    <div className="text-[10px] text-slate-400">Sleek styling schedules & portfolios.</div>
                  </div>
                  <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between opacity-80">
                    <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center"><Dumbbell className="w-4 h-4" /></div>
                    <div className="font-bold text-xs mt-4">Fitness Gym</div>
                    <div className="text-[10px] text-slate-400">Class timings, memberships & trainers.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white dark:bg-slate-900 border-y border-slate-200/50 dark:border-slate-800/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-900 to-violet-700 dark:from-indigo-100 dark:to-indigo-300 bg-clip-text text-transparent">
              Engineered for Speed, Crafted for Design
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Everything you need to go from an idea to a fully launched, production-ready website in less than a minute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Context Engine</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Provide basic details about your business and our Gemini-backed AI constructs tailor-made layouts, imagery prompts, and SEO content.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-6 group-hover:scale-110 transition-transform">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">10+ Premium Templates</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Includes responsive sections crafted specifically for restaurants, gyms, consulting agencies, salons, and more. Customize live.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">One-Click Deploy</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Instantly push your code directly to Vercel. Standard secure production hosting, dynamic content injection, and SSL setup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Interactive Sandbox</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-4 bg-gradient-to-r from-indigo-950 to-indigo-850 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
              Try It Right Now
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Enter your shop's name, choose a template type, and experience the SiteForge generation algorithm.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Config Panel */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                Configure AI Input
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Business Name</label>
                  <input 
                    type="text" 
                    value={businessName} 
                    onChange={(e) => setBusinessName(e.target.value)} 
                    placeholder="e.g., Rise Coffee House" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Niche / Industry</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => setBusinessType("restaurant")} 
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${businessType === "restaurant" ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400" : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850"}`}
                    >
                      <Utensils className="w-4 h-4 mb-2" />
                      <span className="text-[10px] font-bold">Dining</span>
                    </button>
                    <button 
                      onClick={() => setBusinessType("gym")} 
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${businessType === "gym" ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400" : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850"}`}
                    >
                      <Dumbbell className="w-4 h-4 mb-2" />
                      <span className="text-[10px] font-bold">Fitness</span>
                    </button>
                    <button 
                      onClick={() => setBusinessType("salon")} 
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${businessType === "salon" ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400" : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850"}`}
                    >
                      <Scissors className="w-4 h-4 mb-2" />
                      <span className="text-[10px] font-bold">Beauty</span>
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleDemoGenerate}
                  disabled={isGenerating || !businessName.trim()}
                  className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Generating site structure...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Build My Custom Site</span>
                    </>
                  )}
                </button>
              </div>

              {isGenerating && (
                <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-3 font-mono">
                  <div className="flex items-center gap-2 text-indigo-500">
                    <CheckCircle className={`w-4 h-4 ${generationStep >= 1 ? "text-emerald-500" : "text-slate-300 animate-pulse"}`} />
                    <span>Analyzing domain requirements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${generationStep >= 2 ? "text-emerald-500" : "text-slate-300"}`} />
                    <span>Generating SEO content with Gemini</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${generationStep >= 3 ? "text-emerald-500" : "text-slate-300"}`} />
                    <span>Styling theme components</span>
                  </div>
                </div>
              )}
            </div>

            {/* Sandbox Live Editor & Preview */}
            <div className="lg:col-span-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden flex flex-col aspect-[4/3] lg:aspect-auto lg:h-[580px]">
              
              {/* Toolbar */}
              <div className="h-14 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                  <span className="text-xs font-semibold text-slate-500">Live Preview & Sandbox</span>
                </div>

                {generatedSite && (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 rounded-lg p-1 bg-white dark:bg-slate-950">
                      <button 
                        onClick={() => setPreviewDevice("desktop")} 
                        className={`p-1.5 rounded ${previewDevice === "desktop" ? "bg-slate-100 dark:bg-slate-800 text-indigo-500" : "text-slate-400 hover:text-slate-600"}`}
                      >
                        <Laptop className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => setPreviewDevice("mobile")} 
                        className={`p-1.5 rounded ${previewDevice === "mobile" ? "bg-slate-100 dark:bg-slate-800 text-indigo-500" : "text-slate-400 hover:text-slate-600"}`}
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button 
                      onClick={() => alert("To deploy, sign up for a free SiteForge AI account!")} 
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Globe className="w-3.5 h-3.5" /> Deploy
                    </button>
                  </div>
                )}
              </div>

              {/* Sandbox Frame */}
              <div className="flex-1 bg-slate-100 dark:bg-slate-950 p-6 flex justify-center items-center overflow-auto">
                {generatedSite ? (
                  <div 
                    className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md rounded-xl transition-all duration-300 overflow-hidden flex flex-col ${previewDevice === "mobile" ? "w-[320px] h-[450px]" : "w-full h-full"}`}
                  >
                    {/* Tiny client nav */}
                    <div className="h-12 border-b border-slate-150 dark:border-slate-800/80 px-4 flex items-center justify-between">
                      <span className="font-extrabold text-sm tracking-tight">{generatedSite.businessName}</span>
                      <div className="flex gap-2">
                        <div className="w-6 h-2 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        <div className="w-6 h-2 bg-slate-200 dark:bg-slate-800 rounded"></div>
                      </div>
                    </div>

                    {/* Tiny Client Content */}
                    <div className="flex-1 overflow-y-auto">
                      {/* Hero banner */}
                      <div className="p-8 text-center relative overflow-hidden bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800/50">
                        <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400 mb-2 block">Welcome to our site</span>
                        
                        {/* Interactive Edit Input */}
                        <div className="relative group/edit max-w-md mx-auto mb-3">
                          <input 
                            type="text" 
                            value={editableHeading} 
                            onChange={(e) => setEditableHeading(e.target.value)} 
                            className="bg-transparent hover:bg-slate-100/50 dark:hover:bg-slate-800/50 focus:bg-slate-100 dark:focus:bg-slate-800 border-b border-dashed border-indigo-300 dark:border-indigo-700/80 focus:border-solid focus:outline-none w-full text-center text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white"
                          />
                        </div>

                        <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">{generatedSite.subheading}</p>
                        
                        <button className={`px-4 py-1.5 text-xs text-white bg-gradient-to-r ${generatedSite.color} font-bold rounded-lg`}>
                          Learn More
                        </button>
                      </div>

                      {/* Feature section */}
                      <div className="p-6">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center mb-4">Our Services</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {generatedSite.features.map((feat: string, i: number) => (
                            <div key={i} className="p-3 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 rounded-lg text-center">
                              <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto mb-1.5" />
                              <span className="text-[10px] font-bold block truncate">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <Sparkles className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4 animate-bounce" />
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1">Sandbox is Empty</h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">Configure the parameters on the left and click "Build My Custom Site" to witness the generator.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white dark:bg-slate-900 border-y border-slate-200/50 dark:border-slate-800/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Pricing Plans</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-4 bg-gradient-to-r from-slate-900 to-indigo-950 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Pricing Designed for Scale
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Start completely free, then upgrade to deploy custom domains and unlock advanced AI features.
            </p>

            {/* Toggle Switch */}
            <div className="inline-flex items-center gap-3 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80">
              <button 
                onClick={() => setAnnualBilling(false)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${!annualBilling ? "bg-white dark:bg-slate-900 shadow text-indigo-600 dark:text-indigo-400" : "text-slate-400 hover:text-slate-500"}`}
              >
                Monthly Billing
              </button>
              <button 
                onClick={() => setAnnualBilling(true)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${annualBilling ? "bg-white dark:bg-slate-900 shadow text-indigo-600 dark:text-indigo-400" : "text-slate-400 hover:text-slate-500"}`}
              >
                Annual Billing
                <span className="px-1.5 py-0.5 text-[9px] bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-md">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free plan */}
            <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-2">Free Starter</h3>
                <p className="text-xs text-slate-550 dark:text-slate-400 mb-6">Build & test unlimited layouts.</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold">$0</span>
                  <span className="text-xs text-slate-400">/ forever</span>
                </div>
                <ul className="space-y-3.5 mb-8">
                  {["1 Live Website", "Standard Templates", "Subdomain hosting", "AI site builder trial"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-semibold">
                      <Check className="w-4 h-4 text-emerald-550 dark:text-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="/register" className="w-full py-3 text-center text-xs font-bold border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                Get Started
              </a>
            </div>

            {/* Pro plan */}
            <div className="p-8 rounded-2xl border-2 border-indigo-600 bg-white dark:bg-slate-900 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-600 text-white text-[9px] font-bold rounded-bl-lg">POPULAR</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Pro SiteForge</h3>
                <p className="text-xs text-slate-550 dark:text-slate-400 mb-6">Deploy production business landing pages.</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold">{annualBilling ? "$15" : "$19"}</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <ul className="space-y-3.5 mb-8">
                  {["Unlimited AI generations", "Custom Domain deployment", "Full template catalog (10+ niches)", "Custom forms & lead collection", "24/7 Priority support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-semibold">
                      <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="/register" className="w-full py-3 text-center text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors shadow-lg shadow-indigo-600/10">
                Upgrade to Pro
              </a>
            </div>

            {/* Enterprise plan */}
            <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-2">Agency Scale</h3>
                <p className="text-xs text-slate-550 dark:text-slate-400 mb-6">For designers & multi-business managers.</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold">{annualBilling ? "$39" : "$49"}</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <ul className="space-y-3.5 mb-8">
                  {["Deploy 25+ live sites", "Whitelabel dashboard branding", "Multi-user admin access", "Advanced API & Custom Integrations", "Dedicated Account Manager"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-semibold">
                      <Check className="w-4 h-4 text-emerald-555 dark:text-emerald-450" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="/register" className="w-full py-3 text-center text-xs font-bold border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Real Customer Love</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-4 bg-gradient-to-r from-slate-950 to-indigo-950 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
              Loved by Business Owners & Creators
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Hear from business owners who launched their sites with zero coding experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex items-center gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => <Sparkles key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-medium italic">
                "I needed a simple website for my bakery. SiteForge AI generated a gorgeous page, complete with a menu listing, in less than two minutes. The deployment to Vercel was instant."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-indigo-600">MS</div>
                <div>
                  <h4 className="text-xs font-bold">Marie S.</h4>
                  <span className="text-[10px] text-slate-400">Sweet Cravings Bakery</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex items-center gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => <Sparkles key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-medium italic">
                "As a fitness coach, I don't have time to mess with servers or layout margins. I told SiteForge I run a strength training gym, and it designed exactly the bold, raw aesthetic I wanted."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-indigo-600">DL</div>
                <div>
                  <h4 className="text-xs font-bold">Danny L.</h4>
                  <span className="text-[10px] text-slate-400">Iron Will Gym</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex items-center gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => <Sparkles key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-medium italic">
                "Our agency builds websites for local clients. Using SiteForge AI, we generate production-ready websites in record time. It produces clean Next.js and Tailwind code that is easily extensible."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-indigo-600">AK</div>
                <div>
                  <h4 className="text-xs font-bold">Alex K.</h4>
                  <span className="text-[10px] text-slate-400">PixelForge Studios</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20 bg-gradient-to-tr from-indigo-900 to-indigo-950 text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-6">Ready to Forge Your Digital Presence?</h2>
          <p className="text-indigo-200 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Join business owners and creators scaling their brands with fast, AI-optimized web pages.
          </p>
          <a 
            href="/register" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-150 text-indigo-900 font-bold rounded-xl shadow-lg transition-transform hover:translate-y-[-2px]"
          >
            Create Your Site Now
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer Details */}
      <footer className="py-12 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 text-xs text-slate-550 dark:text-slate-400 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">SiteForge AI</span>
          </div>
          <div>© {new Date().getFullYear()} SiteForge AI. All rights reserved. Built with Next.js, React, and Gemini.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
