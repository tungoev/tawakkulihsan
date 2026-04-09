import crypto from 'crypto';

const LAVA_API_BASE = 'https://api.lava.top';

export interface LavaInvoiceResponse {
  data: {
    id: string;
    amount: number;
    status: string;
    url: string;
  };
}

/**
 * Creates a new invoice (contract) in Lava Top
 */
export async function createLavaInvoice(email: string = 'customer@example.com') {
  const apiKey = process.env.LAVA_API_KEY?.trim();
  const productId = process.env.LAVA_PRODUCT_ID?.trim();

  if (!apiKey || !productId) {
    throw new Error('Lava Top API configuration missing');
  }

  const response = await fetch(`${LAVA_API_BASE}/api/v3/invoice`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'X-Api-Key': apiKey, // Alternative header used by some Lava versions
    },
    body: JSON.stringify({
      productId: productId,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Lava Top Error (${response.status}):`, errorBody);
    throw new Error(`Failed to create Lava Top invoice: ${response.statusText} (${errorBody})`);
  }

  return await response.json();
}

/**
 * Verifies the webhook signature sent by Lava Top
 * Note: Our current setup uses "API key вашего сервиса" with value 'tungoev'
 * So Lava Top will send this in a header (likely Authorization or X-Lava-Token)
 */
export function verifyLavaWebhook(headersList: Headers, bodyText: string): boolean {
  // In our specific setup, we told Lava Top to use "API key вашего сервиса" = 'tungoev'
  // We need to check which header they use. Usually it's Authorization or X-Lava-Token.
  const providedToken = headersList.get('Authorization')?.replace('Bearer ', '') || 
                        headersList.get('x-lava-token');
  
  if (providedToken === process.env.LAVA_WEBHOOK_SECRET) {
    return true;
  }

  // Fallback: Check HMAC signature if they provide one automatically
  const signature = headersList.get('x-webhook-signature');
  if (signature && process.env.LAVA_WEBHOOK_SECRET) {
    const expected = crypto
      .createHmac('sha256', process.env.LAVA_WEBHOOK_SECRET)
      .update(bodyText)
      .digest('hex');
    
    return signature === expected;
  }

  return false;
}
