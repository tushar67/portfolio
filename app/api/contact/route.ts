import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "your@email.com",
    subject: "New Portfolio Contact",
    html: `
      <h2>New Message</h2>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>${message}</p>
    `,
  });

  return Response.json({ success: true });
}