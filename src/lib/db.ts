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

  if (!fs.existsSync(DB_PATH)) {
    const freshDb: Database = {
      analytics: {
        sales: 24,
        clicks: 843,
        visits: 1205,
        coursesCompleted: 15,
        buyersByGender: { male: 14, female: 10 },
        sentimentByGender: {
          malePositive: 4,
          maleNegative: 1,
          femalePositive: 3,
          femaleNegative: 0
        }
      },
      reviews: [
        {
          id: '1',
          authorName: 'Yusuf K.',
          email: 'yusuf@example.com',
          gender: 'MALE',
          content: 'This course completely changed my perspective on provision. I was constantly worried about my income, but now I understand ar-Razzaq. Beautifully written!',
          ratingAverage: 5,
          subRatings: { depth: 5, clarity: 5, practicality: 5 },
          sentiment: 'POSITIVE',
          status: 'PUBLISHED',
          createdAt: new Date(Date.now() - 100000000).toISOString()
        },
        {
          id: '2',
          authorName: 'Aisha M.',
          email: 'aisha@example.com',
          gender: 'FEMALE',
          content: 'Very grounded in Quran and Sunnah. It wasn’t a get-rich-quick scheme. It is pure medicine for the heart.',
          ratingAverage: 4.6,
          subRatings: { depth: 5, clarity: 4, practicality: 5 },
          sentiment: 'POSITIVE',
          status: 'PUBLISHED',
          createdAt: new Date(Date.now() - 50000000).toISOString()
        }
      ]
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(freshDb, null, 2), 'utf-8');
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
