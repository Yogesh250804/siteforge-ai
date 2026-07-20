import { GoogleGenerativeAI } from "@google/generative-ai";
import { BusinessInfo, GeneratedContent } from "./types/database";

// Check for API key
const apiKey = process.env.GEMINI_API_KEY || "";

// Initialize Google Gen AI only if API key is present
const ai = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * Generates custom, rich mockup content using the Gemini API.
 * Falls back to rich template-specific content if the API key is missing or calls fail.
 */
export async function generateWebsiteContent(
  businessInfo: BusinessInfo,
  templateId: string
): Promise<GeneratedContent> {
  const { name, industry, description, email = "", phone = "", address = "" } = businessInfo;

  if (ai) {
    try {
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        You are an expert copywriter and UI designer for modern websites.
        Your task is to generate website content for a business named "${name}" in the "${industry}" industry.
        Business Description: "${description}"

        Generate a complete, high-quality, conversion-optimized set of content in JSON format.
        Return ONLY a raw JSON object. Do not include markdown code block formatting (no \`\`\`json or \`\`\`).
        The JSON must match the following TypeScript interface strictly:
        {
          "heroHeading": string, (Catchy, bold headline)
          "heroSubheading": string, (Elaborative subheadline)
          "heroCtaText": string, (Call to action button text)
          "aboutText": string, (A compelling 2-3 sentence paragraph about the business history or mission)
          "services": Array<{ "title": string, "description": string, "icon": string }>, (Generate 3 relevant services. Use simple Lucide icon names like "Sparkles", "Shield", "Zap", "Heart", "Clock", "Coffee", "Camera", "Briefcase", "Scissors", "Dumbbell", "Utensils")
          "testimonials": Array<{ "name": string, "role": string, "text": string }>, (Generate 2 positive customer reviews)
          "contactFormEnabled": boolean, (Set to true)
          "footerText": string (Copyright or footer branding text)
        }
      `;

      const response = await model.generateContent(prompt);
      const text = response.response.text().trim();
      
      // Attempt to clean markdown backticks if returned
      const cleanJson = text.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
      const parsed = JSON.parse(cleanJson);
      
      return {
        heroHeading: parsed.heroHeading || `Welcome to ${name}`,
        heroSubheading: parsed.heroSubheading || description,
        heroCtaText: parsed.heroCtaText || "Get Started",
        aboutText: parsed.aboutText || `At ${name}, we are dedicated to delivering the best experience in ${industry}.`,
        services: parsed.services || [],
        testimonials: parsed.testimonials || [],
        contactFormEnabled: parsed.contactFormEnabled !== false,
        footerText: parsed.footerText || `© ${new Date().getFullYear()} ${name}. All rights reserved.`
      };
    } catch (e) {
      console.error("Gemini API call failed, falling back to static template generator", e);
    }
  }

  // Fallback rich static generation
  return getFallbackContent(name, industry, description, templateId);
}

function getFallbackContent(
  name: string,
  industry: string,
  description: string,
  templateId: string
): GeneratedContent {
  const fallbackDesc = description || `Your premier partner in ${industry || templateId}.`;
  
  const defaults: Record<string, Partial<GeneratedContent>> = {
    restaurant: {
      heroHeading: `Welcome to ${name}`,
      heroSubheading: fallbackDesc,
      heroCtaText: "View Our Menu",
      aboutText: `At ${name}, we combine fresh local ingredients, artisanal techniques, and a warm, inviting atmosphere to create unforgettable culinary journeys.`,
      services: [
        { title: "Gourmet Dining", description: "Experience chef-crafted seasonal delicacies in our cozy dining room.", icon: "Utensils" },
        { title: "Private Events", description: "Host your birthdays, anniversaries, or corporate gatherings with tailored catering.", icon: "Sparkles" },
        { title: "Fast Takeaway", description: "Enjoy your favorite dishes from the comfort of your home with easy ordering.", icon: "Clock" }
      ],
      testimonials: [
        { name: "Sarah J.", role: "Local Foodie", text: "The flavors here are absolutely unmatched. Outstanding service every single time!" },
        { name: "Michael T.", role: "Regular Guest", text: "A wonderful atmosphere paired with brilliant dishes. Highly recommend the chef specials." }
      ]
    },
    salon: {
      heroHeading: `Pamper Yourself at ${name}`,
      heroSubheading: fallbackDesc,
      heroCtaText: "Book Appointment",
      aboutText: `Our mission at ${name} is to deliver expert beauty treatments, haircuts, and spa therapies designed to rejuvenate your style and spirit.`,
      services: [
        { title: "Expert Hairstyling", description: "From modern cuts to customized organic coloring and therapy.", icon: "Scissors" },
        { title: "Rejuvenating Facials", description: "Deep cleansing and premium skincare treatments for a glowing look.", icon: "Sparkles" },
        { title: "Nail & Spa Services", description: "Relaxing manicures, pedicures, and aromatherapy massage.", icon: "Heart" }
      ],
      testimonials: [
        { name: "Emily R.", role: "Loyal Client", text: "I always leave feeling like a brand new person. The stylists are true artists!" },
        { name: "Jessica K.", role: "Regular Visitor", text: "Amazing organic products and a peaceful atmosphere. Truly the best spa in town." }
      ]
    },
    gym: {
      heroHeading: `Push Your Limits at ${name}`,
      heroSubheading: fallbackDesc,
      heroCtaText: "Claim Free Pass",
      aboutText: `Join ${name} to access top-tier training facilities, certified trainers, and dynamic group fitness classes built to achieve your dream physique.`,
      services: [
        { title: "Personal Coaching", description: "Custom exercise plans and nutrition guide matching your health goals.", icon: "Dumbbell" },
        { title: "Group Fitness", description: "High-intensity training, yoga, and spin classes guided by expert coaches.", icon: "Zap" },
        { title: "24/7 Facility Access", description: "Train whenever it suits your schedule with secure round-the-clock membership.", icon: "Clock" }
      ],
      testimonials: [
        { name: "David M.", role: "Member since 2024", text: "The community and support here helped me drop 30 lbs and gain muscle. Best gym ever!" },
        { name: "Linda S.", role: "Yoga enthusiast", text: "Spacious studio, awesome instructors, and clean locker rooms. 10/10." }
      ]
    }
  };

  const selectedDefault = defaults[templateId] || {
    heroHeading: `Welcome to ${name}`,
    heroSubheading: fallbackDesc,
    heroCtaText: "Learn More",
    aboutText: `At ${name}, we pride ourselves on exceptional service and standard-setting expertise in ${industry || "our field"}.`,
    services: [
      { title: "Premium Service", description: "Tailor-made solutions designed around your direct business specifications.", icon: "Sparkles" },
      { title: "Reliability & Speed", description: "Fast delivery, responsive assistance, and absolute quality assurance.", icon: "Zap" },
      { title: "Expert Consultation", description: "Work closely with our certified professionals to build your success.", icon: "Briefcase" }
    ],
    testimonials: [
      { name: "John D.", role: "Client", text: "Professional, fast, and exceeded all expectations. We are happy partners." },
      { name: "Alice W.", role: "Business Owner", text: "Their approach to modern client needs is absolutely top tier." }
    ]
  };

  return {
    heroHeading: selectedDefault.heroHeading!,
    heroSubheading: selectedDefault.heroSubheading!,
    heroCtaText: selectedDefault.heroCtaText!,
    aboutText: selectedDefault.aboutText!,
    services: selectedDefault.services!,
    testimonials: selectedDefault.testimonials!,
    contactFormEnabled: true,
    footerText: `© ${new Date().getFullYear()} ${name}. All rights reserved.`
  };
}
