import nodemailer from 'nodemailer';

interface SendOtpEmailParams {
  to: string;
  otp: string;
  recipientName?: string;
}

export async function sendAdminOtpEmail({ to, otp, recipientName }: SendOtpEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || '';
    const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD || '';
    
    // Ensure the FROM header strictly matches the authenticated SMTP user to avoid SPF / DMARC spam flags
    const senderDisplayName = 'Monsi Engineering';
    const smtpFrom = process.env.SMTP_FROM && process.env.SMTP_FROM.includes('<') 
      ? process.env.SMTP_FROM 
      : (smtpUser ? `"${senderDisplayName}" <${smtpUser}>` : `"${senderDisplayName}" <security@monsi.com>`);

    // Always log OTP to server console for testing/debugging convenience
    console.log('\n======================================================');
    console.log(`🔑 [ADMIN OTP DISPATCH]`);
    console.log(`📧 Recipient: ${to}`);
    console.log(`🔢 6-Digit OTP Code: >>> ${otp} <<<`);
    console.log(`⏱️  Validity: 10 minutes (Session duration: 3 Hours)`);
    console.log('======================================================\n');

    // If SMTP credentials are not configured, return success with console log
    if (!smtpUser || !smtpPass) {
      console.warn('⚠️ SMTP credentials not found in .env. Email was logged to console above. Set SMTP_USER and SMTP_PASS to send actual emails.');
      return { success: true };
    }

    const isGmail = smtpHost.includes('gmail.com');

    const transporter = nodemailer.createTransport(
      isGmail
        ? {
            service: 'gmail',
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          }
        : {
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
            tls: {
              rejectUnauthorized: false,
            },
          }
    );

    const name = recipientName ? recipientName.trim() : 'Administrator';

    // High deliverability, spam-safe HTML template
    const htmlContent = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Monsi Engineering Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f6f8; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
          
          <!-- Top Header -->
          <tr>
            <td align="center" style="background-color: #021819; padding: 32px 24px; border-bottom: 3px solid #0C969C;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <span style="font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">MONSI ENGINEERING</span>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 6px;">
                    <span style="font-size: 11px; font-weight: 600; color: #E3F0B6; letter-spacing: 2px; text-transform: uppercase;">Account Security Verification</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 36px 32px 24px 32px;">
              <p style="margin: 0 0 16px 0; font-size: 16px; color: #0f172a; font-weight: 600;">
                Hello ${name},
              </p>
              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #475569;">
                We received an admin sign-in request for your Monsi Engineering account. Please use the following one-time verification code to complete your login:
              </p>

              <!-- OTP Code Display Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0;">
                <tr>
                  <td align="center" style="background-color: #f8fafc; border: 2px solid #0C969C; border-radius: 12px; padding: 24px 16px;">
                    <div style="font-size: 11px; font-weight: 700; color: #0C969C; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Your 6-Digit Security Code</div>
                    <div style="font-size: 40px; font-weight: 900; letter-spacing: 12px; color: #021819; font-family: 'Courier New', Courier, monospace; padding-left: 12px;">${otp}</div>
                    <div style="font-size: 12px; color: #64748b; margin-top: 10px; font-weight: 500;">Valid for 10 minutes &bull; Authorizes a 3-hour session</div>
                  </td>
                </tr>
              </table>

              <!-- Informational Notice -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td style="background-color: #f0fdfa; border-left: 4px solid #0C969C; border-radius: 6px; padding: 14px 16px;">
                    <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #134e4a;">
                      <strong>Security Notice:</strong> Your login session will remain active for <strong>3 hours</strong>. For your protection, do not share this code with anyone.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #64748b;">
                If you did not make this request, you can safely ignore this email. No access will be granted without this code.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b; font-weight: 600;">
                Monsi Engineering & Construction Ltd.
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8; line-height: 1.4;">
                Doreen Vinchita Complex, Rupnagar R/A, Mirpur, Dhaka, Bangladesh<br />
                This is an automated transactional security alert.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    // Comprehensive, matching plain-text body for spam filter compliance
    const plainTextContent = `Hello ${name},

Your Monsi Engineering admin sign-in verification code is: ${otp}

This code is valid for 10 minutes and will authorize a 3-hour admin session.

If you did not initiate this sign-in request, please ignore this email.

--
Monsi Engineering & Construction Ltd.
Doreen Vinchita Complex, Rupnagar R/A, Mirpur, Dhaka, Bangladesh
`;

    await transporter.sendMail({
      from: smtpFrom,
      to,
      replyTo: smtpUser,
      subject: `${otp} is your Monsi Engineering verification code`,
      text: plainTextContent,
      html: htmlContent,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
        'X-Mailer': 'Monsi Security Mailer v2',
        'Auto-Submitted': 'auto-generated',
        'X-Auto-Response-Suppress': 'OOF, AutoReply',
      },
    });

    console.log(`✅ [ADMIN OTP DISPATCH] Email successfully sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error('❌ [ADMIN OTP DISPATCH] Failed to send email via SMTP:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send OTP email',
    };
  }
}
