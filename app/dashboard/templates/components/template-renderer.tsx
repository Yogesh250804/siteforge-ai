"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Check,
  Star,
  Mail,
  Phone,
  MapPin,
  Utensils,
  Dumbbell,
  Calendar,
  Clock,
  User,
  Building2,
  Briefcase,
  Scissors,
  ShoppingBag,
  Camera,
  Heart,
  Search,
  CheckCircle2,
  Calculator,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Award,
  Zap,
  TrendingUp,
  Terminal,
  Cpu,
  Layers,
  Activity,
  Globe,
  Sliders,
  DollarSign,
  Plus,
  ShoppingBasket,
  Grid,
  CheckCircle,
} from "lucide-react";
import type { Template } from "@/lib/templates";

interface TemplateRendererProps {
  template: Template;
  device?: "desktop" | "tablet" | "mobile";
  isThumbnail?: boolean;
}

export function TemplateRenderer({
  template,
  device = "desktop",
  isThumbnail = false,
}: TemplateRendererProps) {
  const primary = template.colorScheme.primary;

  // Widget States for Interactive Previews
  const [activeMenuTab, setActiveMenuTab] = useState<"starters" | "mains" | "desserts">("mains");
  const [bmiHeight, setBmiHeight] = useState(175);
  const [bmiWeight, setBmiWeight] = useState(70);
  const [activeTechTab, setActiveTechTab] = useState<"model" | "agent" | "embed">("agent");
  const [cartCount, setCartCount] = useState(0);

  const calculatedBmi = Number((bmiWeight / ((bmiHeight / 100) * (bmiHeight / 100))).toFixed(1));

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-amber-400" };
    if (bmi < 25) return { label: "Optimal Health Range", color: "text-emerald-400" };
    if (bmi < 30) return { label: "Overweight", color: "text-amber-400" };
    return { label: "High Risk Range", color: "text-rose-400" };
  };

  const bmiStatus = getBmiCategory(calculatedBmi);

  const containerClass = `w-full h-full text-slate-900 dark:text-slate-100 font-sans flex flex-col ${
    isThumbnail ? "text-[10px] select-none pointer-events-none" : "text-sm"
  }`;

  // Typed Motion Variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // ==========================================================================
  // 1. RESTAURANT — MICHELIN CINEMATIC EDITORIAL (Framer/Awwwards Inspired)
  // ==========================================================================
  if (template.id === "restaurant") {
    return (
      <div className={`${containerClass} bg-[#0A0806] text-amber-50 font-serif`}>
        {/* Michelin Announcement Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-950/80 border-b border-amber-900/40 text-amber-300 py-1 px-4 text-[9px] font-sans flex justify-between items-center"
        >
          <span className="flex items-center gap-1.5 font-bold">
            <Award className="w-3 h-3 text-amber-400" /> Awarded 2 Michelin Stars • 2026 Season
          </span>
          <span className="hidden sm:inline opacity-80">Bookings Open for Autumn Tasting Menu</span>
        </motion.div>

        {/* Navigation */}
        <header className="py-3 px-6 border-b border-amber-900/30 bg-[#0A0806]/95 backdrop-blur flex items-center justify-between sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-amber-500" />
            <span className="font-extrabold text-sm tracking-widest uppercase text-amber-400 font-serif">
              L'ÉTOILE BISTRO
            </span>
          </div>
          <div className="flex items-center gap-5 text-xs text-amber-200/80 font-sans">
            <span className="cursor-pointer hover:text-amber-400 transition-colors">Menu</span>
            <span className="cursor-pointer hover:text-amber-400 transition-colors">Chef's Table</span>
            <span className="cursor-pointer hover:text-amber-400 transition-colors">Private Events</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto space-y-10 pb-8 scrollbar-none">
          {/* Hero Spotlight */}
          <section className="relative py-16 px-6 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/60 via-[#0A0806] to-[#0A0806] border-b border-amber-900/20 overflow-hidden">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl mx-auto"
            >
              <motion.span
                variants={fadeInUp}
                className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] font-sans font-bold uppercase tracking-widest mb-4 shadow-sm"
              >
                French Haute Cuisine
              </motion.span>
              <motion.h1
                variants={fadeInUp}
                className="text-2xl sm:text-4xl font-extrabold text-amber-100 tracking-tight mb-4 leading-tight"
              >
                Savor The Art of Modern Fine Dining
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xs sm:text-sm text-amber-200/60 max-w-md mx-auto mb-6 leading-relaxed font-sans"
              >
                Handcrafted seasonal pairings curated by Executive Chef Gabriel Laurent with organic micro-farm ingredients.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex justify-center gap-3 font-sans">
                <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xl shadow-amber-500/20 active:scale-95 transition-all">
                  Reserve a Table
                </button>
                <button className="px-6 py-3 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-800/60 text-amber-300 font-bold text-xs rounded-xl transition-all">
                  View Tasting Menu
                </button>
              </motion.div>
            </motion.div>
          </section>

          {/* Interactive Menu Showcase */}
          <section className="px-6 max-w-3xl mx-auto font-sans">
            <div className="text-center mb-6">
              <h2 className="font-serif text-xl font-bold text-amber-100 mb-1">Autumn Tasting Menu</h2>
              <div className="flex justify-center gap-2 mt-3">
                {(["starters", "mains", "desserts"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveMenuTab(tab)}
                    className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-extrabold tracking-wider transition-all ${
                      activeMenuTab === tab
                        ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                        : "bg-amber-950/40 text-amber-300/70 border border-amber-900/40 hover:bg-amber-900/30"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence mode="wait">
                {activeMenuTab === "mains" && [
                  { name: "Wagyu Tenderloin Rossini", desc: "Seared foie gras, truffle jus, bone marrow butter", price: "$72" },
                  { name: "Pan-Roasted Atlantic Halibut", desc: "Saffron velouté, fennel confit, caviar pearls", price: "$58" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 bg-amber-950/20 border border-amber-900/30 rounded-2xl space-y-1.5 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex justify-between font-serif text-xs font-bold text-amber-200">
                      <span>{item.name}</span>
                      <span className="text-amber-400 font-sans">{item.price}</span>
                    </div>
                    <p className="text-[10px] text-amber-200/50 leading-relaxed font-sans">{item.desc}</p>
                  </motion.div>
                ))}
                {activeMenuTab === "starters" && [
                  { name: "Maine Lobster Bisque", desc: "Cognac reduction, tarragon oil, choux puff", price: "$32" },
                  { name: "Heirloom Beet Tartare", desc: "Aged goat cheese mousse, toasted pine nuts", price: "$24" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 bg-amber-950/20 border border-amber-900/30 rounded-2xl space-y-1.5 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex justify-between font-serif text-xs font-bold text-amber-200">
                      <span>{item.name}</span>
                      <span className="text-amber-400 font-sans">{item.price}</span>
                    </div>
                    <p className="text-[10px] text-amber-200/50 leading-relaxed font-sans">{item.desc}</p>
                  </motion.div>
                ))}
                {activeMenuTab === "desserts" && [
                  { name: "Grand Cru Soufflé", desc: "72% Valrhona chocolate, Tahitian vanilla bean gelato", price: "$22" },
                  { name: "Caramelized Fig Mille-Feuille", desc: "Pistachio diplomate, wildflower honey drip", price: "$20" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 bg-amber-950/20 border border-amber-900/30 rounded-2xl space-y-1.5 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex justify-between font-serif text-xs font-bold text-amber-200">
                      <span>{item.name}</span>
                      <span className="text-amber-400 font-sans">{item.price}</span>
                    </div>
                    <p className="text-[10px] text-amber-200/50 leading-relaxed font-sans">{item.desc}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* Wine Pairing & Chef Story */}
          <section className="px-6 max-w-3xl mx-auto py-8 bg-amber-950/30 border border-amber-900/30 rounded-2xl flex flex-col sm:flex-row items-center gap-6 font-sans">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
              <Utensils className="w-7 h-7" />
            </div>
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest">Master Sommelier Pairing</span>
              <h3 className="font-serif text-base font-bold text-amber-100">Chef Gabriel Laurent</h3>
              <p className="text-xs text-amber-200/60 leading-relaxed italic">
                "Every tasting dish is crafted to create emotional resonance, balancing rare ingredients with modern culinary science."
              </p>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // 2. FITNESS & GYM — RAYCAST / LINEAR HIGH OCTANE (Modern Dark Glow)
  // ==========================================================================
  if (template.id === "gym") {
    return (
      <div className={`${containerClass} bg-[#0A0C10] text-slate-100`}>
        <header className="py-3 px-6 border-b border-slate-800 bg-[#0A0C10]/95 backdrop-blur flex justify-between items-center sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-blue-500" />
            <span className="font-black text-sm uppercase tracking-wider text-white">
              PULSE<span className="text-blue-500">FIT</span>
            </span>
          </div>
          <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/30 active:scale-95 transition-all">
            Join Facility
          </button>
        </header>

        <div className="flex-1 overflow-y-auto space-y-8 pb-8 scrollbar-none">
          {/* Athlete Hero */}
          <section className="relative py-14 px-6 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/60 via-[#0A0C10] to-[#0A0C10] border-b border-slate-800/60">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-3 inline-block shadow-sm">
              24/7 High-Performance Training Ground
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-3 leading-none">
              UNLEASH YOUR <span className="text-blue-500">PEAK POWER</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6 leading-relaxed font-medium">
              Functional cross-training, Olympic lifting platforms, and infrared recovery saunas.
            </p>

            {/* Stat Counters Badge */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto p-4 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl">
              <div>
                <p className="text-lg font-black text-blue-400">1,800+</p>
                <p className="text-[9px] text-slate-400 uppercase font-bold">Active Members</p>
              </div>
              <div>
                <p className="text-lg font-black text-blue-400">50+</p>
                <p className="text-[9px] text-slate-400 uppercase font-bold">Weekly Classes</p>
              </div>
              <div>
                <p className="text-lg font-black text-blue-400">24/7</p>
                <p className="text-[9px] text-slate-400 uppercase font-bold">RFID Access</p>
              </div>
            </div>
          </section>

          {/* Interactive BMI Calculator Widget */}
          {!isThumbnail && (
            <section className="px-6 max-w-xl mx-auto p-5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-400">
                  <Calculator className="w-4 h-4" />
                  <h3 className="font-bold text-xs uppercase tracking-wider text-white">Interactive BMI Calculator</h3>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 ${bmiStatus.color}`}>
                  {bmiStatus.label}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Height: {bmiHeight} cm</label>
                  <input
                    type="range"
                    min="140"
                    max="210"
                    value={bmiHeight}
                    onChange={(e) => setBmiHeight(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Weight: {bmiWeight} kg</label>
                  <input
                    type="range"
                    min="40"
                    max="140"
                    value={bmiWeight}
                    onChange={(e) => setBmiWeight(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400">Calculated Body Mass Index:</span>
                <span className="text-blue-400 text-base font-black">{calculatedBmi}</span>
              </div>
            </section>
          )}

          {/* Membership Pricing Cards */}
          <section className="px-6 max-w-3xl mx-auto">
            <h3 className="text-center text-xs font-black uppercase text-slate-400 tracking-widest mb-4">Membership Plans</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "STARTER", price: "$39", desc: "Full gym floor & locker access" },
                { title: "PRO ATHLETE", price: "$69", desc: "Classes + recovery sauna suite", popular: true },
                { title: "ELITE VIP", price: "$129", desc: "Unlimited 1-on-1 coaching" },
              ].map((tier, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border transition-all ${tier.popular ? "bg-blue-950/40 border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500" : "bg-slate-900/60 border-slate-800"}`}>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-black text-xs text-white">{tier.title}</h4>
                    {tier.popular && <span className="text-[8px] font-bold px-2 py-0.5 bg-blue-600 text-white rounded-full">MOST POPULAR</span>}
                  </div>
                  <p className="text-lg font-black text-blue-400 my-1">{tier.price}<span className="text-[10px] text-slate-400">/mo</span></p>
                  <p className="text-[10px] text-slate-400 leading-relaxed">{tier.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // 3. BEAUTY SALON & SPA — MAGAZINE EDITORIAL
  // ==========================================================================
  if (template.id === "salon") {
    return (
      <div className={`${containerClass} bg-[#FDFBF7] dark:bg-[#120E16] text-purple-950 dark:text-purple-100`}>
        <header className="py-3.5 px-6 border-b border-purple-100 dark:border-purple-900/30 bg-white/90 dark:bg-[#120E16]/90 backdrop-blur flex justify-between items-center sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="font-extrabold text-sm tracking-wider uppercase text-purple-900 dark:text-purple-200 font-serif">
              SERENE SPA & BEAUTY
            </span>
          </div>
          <button className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-full shadow-md shadow-purple-600/20 active:scale-95 transition-all">
            Book Appointment
          </button>
        </header>

        <div className="flex-1 overflow-y-auto space-y-8 pb-8 scrollbar-none">
          <section className="py-14 px-6 text-center bg-gradient-to-b from-purple-50 dark:from-purple-950/30 to-transparent border-b border-purple-100 dark:border-purple-900/20">
            <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[9px] font-bold uppercase tracking-widest mb-3 inline-block">
              Organic Skincare & Hair Salon
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-purple-950 dark:text-white max-w-xl mx-auto mb-3">
              Rejuvenate Your Natural Radiance & Glow
            </h1>
            <p className="text-xs sm:text-sm text-purple-800/70 dark:text-purple-300/70 max-w-md mx-auto mb-6 leading-relaxed">
              Customized aesthetic treatments, balayage hair couture, and soothing organic spa therapies.
            </p>
          </section>

          {/* Treatment Menu */}
          <section className="px-6 max-w-3xl mx-auto">
            <h2 className="font-serif text-center text-lg font-bold text-purple-950 dark:text-white mb-4">Signature Treatments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Hydra-Glow Facial", time: "60 mins", price: "$145", desc: "Deep cleansing, hyaluronic infusion & LED light therapy" },
                { title: "Balayage & Gloss Styling", time: "120 mins", price: "$220", desc: "Custom dimensional highlights, toner gloss & blowout" },
                { title: "Aromatherapy Massage", time: "90 mins", price: "$165", desc: "Full body Swedish massage with organic essential oils" },
                { title: "Gel Spa Pedicure", time: "50 mins", price: "$75", desc: "Exfoliating scrub, paraffin wax treatment & gel polish" },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-white dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 rounded-2xl space-y-1.5 shadow-sm hover:border-purple-400 transition-colors">
                  <div className="flex justify-between items-center font-serif">
                    <span className="font-bold text-xs text-purple-950 dark:text-purple-200">{item.title}</span>
                    <span className="font-sans font-bold text-xs text-purple-600 dark:text-purple-400">{item.price}</span>
                  </div>
                  <p className="text-[10px] text-purple-700/60 dark:text-purple-300/60 leading-relaxed font-sans">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // 4. E-COMMERCE — HIGH END STOREFRONT
  // ==========================================================================
  if (template.id === "ecommerce") {
    return (
      <div className={`${containerClass} bg-slate-950 text-slate-100`}>
        <div className="bg-red-600 text-white text-[9px] font-bold py-1 px-5 text-center uppercase tracking-widest">
          🔥 Mid-Season Sale: Extra 25% Off Code: SITEFORGE25
        </div>

        <header className="py-3.5 px-6 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex justify-between items-center sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-red-500" />
            <span className="font-extrabold text-sm tracking-wider uppercase text-white">
              VOGUE & CO
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-300">Shop</span>
            <div className="px-2.5 py-1 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
              <ShoppingBasket className="w-3 h-3" />
              <span>{cartCount}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto space-y-8 pb-8 scrollbar-none">
          <section className="py-12 px-6 text-center bg-gradient-to-b from-red-950/40 via-slate-950 to-slate-950 border-b border-slate-800">
            <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[9px] font-bold uppercase tracking-widest mb-3 inline-block">
              2026 Sustainable Collection
            </span>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
              Elevate Your Daily Aesthetic
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-5">
              Handcrafted organic cotton apparel & minimalist home essentials.
            </p>
          </section>

          {/* Product Grid */}
          <section className="px-6 max-w-3xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Featured Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { name: "Minimalist Linen Overshirt", price: "$128", rating: "4.9 ★" },
                { name: "Architectural Ceramic Vase", price: "$85", rating: "4.8 ★" },
                { name: "Organic Cotton Hoodie", price: "$98", rating: "5.0 ★" },
              ].map((prod, i) => (
                <div key={i} className="p-3 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 hover:border-red-500/40 transition-colors">
                  <div className="h-28 bg-slate-950 rounded-xl flex items-center justify-center border border-slate-800">
                    <ShoppingBag className="w-7 h-7 text-red-500/40" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white truncate">{prod.name}</h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs font-bold text-red-400">{prod.price}</span>
                      <span className="text-[9px] text-amber-400 font-bold">{prod.rating}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setCartCount((c) => c + 1)}
                    className="w-full py-1.5 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 active:scale-95"
                  >
                    <Plus className="w-3 h-3" /> Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // 5. PHOTOGRAPHY STUDIO — CINEMATIC VISUAL SHOWCASE
  // ==========================================================================
  if (template.id === "photography") {
    return (
      <div className={`${containerClass} bg-[#08080A] text-zinc-100 font-sans`}>
        <header className="py-3.5 px-6 border-b border-zinc-800 bg-[#08080A]/95 backdrop-blur flex justify-between items-center sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-zinc-400" />
            <span className="font-mono font-bold text-xs tracking-widest text-white">LUMINA VISUALS</span>
          </div>
          <button className="px-4 py-1.5 bg-white hover:bg-zinc-200 text-slate-950 text-xs font-bold rounded-xl shadow-sm active:scale-95 transition-all">
            Book Session
          </button>
        </header>

        <div className="flex-1 overflow-y-auto space-y-8 pb-8 scrollbar-none">
          <section className="py-14 px-6 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/60 via-[#08080A] to-[#08080A] border-b border-zinc-800">
            <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-[9px] font-mono uppercase tracking-widest mb-3 inline-block">
              Editorial & Commercial Photography
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white max-w-xl mx-auto mb-3">
              Capturing Timeless Stories In Golden Light
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-5">
              Fashion editorials, destination weddings, and commercial architectural photography.
            </p>
          </section>

          {/* Portfolio Highlights */}
          <section className="px-6 max-w-3xl mx-auto">
            <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-3">Selected Portfolios</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { title: "Vogue Tokyo Editorial", tag: "Fashion" },
                { title: "Amalfi Coast Wedding", tag: "Destination" },
                { title: "Modernist Villa Series", tag: "Architecture" },
              ].map((item, i) => (
                <div key={i} className="group relative h-36 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-end p-3.5 hover:border-zinc-500 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                  <Camera className="w-6 h-6 text-zinc-600 absolute top-3.5 left-3.5" />
                  <div className="relative z-10">
                    <span className="text-[8px] font-mono uppercase text-zinc-400">{item.tag}</span>
                    <h4 className="font-bold text-xs text-white truncate">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // 6. DIGITAL AGENCY / AI — CYBERPUNK TECH (Magic UI & Aceternity Inspired)
  // ==========================================================================
  if (template.id === "agency") {
    return (
      <div className={`${containerClass} bg-slate-950 text-slate-100`}>
        <header className="py-3.5 px-6 border-b border-purple-900/40 bg-slate-950/90 flex justify-between items-center sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="font-bold text-sm tracking-wide text-white">
              NEXUS<span className="text-purple-400">AI</span>
            </span>
          </div>
          <button className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-md shadow-purple-600/30 active:scale-95 transition-all">
            Build AI Agent
          </button>
        </header>

        <div className="flex-1 overflow-y-auto space-y-8 pb-8 scrollbar-none">
          <section className="py-12 px-6 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/60 via-slate-950 to-slate-950 border-b border-purple-900/30">
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[9px] font-mono uppercase tracking-widest mb-3 inline-block">
              Autonomous AI Workflow Engine
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white max-w-xl mx-auto mb-3">
              Supercharge Operations With Custom LLM Agents
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-5">
              Deploy autonomous AI pipelines, real-time code generators, and multi-modal assistants.
            </p>
          </section>

          {/* Interactive Agent Pipeline Simulator */}
          <section className="px-6 max-w-3xl mx-auto">
            <div className="p-4 bg-slate-900/90 border border-purple-900/40 rounded-2xl space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span className="font-mono text-xs font-bold text-white">Agent Pipeline Simulator</span>
                </div>
                <div className="flex gap-1">
                  {(["agent", "model", "embed"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTechTab(tab)}
                      className={`px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-bold uppercase transition-all ${
                        activeTechTab === tab ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl font-mono text-[10px] text-purple-300 space-y-1">
                <p className="text-slate-500">// Executing LLM Agent Graph...</p>
                <p>➔ Initializing Gemini 1.5 Pro Context Tunnel [OK]</p>
                <p>➔ Vector Search RLS Store: 42 documents matched</p>
                <p className="text-emerald-400">✓ Output Stream: 200 OK (latency 120ms)</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // 7. MEDICAL & CLINIC
  // ==========================================================================
  if (template.id === "medical") {
    return (
      <div className={`${containerClass} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100`}>
        <div className="bg-teal-700 text-white text-[9px] font-bold py-1 px-5 flex justify-between items-center">
          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> Emergency Care: 1-800-AURACARE</span>
          <span>Open Mon-Sat: 8AM - 8PM</span>
        </div>

        <header className="py-3 px-5 bg-white dark:bg-slate-900 border-b border-teal-100 dark:border-teal-900/40 flex justify-between items-center sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-teal-600" />
            <span className="font-bold text-sm text-slate-900 dark:text-white">AuraCare Medical</span>
          </div>
          <button className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl shadow-sm active:scale-95 transition-all">
            Book Visit
          </button>
        </header>

        <div className="flex-1 overflow-y-auto space-y-6 pb-8 scrollbar-none">
          <section className="py-12 px-6 bg-gradient-to-b from-teal-50/70 to-white dark:from-slate-900 dark:to-slate-950 text-center border-b border-teal-100 dark:border-teal-900/30">
            <span className="px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-[9px] font-bold mb-3 inline-block">
              Board-Certified Physicians & Surgeons
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white max-w-xl mx-auto mb-2">
              Advanced Clinical Healthcare Built Around You
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-4">
              Comprehensive outpatient care, preventive health screenings, and 24/7 virtual telehealth.
            </p>
          </section>

          <section className="px-6 max-w-3xl mx-auto">
            <h3 className="text-center text-xs font-bold text-slate-900 dark:text-white mb-3">Clinical Departments</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {["Cardiology", "Pediatrics", "Neurology", "Dental Surgery"].map((dept, i) => (
                <div key={i} className="p-3 bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900/50 rounded-xl text-center shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-teal-600 mx-auto mb-1" />
                  <p className="font-bold text-xs text-slate-900 dark:text-white">{dept}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // 8. REAL ESTATE
  // ==========================================================================
  if (template.id === "realestate") {
    return (
      <div className={`${containerClass} bg-[#0A0E17] text-slate-100`}>
        <header className="py-3 px-5 bg-[#0A0E17] border-b border-slate-800 flex justify-between items-center sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-sm text-white tracking-wide">APEX ESTATES</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
            <span>Buy</span>
            <span>Rent</span>
            <span>Penthouses</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto space-y-6 pb-8 scrollbar-none">
          <section className="py-12 px-6 text-center bg-gradient-to-b from-blue-950/40 to-[#0A0E17] border-b border-slate-800">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white max-w-xl mx-auto mb-3">
              Discover Architectural Masterpieces
            </h1>
            <div className="max-w-md mx-auto p-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
              <input
                type="text"
                placeholder="City, ZIP, or property title..."
                className="bg-transparent text-xs text-white focus:outline-none flex-1"
                readOnly
              />
              <button className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg">Search</button>
            </div>
          </section>

          <section className="px-6 max-w-3xl mx-auto">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Featured Listings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                { title: "The Glass House Penthouse", loc: "Tribeca, NY", price: "$4,250,000", spec: "3 Beds • 3.5 Baths • 3,200 sqft" },
                { title: "Oceanfront Modern Villa", loc: "Malibu, CA", price: "$8,900,000", spec: "5 Beds • 6 Baths • 6,500 sqft" },
              ].map((prop, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2">
                  <div className="h-24 bg-slate-950 rounded-xl flex items-center justify-center border border-slate-800">
                    <Building2 className="w-7 h-7 text-blue-400/40" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-white">{prop.title}</h4>
                      <p className="text-[10px] text-slate-400">{prop.loc}</p>
                    </div>
                    <span className="text-xs font-bold text-blue-400">{prop.price}</span>
                  </div>
                  <p className="text-[9px] text-slate-500 font-mono">{prop.spec}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // 9. PORTFOLIO
  // ==========================================================================
  if (template.id === "portfolio") {
    return (
      <div className={`${containerClass} bg-zinc-950 text-zinc-100 font-mono`}>
        <header className="py-3.5 px-6 border-b border-zinc-800 flex justify-between items-center sticky top-0 z-10 shrink-0">
          <span className="font-bold text-xs text-pink-400">ALEX.DESIGN</span>
          <span className="text-[9px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded-full">
            ● AVAILABLE FOR Q3 2026
          </span>
        </header>

        <div className="flex-1 overflow-y-auto space-y-6 pb-8 scrollbar-none">
          <section className="py-12 px-6 max-w-xl mx-auto">
            <h1 className="text-xl sm:text-3xl font-black text-white leading-tight mb-3">
              PRODUCT DESIGNER & INTERFACE STRATEGIST
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Designing high-conversion SaaS web applications, design systems, and webGL interactive experiences.
            </p>
          </section>

          <section className="px-6 max-w-3xl mx-auto space-y-3 font-sans">
            <p className="text-[9px] font-mono text-pink-400 uppercase tracking-widest">Selected Works</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                { title: "Fintech Command Dashboard", cat: "UI/UX • Design System" },
                { title: "AI Code Assistant Identity", cat: "Branding • WebGL" },
              ].map((proj, i) => (
                <div key={i} className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-2 hover:border-pink-500/40 transition-colors">
                  <div className="h-28 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-850">
                    <Sparkles className="w-6 h-6 text-pink-400/40" />
                  </div>
                  <h4 className="font-bold text-xs text-white">{proj.title}</h4>
                  <p className="text-[9px] text-zinc-500 font-mono">{proj.cat}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // 10. DEFAULT FALLBACK
  // ==========================================================================
  return (
    <div className={`${containerClass} bg-white dark:bg-slate-900`}>
      <header className="py-3 px-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <span className="font-bold text-xs text-slate-900 dark:text-white" style={{ color: primary }}>
          {template.name}
        </span>
        <button className="px-3 py-1 text-[10px] font-bold text-white rounded-lg" style={{ backgroundColor: primary }}>
          Explore
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-none">
        <section className="text-center py-10 px-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
            Welcome to {template.name}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
            {template.description}
          </p>
        </section>
      </div>
    </div>
  );
}
