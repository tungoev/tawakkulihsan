import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-background pt-24 min-h-[70vh]">
      <h1 className="font-serif text-4xl text-blue-deep mb-4">Checkout</h1>
      <p className="text-muted max-w-md text-center mb-8">
        Payment integration placeholder. Stripe or another provider will be connected here to process the $27 payment.
      </p>
      <Link href="/thank-you" className="bg-gold text-blue-deep px-8 py-3 font-medium shadow-md transition-transform hover:-translate-y-0.5">
        [Simulate Payment]
      </Link>
      <p className="mt-12 text-sm text-gold/80 italic">TODO: Connect payment provider</p>
    </div>
  );
}
