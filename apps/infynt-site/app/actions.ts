"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Please fill in all required fields." };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Infynt Contact <onboarding@resend.dev>", // Transition to your verified domain later
      to: ["hello@infynt.com"],
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
      console.error("Resend Error:", error);
      return { error: "Failed to send message. Please try again later." };
    }

    return { success: "Thank you! Your message has been sent." };
  } catch (error) {
    console.error("Contact Form Error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}
