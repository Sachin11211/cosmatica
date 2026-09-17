"""
Simple transactional email sender using Gmail's SMTP service.

Setup (one-time):
1. Use a Gmail account you control for the shop (e.g. cosmatica.dhanbad@gmail.com).
2. Turn on 2-Step Verification on that account: https://myaccount.google.com/security
3. Create an "App Password": https://myaccount.google.com/apppasswords
   (Choose app: Mail, device: Other — name it "Cosmatica backend")
   Google gives you a 16-character password — use that, NOT your normal Gmail password.
4. Add to backend/.env:
     EMAIL_ADDRESS="youraddress@gmail.com"
     EMAIL_APP_PASSWORD="16-char-app-password"

If these aren't set, emails are silently skipped (logged, not raised) so the rest
of the site keeps working even without email configured.
"""
import logging
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

logger = logging.getLogger(__name__)

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587


def send_email(to_email: str, subject: str, html_body: str) -> bool:
    sender = os.environ.get("EMAIL_ADDRESS")
    app_password = os.environ.get("EMAIL_APP_PASSWORD")

    if not sender or not app_password:
        logger.warning("EMAIL_ADDRESS / EMAIL_APP_PASSWORD not set — skipping email send.")
        return False

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"Cosmatica <{sender}>"
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html"))

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as server:
            server.starttls()
            server.login(sender, app_password)
            server.sendmail(sender, [to_email], msg.as_string())
        logger.info(f"Email sent to {to_email}: {subject}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {e}")
        return False


def send_newsletter_welcome(to_email: str):
    html = """
    <div style="font-family: Georgia, serif; background:#F5E9DA; padding: 40px 20px;">
      <div style="max-width: 480px; margin: 0 auto; background:#ffffff; border:1px solid #E8C158;">
        <div style="background:#120710; padding: 32px; text-align:center;">
          <h1 style="color:#F5E9DA; font-style: italic; margin:0; font-size: 28px;">Cosmatica</h1>
        </div>
        <div style="padding: 32px; color:#2A1626;">
          <h2 style="font-size: 22px; margin-top:0;">Welcome to the family 💛</h2>
          <p style="line-height: 1.6;">
            Thank you for subscribing — you'll be the first to know about festive edits,
            behind-the-scenes from our artisans, and new arrivals at our Bartand, Dhanbad store.
          </p>
          <div style="background:#F5E9DA; border:1px dashed #E8C158; padding: 16px; text-align:center; margin: 24px 0;">
            <div style="font-size: 12px; text-transform:uppercase; letter-spacing:2px; color:#B01F40;">
              Your welcome gift
            </div>
            <div style="font-size: 26px; font-weight:bold; color:#B01F40; margin-top:4px;">
              WELCOME10
            </div>
            <div style="font-size: 13px; color:#666; margin-top:4px;">
              10% off your first order — show this at checkout
            </div>
          </div>
          <p style="line-height: 1.6; font-size: 14px; color:#666;">
            With love,<br/>Laxmi Devi &amp; the Cosmatica team
          </p>
        </div>
      </div>
    </div>
    """
    send_email(to_email, "Welcome to Cosmatica — here's 10% off ✨", html)


def send_order_confirmation(to_email: str, customer_name: str, items, subtotal: int):
    if not to_email:
        return
    rows = "".join(
        f"""<tr>
              <td style="padding:8px 0; border-bottom:1px solid #eee;">{i['name']} × {i['qty']}</td>
              <td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right;">₹{i['price'] * i['qty']}</td>
            </tr>"""
        for i in items
    )
    html = f"""
    <div style="font-family: Georgia, serif; background:#F5E9DA; padding: 40px 20px;">
      <div style="max-width: 480px; margin: 0 auto; background:#ffffff; border:1px solid #E8C158;">
        <div style="background:#120710; padding: 32px; text-align:center;">
          <h1 style="color:#F5E9DA; font-style: italic; margin:0; font-size: 28px;">Cosmatica</h1>
        </div>
        <div style="padding: 32px; color:#2A1626;">
          <h2 style="font-size: 22px; margin-top:0;">Thank you, {customer_name}!</h2>
          <p style="line-height: 1.6;">
            We've received your order and Laxmi ji's team will call you shortly to confirm.
          </p>
          <table style="width:100%; border-collapse: collapse; margin-top: 20px;">
            {rows}
            <tr>
              <td style="padding:12px 0; font-weight:bold;">Subtotal</td>
              <td style="padding:12px 0; font-weight:bold; text-align:right;">₹{subtotal}</td>
            </tr>
          </table>
          <p style="line-height: 1.6; font-size: 14px; color:#666; margin-top: 24px;">
            With love,<br/>Laxmi Devi &amp; the Cosmatica team
          </p>
        </div>
      </div>
    </div>
    """
    send_email(to_email, "Your Cosmatica order is confirmed 🎁", html)


def send_contact_notification(name: str, phone: str, email: str, message: str):
    """Notifies the shop owner (EMAIL_ADDRESS) whenever a customer submits the contact form."""
    owner_email = os.environ.get("EMAIL_ADDRESS")
    if not owner_email:
        return
    html = f"""
    <div style="font-family: Georgia, serif; background:#F5E9DA; padding: 40px 20px;">
      <div style="max-width: 480px; margin: 0 auto; background:#ffffff; border:1px solid #E8C158;">
        <div style="background:#120710; padding: 24px; text-align:center;">
          <h1 style="color:#F5E9DA; font-style: italic; margin:0; font-size: 22px;">New enquiry — Cosmatica</h1>
        </div>
        <div style="padding: 28px; color:#2A1626;">
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding:6px 0; font-weight:bold; width:80px;">Name</td><td style="padding:6px 0;">{name}</td></tr>
            <tr><td style="padding:6px 0; font-weight:bold;">Phone</td><td style="padding:6px 0;">{phone or '—'}</td></tr>
            <tr><td style="padding:6px 0; font-weight:bold;">Email</td><td style="padding:6px 0;">{email or '—'}</td></tr>
          </table>
          <div style="margin-top:16px; padding:16px; background:#F5E9DA; border-left:3px solid #B01F40;">
            {message}
          </div>
        </div>
      </div>
    </div>
    """
    send_email(owner_email, f"New enquiry from {name}", html)
