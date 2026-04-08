import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-background pt-24 min-h-[70vh] text-center">
      <div className="text-5xl mb-6">вњЁ</div>
      <h1 className="font-serif text-4xl text-blue-deep mb-4">Thank you for your purchase.</h1>
      
      <p className="text-muted max-w-md mb-8 mx-auto">
        Your order is complete. May Allah put barakah in your learning.
      </p>
      
      <Link href="/intro" className="inline-block bg-gold hover:bg-gold-light text-blue-deep px-10 py-5 text-lg font-medium transition-all duration-500 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_50px_rgba(201,168,76,0.6)] mb-8 rounded-sm">
        Begin: Read the Introduction
      </Link>

      <div className="text-sm text-muted max-w-md mx-auto mb-4 bg-card p-4 border border-gold/10 shadow-sm">
        You will also receive an email with the download link within a few minutes.
      </div>

      <p className="text-xs text-muted/70 mt-4">
        For any questions or support, contact: support@[yourdomain].com
      </p>
    </div>
  );
}
