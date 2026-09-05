import { ServiceRequest, CustomerFeedback } from '../types';
import { COMPANY_CONFIG } from '../config/companyConfig';

/**
 * Client-Side Notification Dispatch Helper
 * 
 * NOTE: When live Firebase is configured, server-side Cloud Functions 
 * (onServiceRequestCreated & onFeedbackCreated) automatically trigger 
 * immediately upon document creation in Firestore, ensuring zero private 
 * email passwords or SMTP credentials exist in client browser bundle.
 */
export const triggerOwnerNotification = async (
  type: 'service_request' | 'feedback',
  data: ServiceRequest | CustomerFeedback
) => {
  const webhookUrl = process.env.NEXT_PUBLIC_OWNER_NOTIFICATION_WEBHOOK_URL;
  const ownerEmail = process.env.NEXT_PUBLIC_OWNER_EMAIL || COMPANY_CONFIG.email;
  
  console.info(`[OWNER NOTIFICATION] New ${type} logged:`, {
    timestamp: new Date().toISOString(),
    targetOwnerEmail: ownerEmail,
    id: data.id,
    serverTrigger: "Cloud Function triggers on Firestore document creation (onServiceRequestCreated / onFeedbackCreated)"
  });

  if (webhookUrl && !webhookUrl.includes("your-webhook-service.com")) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data, timestamp: new Date().toISOString() })
      });
    } catch (error) {
      console.warn('[OWNER NOTIFICATION] Custom webhook error:', error);
    }
  }
};
