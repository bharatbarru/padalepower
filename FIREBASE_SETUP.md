# PADALA E-POWER - Firebase & Owner Email Notification Guide

This guide details the complete **Server-Side Owner Email Notification Architecture** powered by **Firebase Cloud Functions (v2)**, **Cloud Firestore Database**, and **Firebase Authentication** for PADALA E-POWER.

---

## 🛠️ Architecture Overview

```
[ Customer Submits Form ]
         │
         ▼
[ Client Validation ] ──► (Saves Document to Firestore)
                                   │
                                   ▼
                    [ Firestore Document Event ]
                                   │
                                   ▼
                [ Firebase Cloud Function (Server-Side) ]
                                   │
                                   ▼
                [ Nodemailer Secure SMTP Dispatch ]
                                   │
                                   ▼
                [ Owner Receives Formatted HTML Email ]
```

### Key Security & Reliability Features:
1. **100% Server-Side Execution**: All SMTP passwords, API keys, and email delivery credentials live exclusively inside Firebase Cloud Functions Secrets Manager. Zero credentials exist in the client React/Next.js codebase.
2. **Non-Blocking Delivery**: Form submissions are immediately saved to Cloud Firestore. If email delivery temporarily fails, the customer submission remains safely stored in the database.
3. **Duplicate Submission Protection**: The Cloud Function checks `notificationSent` status and tags processed documents to prevent duplicate emails.
4. **All Form Workflows Supported**:
   - 🛠️ **Service Requests** (Engine Overhaul, Diagnostics, Repairs)
   - ⚡ **AMC Enquiries** (Annual Maintenance Contracts)
   - 💬 **Customer Feedback & Testimonials** (Star Ratings & Comments)
   - 📩 **Contact Enquiries** (General Workshop Inquiries)

---

## 📋 What Has Been Implemented & Is Working

| Component | Status | Details |
| :--- | :--- | :--- |
| **Firestore Security Rules** | ✅ Ready | Defined in `firestore.rules` for public write & admin read |
| **Cloud Functions Source** | ✅ Built | Implemented in `functions/index.js` & `functions/package.json` |
| **Email HTML Templates** | ✅ Custom Branded | Features PADALA E-POWER branding, GSTIN, IST timestamps & Admin link |
| **Dual-Mode Frontend** | ✅ Working | Runs in interactive demo mode when env vars are omitted; switches to live Firebase automatically when configured |
| **Admin Dashboard** | ✅ Integrated | Real-time pending requests, review approval toggles & search |

---

## 🔐 Required Secret Configuration (Firebase Secrets Manager)

To prevent hardcoding sensitive email credentials, set up the following secrets using the Firebase CLI before deploying:

### 1. Set Owner Recipient Email
```bash
firebase functions:secrets:set OWNER_EMAIL
# When prompted, enter the owner's recipient email address (e.g., info@padalaepower.com or your personal email)
```

### 2. Set SMTP Server Host (e.g. Gmail, Mailgun, SendGrid)
```bash
firebase functions:secrets:set SMTP_HOST
# Default: smtp.gmail.com (or smtp.sendgrid.net, smtp.mailgun.org)
```

### 3. Set SMTP Port
```bash
firebase functions:secrets:set SMTP_PORT
# Default: 465 (for SSL) or 587 (for TLS)
```

### 4. Set SMTP Username
```bash
firebase functions:secrets:set SMTP_USER
# When prompted, enter your SMTP sender email address (e.g. yourgmail@gmail.com)
```

### 5. Set SMTP App Password / API Key
```bash
firebase functions:secrets:set SMTP_PASS
# When prompted, enter your Gmail App Password or SMTP password
```

> [!TIP]
> **Using Gmail?** You must generate an **App Password**:
> 1. Go to your Google Account -> **Security**.
> 2. Enable **2-Step Verification**.
> 3. Search for **App Passwords** and generate a password for "Mail".
> 4. Enter that 16-character password into `firebase functions:secrets:set SMTP_PASS`.

---

## 🚀 Step-by-Step Deployment Instructions

### Prerequisites:
Ensure you have the Firebase CLI installed on your machine:
```bash
npm install -g firebase-tools
```

### Step 1: Login & Select Firebase Project
```bash
firebase login
firebase use --add
# Select your Firebase project (e.g., padala-e-power)
```

### Step 2: Install Functions Dependencies
```bash
cd functions
npm install
cd ..
```

### Step 3: Set Secrets (as documented above)
```bash
firebase functions:secrets:set OWNER_EMAIL
firebase functions:secrets:set SMTP_HOST
firebase functions:secrets:set SMTP_PORT
firebase functions:secrets:set SMTP_USER
firebase functions:secrets:set SMTP_PASS
```

### Step 4: Deploy Firestore Rules & Cloud Functions
```bash
firebase deploy --only firestore:rules,functions
```

---

## 🧪 Testing Email Notifications

### Test 1: Service Request / AMC Enquiry Notification
1. Open the live website at `http://localhost:3000` (or your deployed URL).
2. Click **Request Service** in the header.
3. Fill out **Full Name** (e.g., *Rajesh Kumar*) and **Phone Number** (e.g., *+91 96031 09512*).
4. Select a service (e.g., *Complete Engine Overhaul* or *Generator AMC Services*).
5. Click **Submit Service Request**.
6. **Result**: 
   - Document created in Firestore under `service_requests`.
   - Cloud Function `onServiceRequestCreated` fires automatically.
   - Owner receives a formatted HTML email with client details and a link to the Admin Dashboard.

### Test 2: Customer Feedback Notification
1. Scroll down to the **Customer Feedback** section on the website.
2. Select a star rating (e.g., 5 Stars ⭐⭐⭐⭐⭐).
3. Fill out **Name**, **Email/Phone**, and **Comments**.
4. Click **Submit Feedback**.
5. **Result**:
   - Document created in Firestore under `feedback`.
   - Cloud Function `onFeedbackCreated` fires automatically.
   - Owner receives an email notification with star rating, comments, and approval link.

### Test 3: Instant Callable Test Endpoint (Optional)
Once functions are deployed, test your SMTP setup directly via HTTP or curl:
```bash
curl https://us-central1-<YOUR-PROJECT-ID>.cloudfunctions.net/sendTestNotification
```
Response:
```json
{
  "success": true,
  "message": "Test email successfully sent to info@padalaepower.com"
}
```

---

## 📄 Centralized Company Config Reference
Frontend business details can be updated at any time in `src/config/companyConfig.ts`:
- **Company Name**: PADALA E-POWER
- **Phone Line**: +91 96031 09512
- **Email**: info@padalaepower.com
- **Address**: Door No: 6-38-28/1, L.V Nagar, Old Gajuwaka, Visakhapatnam-530026
