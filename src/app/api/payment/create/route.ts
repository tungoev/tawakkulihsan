import { NextResponse } from 'next/server';
import { createLavaInvoice } from '@/lib/lava';

export async function POST(req: Request) {
  try {
    const result = await createLavaInvoice();
    console.log('Payment API: Processing response from Lava Top');
    
    // Safety check for result itself
    if (!result) {
      console.error('Payment API: createLavaInvoice returned undefined or null');
      throw new Error('Internal error: Failed to get response from payment provider');
    }

    // Use optional chaining for all access
    const paymentUrl = result?.data?.url || result?.url || result?.data?.paymentUrl;
    
    if (!paymentUrl) {
      console.error('Payment API: Payment URL not found in Lava Top response. Raw result:', JSON.stringify(result, null, 2));
      throw new Error(`Payment link could not be generated. Please contact support. (Ref: ${result?.data?.id || 'no-id'})`);
    }

    return NextResponse.json({ 
      success: true, 
      url: paymentUrl 
    });
  } catch (error: any) {
    console.error('Payment creation error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
