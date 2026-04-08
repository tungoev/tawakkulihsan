'use server';

import { getDb, saveDb, Review, Gender, SubRatings } from '@/lib/db';
import { revalidatePath } from 'next/cache';

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
  
  // Basic Sentiment Analysis Rule
  const sentiment = ratingAverage >= 4 ? 'POSITIVE' : 'NEGATIVE';
  const status = sentiment === 'POSITIVE' ? 'PUBLISHED' : 'PENDING';

  // Random ID
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
  
  // Update Analytics sentiment tracking based on gender
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

// Secret dev function to mock purchases and test analytics
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
  return db.analytics;
}

export async function getAllReviews() {
  const db = getDb();
  return db.reviews;
}
