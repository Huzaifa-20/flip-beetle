import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes": string[];
}

async function verifyTurnstileToken(token: string): Promise<TurnstileVerifyResponse> {
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    }
  );
  return response.json();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmailHtml(email: string, phone: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background-color:#f8f8f5;font-family:system-ui,-apple-system,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f8f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border:1.5px solid #0c0c0c;box-shadow:4px 4px 0 #0c0c0c;">

          <!-- Header -->
          <tr>
            <td style="background-color:#0c0c0c;padding:28px 32px;">
              <h1 style="margin:0;font-size:20px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#f8f8f5;">
                Flip Beetle
              </h1>
              <p style="margin:6px 0 0;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#8a8a84;">
                New Contact Submission
              </p>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding:32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:20px;border-bottom:1px solid #e0e0db;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#8a8a84;">From</p>
                    <a href="mailto:${escapeHtml(email)}" style="font-size:16px;color:#0c0c0c;font-weight:600;text-decoration:none;">${escapeHtml(email)}</a>
                  </td>
                </tr>${phone ? `
                <tr>
                  <td style="padding:20px 0;border-bottom:1px solid #e0e0db;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#8a8a84;">Phone</p>
                    <p style="margin:0;font-size:16px;color:#0c0c0c;">${escapeHtml(phone)}</p>
                  </td>
                </tr>` : ""}
                <tr>
                  <td style="padding-top:20px;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#8a8a84;">Message</p>
                    <p style="margin:0;font-size:15px;line-height:1.7;color:#2a2a27;white-space:pre-wrap;">${escapeHtml(message)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reply Button -->
          <tr>
            <td style="padding:0 32px 32px;">
              <a href="mailto:${escapeHtml(email)}" style="display:inline-block;padding:12px 28px;background-color:#0c0c0c;color:#f8f8f5;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;text-decoration:none;border:1.5px solid #0c0c0c;">
                Reply
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #e0e0db;">
              <p style="margin:0;font-size:11px;color:#8a8a84;letter-spacing:0.5px;">
                Sent via the Flip Beetle contact form
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const { email, phone, message, turnstileToken } = await request.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    if (!turnstileToken) {
      return NextResponse.json(
        { error: "CAPTCHA verification is required" },
        { status: 400 }
      );
    }

    const turnstileResult = await verifyTurnstileToken(turnstileToken);
    if (!turnstileResult.success) {
      console.error("Turnstile verification failed:", turnstileResult["error-codes"]);
      return NextResponse.json(
        { error: "CAPTCHA verification failed. Please try again." },
        { status: 403 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      subject: `New Contact Form Submission from ${email}`,
      replyTo: email,
      html: buildEmailHtml(email, phone, message),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
