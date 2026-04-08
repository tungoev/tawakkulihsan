import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import { Analytics } from "@vercel/analytics/react"
import { AnalyticsTracker } from '@/components/AnalyticsTracker';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rizq, Tawakkul, and Barakah | Find Peace with Your Provision',
  description: 'A Qur\'an-and-Sunnah-based digital course to heal your relationship with provision, overcome money anxiety, and understand Islamic concepts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased text-foreground bg-background flex flex-col min-h-screen" suppressHydrationWarning>
        <AnalyticsTracker />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
