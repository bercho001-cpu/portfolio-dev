import { NextResponse } from 'next/server';
import { Resend } from 'resend';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;

    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please provide a valid name (at least 2 characters)' },
        { status: 400 }
      );
    }
    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Name exceeds maximum length of 100 characters' },
        { status: 400 }
      );
    }

    // Validate email
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    if (email.length > 254) {
      return NextResponse.json(
        { error: 'Email exceeds maximum length of 254 characters' },
        { status: 400 }
      );
    }

    // Validate message
    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please provide a message with at least 5 characters' },
        { status: 400 }
      );
    }
    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message exceeds maximum length of 5000 characters' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = typeof subject === 'string' && subject.trim() ? subject.trim() : '';
    const trimmedMessage = message.trim();

    const apiKey = process.env.RESEND_API_KEY || process.env['RESEND-API-KEY'];
    if (!apiKey) {
      console.error('RESEND_API_KEY is not defined in environment variables');
      return NextResponse.json(
        { error: 'Email service configuration error. Please contact me directly via email.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const toEmail = 'bercho001@gmail.com';
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
    const emailSubject = trimmedSubject
      ? `[Portfolio] ${trimmedSubject}`
      : `[Portfolio] New message from ${trimmedName}`;

    const textContent = `You received a new message from your portfolio website:

Name: ${trimmedName}
Email: ${trimmedEmail}
Subject: ${trimmedSubject || 'General Inquiry'}

Message:
${trimmedMessage}
`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #ffffff; color: #1a202c;">
        <div style="border-bottom: 2px solid #1976d2; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #1976d2; margin: 0 0 6px 0; font-size: 22px;">New Contact Submission</h2>
          <p style="margin: 0; color: #718096; font-size: 14px;">Received from Fernando Soria Portfolio</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: 600; color: #4a5568; width: 90px;">From:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; color: #1a202c;">${escapeHtml(trimmedName)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: 600; color: #4a5568;">Email:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; color: #1a202c;">
              <a href="mailto:${escapeHtml(trimmedEmail)}" style="color: #1976d2; text-decoration: none;">${escapeHtml(trimmedEmail)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: 600; color: #4a5568;">Subject:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; color: #1a202c;">${escapeHtml(trimmedSubject || 'General Inquiry')}</td>
          </tr>
        </table>
        <div style="background-color: #f7fafc; padding: 18px; border-radius: 8px; border-left: 4px solid #1976d2; margin-bottom: 24px;">
          <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #4a5568;">Message:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6; margin: 0; color: #2d3748; font-size: 15px;">${escapeHtml(trimmedMessage)}</p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7; padding-top: 16px;">
          Sent via Fernando Soria Portfolio Contact Form &bull; Reply directly to this email to reply to ${escapeHtml(trimmedName)}
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toEmail],
      replyTo: trimmedEmail,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to send email via Resend' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: unknown) {
    console.error('Unhandled contact route error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred while sending your message' },
      { status: 500 }
    );
  }
}
