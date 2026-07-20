// ============================================================================
// Template Definitions for SiteForge AI
// 10 industry-specific responsive website templates
// ============================================================================

export interface TemplateSection {
  id: string;
  name: string;
  description: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string; // Lucide icon name
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  defaultSections: TemplateSection[];
  previewImage: string; // placeholder path
}

export const templates: Template[] = [
  {
    id: "restaurant",
    name: "Restaurant & Dining",
    description:
      "Perfect for restaurants, cafes, bistros, and food trucks. Features menu displays, reservations, and gallery sections.",
    category: "Food & Beverage",
    icon: "Utensils",
    colorScheme: {
      primary: "#D97706",
      secondary: "#92400E",
      accent: "#FDE68A",
    },
    defaultSections: [
      { id: "hero", name: "Hero Banner", description: "Full-width hero with tagline and CTA" },
      { id: "menu", name: "Menu Highlights", description: "Featured dishes with prices" },
      { id: "about", name: "Our Story", description: "Restaurant history and philosophy" },
      { id: "gallery", name: "Photo Gallery", description: "Ambience and food photography" },
      { id: "reservations", name: "Reservations", description: "Table booking form" },
      { id: "contact", name: "Contact & Hours", description: "Location, hours, and contact info" },
    ],
    previewImage: "/templates/restaurant.png",
  },
  {
    id: "salon",
    name: "Beauty Salon & Spa",
    description:
      "Designed for hair salons, nail studios, spas, and beauty clinics. Showcases services, pricing, and online booking.",
    category: "Beauty & Wellness",
    icon: "Scissors",
    colorScheme: {
      primary: "#9333EA",
      secondary: "#6B21A8",
      accent: "#E9D5FF",
    },
    defaultSections: [
      { id: "hero", name: "Hero Banner", description: "Elegant hero with booking CTA" },
      { id: "services", name: "Our Services", description: "Treatment menu with pricing" },
      { id: "team", name: "Meet Our Team", description: "Stylist/therapist profiles" },
      { id: "gallery", name: "Portfolio", description: "Before/after transformations" },
      { id: "testimonials", name: "Client Reviews", description: "Customer testimonials" },
      { id: "booking", name: "Book Appointment", description: "Online booking form" },
      { id: "contact", name: "Contact", description: "Location and contact details" },
    ],
    previewImage: "/templates/salon.png",
  },
  {
    id: "gym",
    name: "Fitness & Gym",
    description:
      "Built for gyms, fitness studios, yoga centers, and personal trainers. Highlights classes, memberships, and trainers.",
    category: "Health & Fitness",
    icon: "Dumbbell",
    colorScheme: {
      primary: "#2563EB",
      secondary: "#1E40AF",
      accent: "#93C5FD",
    },
    defaultSections: [
      { id: "hero", name: "Hero Banner", description: "Motivational hero with membership CTA" },
      { id: "classes", name: "Class Schedule", description: "Weekly class timetable" },
      { id: "trainers", name: "Our Trainers", description: "Trainer bios and specialties" },
      { id: "pricing", name: "Membership Plans", description: "Pricing tiers and features" },
      { id: "gallery", name: "Facility Tour", description: "Gym equipment and spaces" },
      { id: "testimonials", name: "Success Stories", description: "Member transformations" },
      { id: "contact", name: "Contact & Location", description: "Address and contact form" },
    ],
    previewImage: "/templates/gym.png",
  },
  {
    id: "consulting",
    name: "Consulting & Agency",
    description:
      "Professional template for consulting firms, agencies, and B2B service providers. Clean, corporate, and trustworthy.",
    category: "Professional Services",
    icon: "Briefcase",
    colorScheme: {
      primary: "#0F172A",
      secondary: "#334155",
      accent: "#38BDF8",
    },
    defaultSections: [
      { id: "hero", name: "Hero Banner", description: "Professional hero with consultation CTA" },
      { id: "services", name: "Our Services", description: "Service offerings with descriptions" },
      { id: "process", name: "Our Process", description: "Step-by-step workflow" },
      { id: "caseStudies", name: "Case Studies", description: "Client success stories" },
      { id: "team", name: "Leadership Team", description: "Team member profiles" },
      { id: "contact", name: "Get in Touch", description: "Contact form and office details" },
    ],
    previewImage: "/templates/consulting.png",
  },
  {
    id: "portfolio",
    name: "Creative Portfolio",
    description:
      "Showcase for designers, developers, artists, and freelancers. Focused on visual work samples and project case studies.",
    category: "Creative",
    icon: "Palette",
    colorScheme: {
      primary: "#EC4899",
      secondary: "#BE185D",
      accent: "#FDF2F8",
    },
    defaultSections: [
      { id: "hero", name: "Introduction", description: "Personal intro with tagline" },
      { id: "portfolio", name: "Featured Work", description: "Project showcase grid" },
      { id: "about", name: "About Me", description: "Background and skills" },
      { id: "skills", name: "Skills & Tools", description: "Technical capabilities" },
      { id: "testimonials", name: "Client Feedback", description: "Endorsements and reviews" },
      { id: "contact", name: "Hire Me", description: "Contact form and availability" },
    ],
    previewImage: "/templates/portfolio.png",
  },
  {
    id: "agency",
    name: "Digital Agency",
    description:
      "Modern template for digital marketing, web development, and creative agencies. Bold visuals and results-driven layout.",
    category: "Technology",
    icon: "Rocket",
    colorScheme: {
      primary: "#7C3AED",
      secondary: "#5B21B6",
      accent: "#A78BFA",
    },
    defaultSections: [
      { id: "hero", name: "Hero Banner", description: "Dynamic hero with portfolio showcase" },
      { id: "services", name: "What We Do", description: "Service areas with icons" },
      { id: "work", name: "Our Work", description: "Project portfolio with filters" },
      { id: "stats", name: "By the Numbers", description: "Key metrics and achievements" },
      { id: "team", name: "The Team", description: "Team member grid" },
      { id: "blog", name: "Insights", description: "Recent articles and thought leadership" },
      { id: "contact", name: "Start a Project", description: "Project inquiry form" },
    ],
    previewImage: "/templates/agency.png",
  },
  {
    id: "medical",
    name: "Medical & Healthcare",
    description:
      "Trusted template for clinics, doctors, dentists, and healthcare providers. HIPAA-friendly design with appointment booking.",
    category: "Healthcare",
    icon: "Heart",
    colorScheme: {
      primary: "#0D9488",
      secondary: "#115E59",
      accent: "#CCFBF1",
    },
    defaultSections: [
      { id: "hero", name: "Hero Banner", description: "Welcoming hero with appointment CTA" },
      { id: "services", name: "Our Services", description: "Medical services offered" },
      { id: "doctors", name: "Our Doctors", description: "Physician profiles and specialties" },
      { id: "insurance", name: "Insurance & Plans", description: "Accepted insurance providers" },
      { id: "testimonials", name: "Patient Reviews", description: "Patient testimonials" },
      { id: "appointment", name: "Book Appointment", description: "Online scheduling form" },
      { id: "contact", name: "Contact & Location", description: "Clinic address and hours" },
    ],
    previewImage: "/templates/medical.png",
  },
  {
    id: "realestate",
    name: "Real Estate",
    description:
      "Property listing template for real estate agents, brokers, and agencies. Features property search, listings, and agent profiles.",
    category: "Real Estate",
    icon: "Building2",
    colorScheme: {
      primary: "#1E3A5F",
      secondary: "#0F2440",
      accent: "#60A5FA",
    },
    defaultSections: [
      { id: "hero", name: "Property Search", description: "Hero with search bar and featured listing" },
      { id: "featured", name: "Featured Listings", description: "Top property cards" },
      { id: "services", name: "Our Services", description: "Buying, selling, renting services" },
      { id: "about", name: "About the Agency", description: "Company history and values" },
      { id: "agents", name: "Our Agents", description: "Agent profiles and contact" },
      { id: "testimonials", name: "Client Stories", description: "Buyer/seller testimonials" },
      { id: "contact", name: "Contact Us", description: "Inquiry form and office location" },
    ],
    previewImage: "/templates/realestate.png",
  },
  {
    id: "ecommerce",
    name: "E-Commerce Storefront",
    description:
      "Product showcase template for online stores and boutiques. Highlights products, categories, and promotions.",
    category: "Retail",
    icon: "ShoppingBag",
    colorScheme: {
      primary: "#DC2626",
      secondary: "#991B1B",
      accent: "#FEE2E2",
    },
    defaultSections: [
      { id: "hero", name: "Hero Banner", description: "Promotional hero with featured product" },
      { id: "featured", name: "Featured Products", description: "Top product grid" },
      { id: "categories", name: "Shop by Category", description: "Category browsing cards" },
      { id: "deals", name: "Special Offers", description: "Sale and promotional items" },
      { id: "about", name: "Our Brand Story", description: "Brand values and mission" },
      { id: "reviews", name: "Customer Reviews", description: "Product reviews and ratings" },
      { id: "newsletter", name: "Newsletter", description: "Email signup for deals" },
      { id: "contact", name: "Contact & Support", description: "Customer support and FAQ" },
    ],
    previewImage: "/templates/ecommerce.png",
  },
  {
    id: "photography",
    name: "Photography Studio",
    description:
      "Visual-first template for photographers, videographers, and visual artists. Fullscreen galleries and clean presentation.",
    category: "Creative",
    icon: "Camera",
    colorScheme: {
      primary: "#18181B",
      secondary: "#27272A",
      accent: "#FAFAFA",
    },
    defaultSections: [
      { id: "hero", name: "Visual Hero", description: "Fullscreen photo hero with overlay text" },
      { id: "portfolio", name: "Portfolio Gallery", description: "Masonry grid of work" },
      { id: "services", name: "Photography Services", description: "Session types and pricing" },
      { id: "about", name: "About the Artist", description: "Photographer bio and style" },
      { id: "testimonials", name: "Client Love", description: "Client testimonials" },
      { id: "pricing", name: "Packages & Pricing", description: "Service packages" },
      { id: "contact", name: "Book a Session", description: "Booking inquiry form" },
    ],
    previewImage: "/templates/photography.png",
  },
];

/**
 * Look up a template by its ID.
 */
export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}

/**
 * Get all unique template categories.
 */
export function getTemplateCategories(): string[] {
  return [...new Set(templates.map((t) => t.category))];
}
