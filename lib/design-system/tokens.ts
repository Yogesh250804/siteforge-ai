// ============================================================================
// SiteForge Design System Tokens
// Inspired by Linear, Raycast, Vercel, Stripe, and Apple design languages.
// ============================================================================

export interface ThemeTokens {
  id: string;
  name: string;
  colors: {
    bg: string;
    bgSubtle: string;
    surface: string;
    border: string;
    borderHighlight: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    accentGlow: string;
  };
  typography: {
    fontSans: string;
    fontSerif?: string;
    fontMono?: string;
  };
  radius: {
    card: string;
    button: string;
    badge: string;
  };
}

export const ThemePresets = {
  linearDark: {
    id: "linear-dark",
    name: "Linear Dark Modern",
    colors: {
      bg: "bg-[#0A0C10]",
      bgSubtle: "bg-[#12151E]",
      surface: "bg-slate-900/90",
      border: "border-slate-800",
      borderHighlight: "border-blue-500/50",
      textPrimary: "text-white",
      textSecondary: "text-slate-400",
      accent: "#3B82F6",
      accentGlow: "bg-blue-500/10",
    },
    typography: {
      fontSans: "font-sans",
      fontMono: "font-mono",
    },
    radius: {
      card: "rounded-2xl",
      button: "rounded-xl",
      badge: "rounded-full",
    },
  },
  michelinSerif: {
    id: "michelin-serif",
    name: "Michelin Editorial",
    colors: {
      bg: "bg-[#0D0B09]",
      bgSubtle: "bg-amber-950/20",
      surface: "bg-[#14100D]",
      border: "border-amber-900/30",
      borderHighlight: "border-amber-500/40",
      textPrimary: "text-amber-50",
      textSecondary: "text-amber-200/60",
      accent: "#F59E0B",
      accentGlow: "bg-amber-500/10",
    },
    typography: {
      fontSans: "font-sans",
      fontSerif: "font-serif",
    },
    radius: {
      card: "rounded-2xl",
      button: "rounded-xl",
      badge: "rounded-full",
    },
  },
  vercleCyberpunk: {
    id: "vercel-cyberpunk",
    name: "Vercel Cyberpunk AI",
    colors: {
      bg: "bg-slate-950",
      bgSubtle: "bg-slate-900/80",
      surface: "bg-slate-900",
      border: "border-purple-900/40",
      borderHighlight: "border-purple-500/50",
      textPrimary: "text-white",
      textSecondary: "text-slate-400",
      accent: "#A855F7",
      accentGlow: "bg-purple-500/10",
    },
    typography: {
      fontSans: "font-sans",
      fontMono: "font-mono",
    },
    radius: {
      card: "rounded-2xl",
      button: "rounded-xl",
      badge: "rounded-full",
    },
  },
};

export const defaultSpringTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};
