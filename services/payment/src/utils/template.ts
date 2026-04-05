export const forgotPasswordTemplate = (resetLink: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Secure Access Recovery</title>

<style>
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #fafafa;
    color: #18181b;
  }

  .email-wrapper {
    width: 100%;
    border-collapse: collapse;
    background-color: #fafafa;
  }

  .email-container {
    width: 100%;
    max-width: 520px;
    margin: 60px auto;
    background-color: #ffffff;
    border: 1px solid #e4e4e7;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.04);
    border-radius: 24px;
    overflow: hidden;
  }

  .header {
    padding: 48px 40px 16px;
    text-align: center;
  }

  .header h1 {
    margin: 0;
    color: #09090b;
    font-size: 24px;
    font-weight: 900;
    letter-spacing: -0.5px;
  }

  .content {
    padding: 0 40px 48px;
    text-align: center;
  }

  .text {
    margin: 0 0 24px;
    color: #52525b;
    font-size: 15px;
    line-height: 1.6;
    font-weight: 500;
  }

  .button-wrapper {
    margin: 32px 0;
    text-align: center;
  }

  .button {
    display: inline-block;
    padding: 16px 40px;
    background-color: #09090b;
    color: #ffffff;
    text-decoration: none;
    border-radius: 16px;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 0.2px;
  }

  .link-box {
    margin: 32px 0;
    padding: 16px;
    background-color: #f4f4f5;
    border: 1px solid #e4e4e7;
    color: #71717a;
    font-size: 12px;
    word-break: break-all;
    border-radius: 12px;
  }

  .warning {
    margin: 24px 0 0;
    color: #71717a;
    font-size: 13px;
    line-height: 1.6;
    font-weight: 600;
  }

  .footer {
    background-color: #fafafa;
    padding: 32px 40px;
    text-align: center;
    border-top: 1px solid #f4f4f5;
  }

  .footer-text {
    margin: 0 0 8px;
    color: #a1a1aa;
    font-size: 12px;
    font-weight: 500;
  }

  .footer-text:last-child {
    margin: 0;
  }
</style>
</head>

<body>
<table role="presentation" class="email-wrapper">
  <tr>
    <td align="center" style="padding: 60px 20px; background-image: radial-gradient(#e4e4e7 1px, transparent 1px); background-size: 24px 24px;">
      <table role="presentation" class="email-container">
        <tr>
          <td class="header">
            <table role="presentation" style="margin: 0 auto; margin-bottom: 24px;">
              <tr>
                <td style="width: 48px; height: 48px; background-color: #09090b; border-radius: 12px; text-align: center; vertical-align: middle;">
                   <div style="margin:0; color:#fff; font-size:22px; font-weight:900; letter-spacing: -1px; font-family: sans-serif;">Lu</div>
                </td>
              </tr>
            </table>
            <h1>Cryptographic Reset</h1>
          </td>
        </tr>
        <tr>
          <td class="content">
            <p class="text">
              We received a request to bypass your current authentication block. Use the secure link below to generate a new access key.
            </p>
            <div class="button-wrapper">
              <a href="${resetLink}" class="button">Regenerate Key</a>
            </div>
            <p class="warning">
              ⏰ Security protocols will invalidate this link in 15 minutes.
            </p>
            <div class="link-box">
              ${resetLink}
            </div>
            <p class="text" style="font-size: 13px; margin: 0; color: #a1a1aa;">
              If this operation was not initiated by you, your environment remains secure and no action is required.
            </p>
          </td>
        </tr>
        <tr>
          <td class="footer">
            <p class="footer-text">© 2026 Lumora Systems. All operational rights reserved.</p>
            <p class="footer-text">Automated dispatch. Do not reply to this channel.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>
  `;
};