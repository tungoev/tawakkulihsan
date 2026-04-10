'use server';

import { getDb, saveDb, Review, Gender } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { cookies, headers } from 'next/headers';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function mockPurchase(gender: Gender) {
  const db = getDb();
  db.analytics.sales += 1;
  if (gender === 'MALE') {
    db.analytics.buyersByGender.male += 1;
  } else {
    db.analytics.buyersByGender.female += 1;
  }
  saveDb(db);
  revalidatePath('/admin');
}

export async function requestVerificationCode(email: string) {
  const db = getDb();
  
  if (!resend) {
    console.warn('Resend API key missing. Skipping real email send.');
  }

  const isBuyer = db.buyers.includes(email);
  if (!isBuyer) {
    return { success: false, error: 'purchased_not_found' };
  }

  const code = Math.floor(1000 + Math.random() * 9000).toString();
  
  db.verifications[email] = {
    code,
    expiresAt: Date.now() + 10 * 60 * 1000
  };
  saveDb(db);

  console.log(`[VERIFICATION] Code for ${email}: ${code}`);
  
  try {
    if (resend) {
      await resend.emails.send({
        from: 'Tawakkul Ihsan <onboarding@resend.dev>',
        to: email,
        subject: 'Your Verification Code - Tawakkul Ihsan',
        html: `
          <div style="font-family: serif; padding: 20px; border: 1px solid #c9a84c; color: #1a1f2c;">
            <h2 style="color: #c9a84c;">Verification Code</h2>
            <p>Your authentication code for writing a verified review is:</p>
            <div style="font-size: 32px; letter-spacing: 5px; font-weight: bold; margin: 20px 0; color: #1a1f2c;">${code}</div>
            <p style="font-size: 12px; color: #666;">This code will expire in 10 minutes.</p>
          </div>
        `
      });
    }
  } catch (err) {
    console.error('Failed to send email via Resend:', err);
  }

  return { success: true };
}

export async function verifyReviewCode(email: string, code: string) {
  const db = getDb();
  const record = db.verifications[email];

  if (!record) return { success: false, error: 'no_code_found' };
  
  if (Date.now() > record.expiresAt) {
    delete db.verifications[email];
    saveDb(db);
    return { success: false, error: 'code_expired' };
  }

  if (record.code !== code) {
    return { success: false, error: 'invalid_code' };
  }

  delete db.verifications[email];
  saveDb(db);
  
  return { success: true };
}

export async function trackVisit() {
  const cookieStore = await cookies();
  const headersList = await headers();
  
  if (cookieStore.has('tawakkul_visited')) {
    return;
  }
  
  const db = getDb();
  db.analytics.visits += 1;
  
  const country = (headersList.get('x-vercel-ip-country') || 'Unknown').toUpperCase();
  db.analytics.countries[country] = (db.analytics.countries[country] || 0) + 1;
  
  const ua = headersList.get('user-agent') || '';
  const isMobile = /Mobi|Android|iPhone/i.test(ua);
  if (isMobile) {
    db.analytics.devices.mobile += 1;
  } else {
    db.analytics.devices.desktop += 1;
  }
  
  saveDb(db);
  
  cookieStore.set('tawakkul_visited', 'true', { 
    maxAge: 60 * 60 * 24, 
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });
  
  revalidatePath('/admin');
}

export async function submitAdvancedReview(formData: FormData) {
  const authorName = formData.get('authorName') as string;
  const email = formData.get('email') as string;
  const gender = formData.get('gender') as Gender;
  const content = formData.get('content') as string;
  
  const depth = parseInt(formData.get('depth') as string, 10);
  const clarity = parseInt(formData.get('clarity') as string, 10);
  const practicality = parseInt(formData.get('practicality') as string, 10);

  if (!email || !gender || isNaN(depth) || isNaN(clarity) || isNaN(practicality)) {
    throw new Error('Required fields are missing.');
  }

  const ratingAverage = parseFloat(((depth + clarity + practicality) / 3).toFixed(1));
  const sentiment = ratingAverage >= 4 ? 'POSITIVE' : 'NEGATIVE';
  const status = sentiment === 'POSITIVE' ? 'PUBLISHED' : 'PENDING';
  const id = Math.random().toString(36).substring(2, 9);

  const newReview: Review = {
    id,
    authorName: authorName || 'Anonymous',
    email,
    gender,
    content,
    ratingAverage,
    subRatings: { depth, clarity, practicality },
    sentiment,
    status,
    createdAt: new Date().toISOString(),
  };

  const db = getDb();
  db.reviews.unshift(newReview);
  
  if (gender === 'MALE') {
    if (sentiment === 'POSITIVE') db.analytics.sentimentByGender.malePositive += 1;
    else db.analytics.sentimentByGender.maleNegative += 1;
  } else {
    if (sentiment === 'POSITIVE') db.analytics.sentimentByGender.femalePositive += 1;
    else db.analytics.sentimentByGender.femaleNegative += 1;
  }

  saveDb(db);
  revalidatePath('/');
  revalidatePath('/admin/reviews');
  revalidatePath('/admin');

  return newReview;
}

export async function addManualBuyer(email: string, gender: Gender) {
  const db = getDb();
  if (!db.buyers.includes(email)) {
    db.buyers.push(email);
    db.analytics.sales += 1;
    if (gender === 'MALE') db.analytics.buyersByGender.male += 1;
    else db.analytics.buyersByGender.female += 1;
    saveDb(db);
    revalidatePath('/admin');
    return { success: true };
  }
  return { success: false, error: 'already_exists' };
}

export async function addBuyerAction(formData: FormData) {
  const email = formData.get('email') as string;
  if (email) {
    await addManualBuyer(email, 'MALE');
  }
}

export async function mockPurchaseMaleAction() {
  await mockPurchase('MALE');
}

export async function mockPurchaseFemaleAction() {
  await mockPurchase('FEMALE');
}

export async function removeBuyerAction(formData: FormData) {
  const email = formData.get('email') as string;
  if (email) {
    const db = getDb();
    db.buyers = db.buyers.filter(e => e !== email);
    saveDb(db);
    revalidatePath('/admin');
  }
}

export async function removeBuyer(email: string) {
  const db = getDb();
  db.buyers = db.buyers.filter(e => e !== email);
  saveDb(db);
  revalidatePath('/admin');
  return { success: true };
}

export async function approveReview(id: string) {
  const db = getDb();
  const review = db.reviews.find(r => r.id === id);
  if (review) {
    review.status = 'PUBLISHED';
    saveDb(db);
    revalidatePath('/');
    revalidatePath('/admin/reviews');
  }
}

export async function rejectReview(id: string) {
  const db = getDb();
  const review = db.reviews.find(r => r.id === id);
  if (review) {
    review.status = 'REJECTED';
    saveDb(db);
    revalidatePath('/');
    revalidatePath('/admin/reviews');
  }
}

export async function getPublishedReviews() {
  const db = getDb();
  return db.reviews.filter(r => r.status === 'PUBLISHED');
}

export async function getAnalytics() {
  const db = getDb();
  return {
    ...db.analytics,
    buyers: db.buyers
  };
}

export async function getAllReviews() {
  const db = getDb();
  return db.reviews;
}
