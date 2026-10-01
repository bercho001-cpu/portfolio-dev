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
        { error: 'Cuerpo de la solicitud inválido' },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;

    // Validar nombre
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Por favor, ingresá un nombre válido (al menos 2 caracteres)' },
        { status: 400 }
      );
    }
    if (name.length > 100) {
      return NextResponse.json(
        { error: 'El nombre supera el máximo de 100 caracteres' },
        { status: 400 }
      );
    }

    // Validar email
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: 'Por favor, ingresá un correo electrónico válido' },
        { status: 400 }
      );
    }
    if (email.length > 254) {
      return NextResponse.json(
        { error: 'El correo electrónico supera el máximo de 254 caracteres' },
        { status: 400 }
      );
    }

    // Validar mensaje
    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { error: 'Por favor, ingresá un mensaje con al menos 5 caracteres' },
        { status: 400 }
      );
    }
    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'El mensaje supera el máximo de 5000 caracteres' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = typeof subject === 'string' && subject.trim() ? subject.trim() : '';
    const trimmedMessage = message.trim();

    const apiKey = process.env.RESEND_API_KEY || process.env['RESEND-API-KEY'];
    if (!apiKey) {
      console.error('RESEND_API_KEY no está definida en las variables de entorno');
      return NextResponse.json(
        { error: 'Error de configuración del servicio de email. Por favor, escribime directamente por correo.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const toEmail = 'bercho001@gmail.com';
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
    const emailSubject = trimmedSubject
      ? `[Portfolio] ${trimmedSubject}`
      : `[Portfolio] Nuevo mensaje de ${trimmedName}`;

    const textContent = `Recibiste un nuevo mensaje desde tu portfolio web:

Nombre: ${trimmedName}
Email: ${trimmedEmail}
Asunto: ${trimmedSubject || 'Consulta general'}

Mensaje:
${trimmedMessage}
`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #ffffff; color: #1a202c;">
        <div style="border-bottom: 2px solid #1976d2; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #1976d2; margin: 0 0 6px 0; font-size: 22px;">Nueva Consulta de Contacto</h2>
          <p style="margin: 0; color: #718096; font-size: 14px;">Recibido desde el portfolio de Fernando Soria</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: 600; color: #4a5568; width: 90px;">De:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; color: #1a202c;">${escapeHtml(trimmedName)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: 600; color: #4a5568;">Email:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; color: #1a202c;">
              <a href="mailto:${escapeHtml(trimmedEmail)}" style="color: #1976d2; text-decoration: none;">${escapeHtml(trimmedEmail)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: 600; color: #4a5568;">Asunto:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; color: #1a202c;">${escapeHtml(trimmedSubject || 'Consulta general')}</td>
          </tr>
        </table>
        <div style="background-color: #f7fafc; padding: 18px; border-radius: 8px; border-left: 4px solid #1976d2; margin-bottom: 24px;">
          <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #4a5568;">Mensaje:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6; margin: 0; color: #2d3748; font-size: 15px;">${escapeHtml(trimmedMessage)}</p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7; padding-top: 16px;">
          Enviado desde el formulario de contacto del portfolio de Fernando Soria &bull; Respondé directamente a este correo para escribirle a ${escapeHtml(trimmedName)}
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
      console.error('Error de Resend API:', error);
      return NextResponse.json(
        { error: error.message || 'No se pudo enviar el correo mediante el servicio' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: unknown) {
    console.error('Error inesperado en route de contacto:', err);
    return NextResponse.json(
      { error: 'Ocurrió un error inesperado al enviar tu mensaje' },
      { status: 500 }
    );
  }
}
