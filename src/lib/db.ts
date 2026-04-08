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
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
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
    fs.writeFileSync(DB_PATH, JSON.stringify(freshDb, null, 2), 'utf-8');
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
      if (changed) {
        fs.writeFileSync(DB_PATH, JSON.stringify(existing, null, 2), 'utf-8');
      }
    } catch (e) {
      // If corrupted, reset
      fs.writeFileSync(DB_PATH, JSON.stringify(freshDb, null, 2), 'utf-8');
    }
  }
}

export function getDb(): Database {
  initDb();
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

export function saveDb(data: Database) {
  initDb();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
