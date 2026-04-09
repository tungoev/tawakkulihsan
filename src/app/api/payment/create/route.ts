import { NextResponse } from 'next/server';
import { createLavaInvoice } from '@/lib/lava';

export async function POST(req: Request) {
  try {
    // For now, we use a placeholder email. In a real scenario, we might collect it.
    // However, for this masterclass, we can just initiate the payment link.
    const result = await createLavaInvoice();
    
    return NextResponse.json({ 
      success: true, 
      url: result.data.url 
    });
  } catch (error: any) {
    console.error('Payment creation error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
