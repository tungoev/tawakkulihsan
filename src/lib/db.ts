import fs from 'fs';
import path from 'path';

export type ReviewStatus = 'PENDING' | 'PUBLISHED' | 'REJECTED';
export type ReviewSentiment = 'POSITIVE' | 'NEGATIVE';
export type Gender = 'MALE' | 'FEMALE';

export interface SubRatings {
  depth: number;
  clarity: number;
  practicality: number;
}

export interface Review {
  id: string;
  authorName: string;
  email: string;
  gender: Gender;
  content?: string;
  ratingAverage: number;
  subRatings: SubRatings;
  sentiment: ReviewSentiment;
  status: ReviewStatus;
  createdAt: string;
}

export interface BuyerDemographics {
  male: number;
  female: number;
}

export interface SentimentDemographics {
  malePositive: number;
  maleNegative: number;
  femalePositive: number;
  femaleNegative: number;
}

export interface Analytics {
  sales: number;
  clicks: number;
  visits: number;
  coursesCompleted: number;
  buyersByGender: BuyerDemographics;
  sentimentByGender: SentimentDemographics;
  countries: Record<string, number>;
  devices: {
    mobile: number;
    desktop: number;
  };
}

export interface Database {
  analytics: Analytics;
  reviews: Review[];
}

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

// Initialize dummy db if it doesn't exist
function initDb() {
  const isVercel = process.env.VERCEL === '1';
  const dir = path.dirname(DB_PATH);
  
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (e: any) {
      if (!isVercel) console.error('Failed to create DB directory:', e);
    }
  }

  const freshDb: Database = {
    analytics: {
      sales: 0,
      clicks: 0,
      visits: 0,
      coursesCompleted: 0,
      buyersByGender: { male: 0, female: 0 },
      sentimentByGender: {
        malePositive: 0,
        maleNegative: 0,
        femalePositive: 0,
        femaleNegative: 0
      },
      countries: {},
      devices: { mobile: 0, desktop: 0 }
    },
    reviews: []
  };

  if (!fs.existsSync(DB_PATH)) {
    try {
      if (!isVercel) fs.writeFileSync(DB_PATH, JSON.stringify(freshDb, null, 2), 'utf-8');
    } catch (e: any) {
      // Silent on Vercel
    }
  } else {
    // Migration: ensure new fields exist
    try {
      const existing = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
      let changed = false;
      if (!existing.analytics.countries) {
        existing.analytics.countries = {};
        changed = true;
      }
      if (!existing.analytics.devices) {
        existing.analytics.devices = { mobile: 0, desktop: 0 };
        changed = true;
      }
      if (changed && !isVercel) {
        fs.writeFileSync(DB_PATH, JSON.stringify(existing, null, 2), 'utf-8');
      }
    } catch (e) {
      if (!isVercel) {
        try {
          fs.writeFileSync(DB_PATH, JSON.stringify(freshDb, null, 2), 'utf-8');
        } catch (we) {}
      }
    }
  }
}

export function getDb(): Database {
  try {
    initDb();
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (e: any) {
    console.error('Database read error, returning fresh state:', e);
  }
  
  // Return fresh state if reading fails
  return {
    analytics: {
      sales: 0,
      clicks: 0,
      visits: 0,
      coursesCompleted: 0,
      buyersByGender: { male: 0, female: 0 },
      sentimentByGender: {
        malePositive: 0,
        maleNegative: 0,
        femalePositive: 0,
        femaleNegative: 0
      },
      countries: {},
      devices: { mobile: 0, desktop: 0 }
    },
    reviews: []
  };
}

export function saveDb(data: Database) {
  const isVercel = process.env.VERCEL === '1';
  if (isVercel) return; // Skip saving on read-only filesystem

  try {
    initDb();
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e: any) {
    console.warn('Failed to save to database (likely read-only filesystem):', e?.message || e);
  }
}
