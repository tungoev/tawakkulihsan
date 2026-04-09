import { NextResponse } from 'next/server';
import { verifyLavaWebhook } from '@/lib/lava';
import { getDb, saveDb } from '@/lib/db';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const headersList = await headers();
    
    // 1. Verify that the request is authentic
    const isValid = verifyLavaWebhook(headersList, rawBody);
    
    if (!isValid) {
      console.warn('Unauthorized webhook attempt detected');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = JSON.parse(rawBody);
    console.log('Webhook received from Lava Top:', data);

    // 2. Process based on event type
    // Lava Top event types can vary, but usually 'PaymentSuccess' or 'invoice_paid'
    // Based on our research, we listen for successful payments.
    if (data.type === 'PaymentSuccess' || data.status === 'success' || data.status === 'paid') {
      const db = getDb();
      
      // Update Analytics
      db.analytics.sales += 1;
      
      // Update demographics based on data if available (Lava Top might send buyer details)
      // For now, we update general count.
      
      saveDb(db);
      console.log('Sale recorded in database via Webhook');
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
