"use server";

import { z } from "zod";

const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(5, "Message must be at least 5 characters."),
  projectId: z.string().min(1),
});

export type ContactActionState = {
  success: boolean;
  error?: string;
};

/**
 * Server Action to submit contact form messages from public sites.
 * Can be integrated with Email or DB messages logs later.
 */
export async function submitContactFormAction(
  formData: FormData
): Promise<ContactActionState> {
  const parsed = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    projectId: formData.get("projectId"),
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors)[0]?.[0] || "Invalid form data.";
    return { success: false, error: firstError };
  }

  // Simulate storing message
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { success: true };
}
