"use server";

import { Resend } from "resend";

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Please fill in all required fields." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY environment variable");
    return { error: "Email configuration missing." };
  }

  const resend = new Resend(apiKey);
  
  // Use the verified email from environment or default to hello@infynt.com
  // Note: Resend Sandbox only allows sending to your account email (roshan2008web@gmail.com)
  const recipient = process.env.CONTACT_EMAIL || "hello@infynt.com";

  try {
    console.log(`[Contact Form] Submission from ${name} (${email}) to ${recipient}`);

    const { data, error } = await resend.emails.send({
      from: "Infynt Contact <onboarding@resend.dev>",
      to: [recipient],
      subject: `New Lead: ${subject} from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Service: ${subject}

Message:
${message}
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      
      // Provide a helpful message for sandbox mode
      if (error.message.includes("You can only send testing emails")) {
        return { 
          error: "Sandbox Restriction: Please update CONTACT_EMAIL in your .env to your Resend account email (e.g., roshan2008web@gmail.com) until your domain (infynt.com) is verified." 
        };
      }
      
      return { error: `Service error: ${error.message}` };
    }

    console.log("Email sent successfully. ID:", data?.id);
    return { success: "Thank you! Your message has been sent successfully." };
  } catch (err: any) {
    console.error("Contact Form Exception:", err);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
