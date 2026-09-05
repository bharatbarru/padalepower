const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// Initialize Firebase Admin SDK
admin.initializeApp();

/**
 * Helper to retrieve secure owner notification credentials.
 * Prioritizes process.env secrets, then fallback environment variables.
 */
function getEmailConfig() {
  const ownerEmail = process.env.OWNER_EMAIL || "info@padalaepower.com";
  const servicesEmail = process.env.SERVICES_EMAIL || "services@padalaepower.in";
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
  const smtpUser = process.env.SMTP_USER || ownerEmail;
  const smtpPass = process.env.SMTP_PASS || process.env.OWNER_EMAIL_PASS || "";
  const adminDashboardUrl = process.env.ADMIN_DASHBOARD_URL || "http://localhost:3000/#admin";

  return {
    ownerEmail,
    servicesEmail,
    smtpHost,
    smtpPort,
    smtpUser,
    smtpPass,
    adminDashboardUrl
  };
}

/**
 * Creates a Nodemailer SMTP Transporter
 */
function createTransporter(config) {
  return nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpPort === 465, // true for 465, false for 587
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass
    }
  });
}

/**
 * Helper to format readable Indian Standard Time (IST) date
 */
function formatDateIST(isoString) {
  try {
    const date = isoString ? new Date(isoString) : new Date();
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium"
    }) + " IST";
  } catch (err) {
    return isoString || new Date().toISOString();
  }
}

/**
 * 1. Cloud Function Trigger for New Service Requests & AMC Enquiries
 * Document: service_requests/{requestId}
 */
exports.onServiceRequestCreated = onDocumentCreated(
  {
    document: "service_requests/{requestId}",
    secrets: ["OWNER_EMAIL", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"]
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      logger.warn("[onServiceRequestCreated] No data snapshot associated with event.");
      return;
    }

    const data = snapshot.data();
    const requestId = event.params.requestId;

    // Duplicate Submission & Loop Protection
    if (data.notificationSent === true) {
      logger.info(`[onServiceRequestCreated] Notification already sent for Request ID: ${requestId}. Skipping.`);
      return;
    }

    const config = getEmailConfig();

    // Honor SEND_EMAILS env flag. Default behavior: do not send emails from functions
    // until the owner explicitly enables them. Set SEND_EMAILS='true' in your
    // Firebase environment/secrets to enable email dispatch.
    const sendEmailsFlag = (process.env.SEND_EMAILS || 'false').toLowerCase();
    if (sendEmailsFlag !== 'true') {
      logger.info(`[onServiceRequestCreated] SEND_EMAILS != 'true'. Skipping email send. Request ID: ${requestId}`);
      await snapshot.ref.update({
        notificationSent: false,
        notificationStatus: 'skipped_by_config',
        notificationMessage: 'Email dispatch skipped by server configuration (SEND_EMAILS).'
      });
      return;
    }

    // Determine Enquiry Category
    const serviceReq = (data.serviceRequired || "").toLowerCase();
    const isAmc = serviceReq.includes("amc") || serviceReq.includes("annual");
    const isContact = serviceReq.includes("contact") || serviceReq.includes("direct");

    let categoryTitle = "New Service Request";
    let badgeColor = "#00a651"; // Green
    if (isAmc) {
      categoryTitle = "New AMC Maintenance Enquiry";
      badgeColor = "#d97706"; // Amber/Yellow
    } else if (isContact) {
      categoryTitle = "New Website Contact Enquiry";
      badgeColor = "#2563eb"; // Blue
    }

    const formattedDate = formatDateIST(data.createdAt);

    // Build Email HTML Content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
          .header { bg: #091124; background-color: #091124; padding: 25px 30px; text-align: center; color: #ffffff; border-bottom: 4px solid #00a651; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; }
          .header p { margin: 5px 0 0; font-size: 12px; color: #e2e8f0; }
          .badge { display: inline-block; padding: 6px 14px; background-color: ${badgeColor}; color: #ffffff; font-size: 11px; font-weight: 800; text-transform: uppercase; border-radius: 20px; margin: 20px 30px 10px; }
          .body { padding: 0 30px 30px; }
          .detail-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-top: 15px; }
          .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #edf2f7; font-size: 13px; }
          .row:last-child { border-bottom: none; }
          .label { font-weight: 700; color: #64748b; width: 40%; }
          .value { font-weight: 800; color: #0f172a; width: 60%; text-align: right; word-break: break-word; }
          .highlight { color: #00a651; font-weight: 900; }
          .message-box { background-color: #ffffff; border-left: 4px solid ${badgeColor}; padding: 12px 15px; margin-top: 15px; border-radius: 6px; font-size: 13px; color: #334155; line-height: 1.5; }
          .cta-btn { display: block; width: 80%; margin: 25px auto 10px; text-align: center; background-color: #00a651; color: #ffffff; text-decoration: none; padding: 14px 20px; font-weight: 800; border-radius: 10px; font-size: 14px; shadow: 0 4px 12px rgba(0,166,81,0.3); }
          .footer { background-color: #050b18; padding: 15px 30px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #1e293b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>PADALA E-POWER</h1>
            <p>Generator Engine & Electrical Servicing Notification</p>
          </div>
          
          <div class="badge">${categoryTitle}</div>

          <div class="body">
            <h2 style="font-size: 18px; margin: 0 0 10px; color: #0f172a;">Client Request Details</h2>
            
            <div class="detail-card">
              <div class="row">
                <span class="label">Client Name:</span>
                <span class="value">${data.fullName || "Not Provided"}</span>
              </div>
              <div class="row">
                <span class="label">Phone Number:</span>
                <span class="value highlight">${data.phone || "Not Provided"}</span>
              </div>
              <div class="row">
                <span class="label">Email Address:</span>
                <span class="value">${data.email || "Not Provided"}</span>
              </div>
              <div class="row">
                <span class="label">Company Name:</span>
                <span class="value">${data.companyName || "N/A"}</span>
              </div>
              <div class="row">
                <span class="label">Service Required:</span>
                <span class="value">${data.serviceRequired || "General Engine Inspection"}</span>
              </div>
              <div class="row">
                <span class="label">Equipment / Engine:</span>
                <span class="value">${data.equipmentType || "Industrial Generator"}</span>
              </div>
              <div class="row">
                <span class="label">Preferred Date:</span>
                <span class="value">${data.preferredDate || "Immediate / Flexible"}</span>
              </div>
              <div class="row">
                <span class="label">Preferred Contact:</span>
                <span class="value" style="text-transform: uppercase;">${data.preferredContact || "Phone"}</span>
              </div>
              <div class="row">
                <span class="label">Submitted On:</span>
                <span class="value" style="font-size: 11px;">${formattedDate}</span>
              </div>
            </div>

            ${data.problemDescription ? `
              <h3 style="font-size: 14px; margin: 18px 0 6px; color: #334155;">Problem Description / Message:</h3>
              <div class="message-box">${data.problemDescription}</div>
            ` : ""}

            <a href="${config.adminDashboardUrl}" class="cta-btn" target="_blank">Open Owner Admin Dashboard</a>
          </div>

          <div class="footer">
            <p style="margin:0;">PADALA E-POWER • Workshop GSTIN: 37JEHPP7644D1Z1</p>
            <p style="margin:4px 0 0;">Door No: 6-38-28/1, L.V Nagar, Old Gajuwaka, Visakhapatnam-530026</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
=== PADALA E-POWER: ${categoryTitle.toUpperCase()} ===
Client Name: ${data.fullName}
Phone: ${data.phone}
Email: ${data.email || "N/A"}
Company: ${data.companyName || "N/A"}
Service Required: ${data.serviceRequired}
Equipment: ${data.equipmentType}
Preferred Date: ${data.preferredDate || "Flexible"}
Preferred Contact: ${data.preferredContact || "Phone"}
Date/Time: ${formattedDate}
Message: ${data.problemDescription || "None"}

Admin Dashboard: ${config.adminDashboardUrl}
    `.trim();

    // Check credentials before sending
    if (!config.smtpPass) {
      logger.warn(`[onServiceRequestCreated] SMTP_PASS not configured in Firebase Secrets. Saving request to Firestore without sending email. Request ID: ${requestId}`);
      await snapshot.ref.update({
        notificationStatus: "pending_credentials",
        notificationMessage: "Saved to Firestore successfully. SMTP credentials pending deployment."
      });
      return;
    }

    try {
      const transporter = createTransporter(config);

      const mailOptions = {
        from: `"PADALA E-POWER Notifications" <${config.smtpUser}>`,
        to: config.ownerEmail,
        cc: config.servicesEmail,
        subject: `[${categoryTitle}] ${data.fullName} - ${data.phone}`,
        text: textContent,
        html: htmlContent
      };
      const info = await transporter.sendMail(mailOptions);
      logger.info(`[SUCCESS] Notification email dispatched to ${config.ownerEmail}. Message ID: ${info.messageId}`);

      // Send acknowledgement to submitter if an email was provided
      if (data.email && typeof data.email === 'string' && data.email.includes('@')) {
        const userHtml = `
          <div style="font-family: Arial, sans-serif; padding:20px; background:#f7fafc;">
            <div style="max-width:600px;margin:0 auto;background:#fff;padding:22px;border-radius:12px;border:1px solid #e6edf3;">
              <h2 style="margin:0 0 10px;color:#0f172a">Thank you for contacting PADALA E-POWER</h2>
              <p style="color:#334155;">Dear ${data.fullName || 'Customer'},</p>
              <p style="color:#334155;">Thank you for your request regarding <strong>${data.serviceRequired || 'our services'}</strong>. Our team has received your submission and will contact you shortly to confirm the details and schedule the visit.</p>
              <p style="color:#334155;">Reference ID: <strong>${requestId || 'N/A'}</strong></p>
              <p style="color:#334155;">If you need immediate assistance, email us at <a href="mailto:${config.servicesEmail}">${config.servicesEmail}</a> or call ${config.ownerEmail}.</p>
              <div style="margin-top:18px;padding:12px;background:#f1f5f9;border-radius:8px;font-size:13px;color:#475569;">Regards,<br/>PADALA E-POWER Team</div>
            </div>
          </div>
        `;

        try {
          await transporter.sendMail({
            from: `"PADALA E-POWER" <${config.smtpUser}>`,
            to: data.email,
            bcc: config.servicesEmail,
            subject: `Thank you — we've received your request (${requestId})`,
            html: userHtml
          });
          logger.info(`[SUCCESS] Acknowledgement email sent to user ${data.email}`);
        } catch (userErr) {
          logger.warn(`[WARN] Failed to send acknowledgement to user ${data.email}:`, userErr);
        }
      }
      // Update Firestore record safely
      await snapshot.ref.update({
        notificationSent: true,
        notificationSentAt: admin.firestore.FieldValue.serverTimestamp(),
        notificationMessageId: info.messageId
      });
    } catch (err) {
      logger.error(`[ERROR] Failed to dispatch notification email for Request ID ${requestId}:`, err);
      
      // Update document with error info without crashing customer submission
      await snapshot.ref.update({
        notificationSent: false,
        notificationError: err.message || "Email dispatch failed",
        notificationAttemptedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }
  }
);

/**
 * 2. Cloud Function Trigger for New Customer Reviews & Feedback
 * Document: feedback/{feedbackId}
 */
exports.onFeedbackCreated = onDocumentCreated(
  {
    document: "feedback/{feedbackId}",
    secrets: ["OWNER_EMAIL", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"]
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      logger.warn("[onFeedbackCreated] No data snapshot associated with event.");
      return;
    }

    const data = snapshot.data();
    const feedbackId = event.params.feedbackId;

    if (data.notificationSent === true) {
      logger.info(`[onFeedbackCreated] Notification already sent for Feedback ID: ${feedbackId}. Skipping.`);
      return;
    }

    const config = getEmailConfig();
    const formattedDate = formatDateIST(data.createdAt);

    // Honor SEND_EMAILS env flag for feedback too. Default: skip sending.
    const sendEmailsFlagFB = (process.env.SEND_EMAILS || 'false').toLowerCase();
    if (sendEmailsFlagFB !== 'true') {
      logger.info(`[onFeedbackCreated] SEND_EMAILS != 'true'. Skipping email send. Feedback ID: ${feedbackId}`);
      await snapshot.ref.update({
        notificationSent: false,
        notificationStatus: 'skipped_by_config',
        notificationMessage: 'Email dispatch skipped by server configuration (SEND_EMAILS).'
      });
      return;
    }

    // Build Stars
    const ratingStars = "★".repeat(data.rating || 5) + "☆".repeat(5 - (data.rating || 5));

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
          .header { background-color: #091124; padding: 25px 30px; text-align: center; color: #ffffff; border-bottom: 4px solid #eab308; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; }
          .badge { display: inline-block; padding: 6px 14px; background-color: #eab308; color: #000000; font-size: 11px; font-weight: 800; text-transform: uppercase; border-radius: 20px; margin: 20px 30px 10px; }
          .body { padding: 0 30px 30px; }
          .stars { font-size: 24px; color: #eab308; letter-spacing: 2px; text-align: center; margin: 15px 0; }
          .detail-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-top: 15px; }
          .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #edf2f7; font-size: 13px; }
          .row:last-child { border-bottom: none; }
          .label { font-weight: 700; color: #64748b; width: 40%; }
          .value { font-weight: 800; color: #0f172a; width: 60%; text-align: right; }
          .feedback-box { background-color: #fffbebf7; border-left: 4px solid #eab308; padding: 14px 18px; margin-top: 15px; border-radius: 6px; font-size: 13px; color: #451a03; line-height: 1.5; font-style: italic; }
          .cta-btn { display: block; width: 80%; margin: 25px auto 10px; text-align: center; background-color: #00a651; color: #ffffff; text-decoration: none; padding: 14px 20px; font-weight: 800; border-radius: 10px; font-size: 14px; }
          .footer { background-color: #050b18; padding: 15px 30px; text-align: center; font-size: 11px; color: #94a3b8; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>PADALA E-POWER</h1>
            <p>New Customer Review Submitted</p>
          </div>
          
          <div class="badge">Customer Rating: ${data.rating || 5} / 5 Stars</div>

          <div class="body">
            <div class="stars">${ratingStars}</div>
            
            <div class="detail-card">
              <div class="row">
                <span class="label">Customer Name:</span>
                <span class="value">${data.name || "Anonymous"}</span>
              </div>
              <div class="row">
                <span class="label">Contact Email/Phone:</span>
                <span class="value">${data.contact || "Not Provided"}</span>
              </div>
              <div class="row">
                <span class="label">Engine Service Received:</span>
                <span class="value">${data.service || "General Servicing"}</span>
              </div>
              <div class="row">
                <span class="label">Testimonial Permission:</span>
                <span class="value" style="color: ${data.testimonialPermission ? '#00a651' : '#ef4444'};">
                  ${data.testimonialPermission ? "Granted (Can Publish)" : "Private (Do Not Publish)"}
                </span>
              </div>
              <div class="row">
                <span class="label">Submitted On:</span>
                <span class="value" style="font-size: 11px;">${formattedDate}</span>
              </div>
            </div>

            <h3 style="font-size: 14px; margin: 18px 0 6px; color: #334155;">Customer Comments:</h3>
            <div class="feedback-box">"${data.feedback || "No comment left."}"</div>

            <a href="${config.adminDashboardUrl}" class="cta-btn" target="_blank">Review & Approve in Admin Panel</a>
          </div>

          <div class="footer">
            <p style="margin:0;">PADALA E-POWER • Workshop GSTIN: 37JEHPP7644D1Z1</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
=== PADALA E-POWER: NEW CUSTOMER FEEDBACK ===
Rating: ${data.rating || 5} / 5 Stars (${ratingStars})
Customer Name: ${data.name}
Contact: ${data.contact}
Service: ${data.service}
Testimonial Permission: ${data.testimonialPermission ? "Granted" : "Private"}
Date: ${formattedDate}
Comments: "${data.feedback}"

Admin Panel: ${config.adminDashboardUrl}
    `.trim();

    if (!config.smtpPass) {
      logger.warn(`[onFeedbackCreated] SMTP_PASS not configured in Secrets. Feedback saved to Firestore. ID: ${feedbackId}`);
      await snapshot.ref.update({
        notificationStatus: "pending_credentials"
      });
      return;
    }

    try {
      const transporter = createTransporter(config);

      const mailOptions = {
        from: `"PADALA E-POWER Feedback" <${config.smtpUser}>`,
        to: config.ownerEmail,
        cc: config.servicesEmail,
        subject: `[New Feedback ⭐${data.rating || 5}/5] ${data.name} - ${data.service}`,
        text: textContent,
        html: htmlContent
      };
      const info = await transporter.sendMail(mailOptions);
      logger.info(`[SUCCESS] Feedback notification email dispatched to ${config.ownerEmail}. Message ID: ${info.messageId}`);

      // Acknowledge feedback to user if contact looks like an email
      if (data.contact && typeof data.contact === 'string' && data.contact.includes('@')) {
        const userAckHtml = `
          <div style="font-family: Arial, sans-serif; padding:20px; background:#fff;">
            <div style="max-width:600px;margin:0 auto;padding:18px;border-radius:10px;border:1px solid #eef2f6;">
              <h2 style="margin:0 0 8px;color:#0f172a">Thank you for your feedback</h2>
              <p style="color:#334155;">Dear ${data.name || 'Customer'},</p>
              <p style="color:#334155;">We appreciate your review of our service: <em>${data.service || 'Service'}</em>. Your feedback helps us improve. Our team may reach out if you granted testimonial permission.</p>
              <p style="color:#334155;">If you need immediate assistance please email <a href="mailto:${config.servicesEmail}">${config.servicesEmail}</a>.</p>
              <div style="margin-top:12px;color:#475569;">Best Regards,<br/>PADALA E-POWER Team</div>
            </div>
          </div>
        `;

        try {
          await transporter.sendMail({
            from: `"PADALA E-POWER" <${config.smtpUser}>`,
            to: data.contact,
            bcc: config.servicesEmail,
            subject: `Thanks for your feedback — PADALA E-POWER`,
            html: userAckHtml
          });
          logger.info(`[SUCCESS] Feedback acknowledgement sent to ${data.contact}`);
        } catch (ackErr) {
          logger.warn(`[WARN] Failed to send feedback acknowledgement to ${data.contact}:`, ackErr);
        }
      }

      await snapshot.ref.update({
        notificationSent: true,
        notificationSentAt: admin.firestore.FieldValue.serverTimestamp(),
        notificationMessageId: info.messageId
      });
    } catch (err) {
      logger.error(`[ERROR] Failed to send feedback notification email for ID ${feedbackId}:`, err);
      await snapshot.ref.update({
        notificationSent: false,
        notificationError: err.message || "Email dispatch failed",
        notificationAttemptedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }
  }
);

/**
 * 3. Callable HTTPS Endpoint for Owners to Test Email Setup
 */
exports.sendTestNotification = onRequest(
  { secrets: ["OWNER_EMAIL", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"] },
  async (req, res) => {
    const config = getEmailConfig();

    if (!config.smtpPass) {
      return res.status(400).json({
        success: false,
        message: "SMTP_PASS or OWNER_EMAIL_PASS secret is not configured in Firebase Secrets Manager.",
        ownerEmail: config.ownerEmail
      });
    }

    try {
      const transporter = createTransporter(config);
      const mailOptions = {
        from: `"PADALA E-POWER System" <${config.smtpUser}>`,
        to: config.ownerEmail,
        subject: `[TEST NOTIFICATION] PADALA E-POWER Email System Working!`,
        text: `Success! Your PADALA E-POWER owner notification system is fully active and configured. Receiver: ${config.ownerEmail}`,
        html: `<h2 style="color:#00a651;">PADALA E-POWER Owner Email Test</h2><p>Your server-side Firebase Cloud Function email notification pipeline is <strong>100% operational!</strong></p><p>Notifications will be dispatched to: <strong>${config.ownerEmail}</strong></p>`
      };

      const info = await transporter.sendMail(mailOptions);
      return res.status(200).json({
        success: true,
        message: `Test email successfully sent to ${config.ownerEmail}`,
        messageId: info.messageId
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "SMTP Mail Dispatch Failed: " + err.message,
        error: err.toString()
      });
    }
  }
);
