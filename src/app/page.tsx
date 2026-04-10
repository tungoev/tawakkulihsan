import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Check, 
  HeartHandshake, 
  AlertCircle,
  HelpCircle,
  FileText,
  ArrowUp
} from 'lucide-react';
import { ReviewSection } from '@/components/ReviewSection';
import { getPublishedReviews } from '@/app/actions';

export default async function Home() {
  const publishedReviews = await getPublishedReviews();

  return (
    <main id="top" className="flex flex-col w-full selection:bg-gold/20 relative">
      <HeroSection />
      <ProblemSection />
      <AudienceSection />
      <TransformationSection />
      <CourseBreakdownSection />
      <IncludedSection />
      <ExperienceSection />
      <FoundationSection />
      <FaqSection />
      <ReviewSection initialReviews={publishedReviews} />
      <FinalCtaSection />
      <Footer />
      
      {/* Scroll To Top Button */}
      <a 
        href="#top" 
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-12 h-12 bg-blue-deep hover:bg-gold-light text-gold hover:text-blue-deep rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(201,168,76,0.2)] transition-all duration-500 z-50 border border-gold/20 hover:border-transparent opacity-80 hover:opacity-100 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(201,168,76,0.5)]"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </a>
    </main>
  );
}

// 1. Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-blue-mid overflow-hidden">
      {/* Background soft gradients */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gold/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-blue-deep rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <div className="text-gold opacity-90 text-sm tracking-[0.2em] uppercase font-medium mb-6">
          A Qur’an & Sunnah based masterclass
        </div>
        <h1 className="font-serif text-5xl md:text-7xl font-light text-white leading-[1.15] mb-6">
          Rizq, Tawakkul, <span className="text-gold-light italic">&</span> Barakah
        </h1>
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mb-8"></div>
        <p className="text-lg md:text-xl text-white/75 font-light leading-relaxed max-w-xl mx-auto mb-10">
          An elegant Qur'an & Sunnah-based course to correct your understanding of Rizq, deepen your Tawakkul, and find peace in Allah's decree.
        </p>
        
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <Link 
              href="/checkout" 
              className="w-full sm:w-auto bg-gold hover:bg-gold-light text-blue-deep px-10 py-4 font-medium tracking-wide transition-all duration-500 transform hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(201,168,76,0.4)] shadow-[0_0_20px_rgba(201,168,76,0.2)] text-center rounded-sm"
            >
              Buy Now for $27
            </Link>
            <a 
              href="#inside" 
              className="text-white/70 hover:text-gold font-medium text-sm tracking-wide uppercase transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(201,168,76,0.5)]"
            >
              VIEW THE MODULES
            </a>
          </div>
          <p className="text-white/50 text-xs tracking-wider uppercase mt-4 text-center">
            Instant PDF access • 7 modules • Reflection test • Lifetime access
          </p>
        </div>
      </div>
    </section>
  );
}

// 2. Problem Section
function ProblemSection() {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-4xl text-blue-deep mb-8">
          You know the words, but the anxiety remains
        </h2>
        <div className="space-y-6 text-muted text-lg leading-relaxed text-left md:text-center">
          <p>
            Most Muslims know the words Rizq and Tawakkul. Yet many still carry quiet anxiety about money, work, and the future.
          </p>
          <p>
            This course was created to correct that understanding through Qur'an and authentic Sunnah — not through hustle culture, empty motivation, or financial hype.
          </p>
          <p>
            When your understanding of provision becomes sound, the heart becomes lighter, calmer, and more anchored in Allah.
          </p>
        </div>
      </div>
    </section>
  );
}

// 3. Who This Is For
function AudienceSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-blue-deep mb-4">Who is this for?</h2>
          <p className="text-muted text-lg">Clarity begins with knowing what you are signing up for.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* True For */}
          <div className="bg-card p-10 shadow-sm border border-gold/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(201,168,76,0.15)] hover:border-gold/30 rounded-sm">
            <h3 className="font-medium text-lg text-blue-deep tracking-wider uppercase mb-8 flex items-center gap-3">
              <CheckCircle2 className="text-gold" /> This is for you if...
            </h3>
            <ul className="space-y-6">
              {[
                "You feel constant anxiety about money or the future.",
                "You want a clearer Qur'an-based understanding of Rizq and Tawakkul.",
                "You are tired of motivational noise and want something grounded.",
                "You want more peace, clarity, and trust in Allah's decree."
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start text-muted">
                  <Check className="text-gold shrink-0 mt-1 h-5 w-5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not For */}
          <div className="bg-card p-10 shadow-sm border border-gold/10 opacity-70 transition-all duration-500 hover:opacity-100 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(201,168,76,0.15)] hover:border-gold/30 rounded-sm">
            <h3 className="font-medium text-lg text-blue-deep tracking-wider uppercase mb-8 flex items-center gap-3">
              <XCircle className="text-red-900/50" /> This is NOT for you if...
            </h3>
            <ul className="space-y-6">
              {[
                "You want get-rich-quick formulas or financial shortcuts.",
                "You are looking for business coaching or investment advice.",
                "You expect guaranteed financial results.",
                "You want empty motivation instead of Islamic understanding."
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start text-muted">
                  <span className="block w-1.5 h-1.5 rounded-full bg-red-900/40 shrink-0 mt-2.5"></span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// 4. Transformation Section
function TransformationSection() {
  return (
    <section className="py-24 px-6 bg-blue-deep text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-4xl mb-12">What you will understand</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(201,168,76,0.15)] rounded-sm border border-transparent hover:border-gold/20 hover:bg-blue-mid/30 group">
            <div className="w-16 h-16 mx-auto bg-blue-mid flex items-center justify-center rounded-full mb-6 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] group-hover:bg-blue-deep border border-transparent group-hover:border-gold/30">
              <BookOpen className="text-gold" />
            </div>
            <h3 className="font-medium text-lg mb-3">Rizq Is More Than Money</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              Discover a wider understanding of provision beyond income alone.
            </p>
          </div>
          <div className="text-center p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(201,168,76,0.15)] rounded-sm border border-transparent hover:border-gold/20 hover:bg-blue-mid/30 group">
            <div className="w-16 h-16 mx-auto bg-blue-mid flex items-center justify-center rounded-full mb-6 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] group-hover:bg-blue-deep border border-transparent group-hover:border-gold/30">
              <HeartHandshake className="text-gold" />
            </div>
            <h3 className="font-medium text-lg mb-3">True Tawakkul</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              Learn how reliance on Allah and sincere effort work together.
            </p>
          </div>
          <div className="text-center p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(201,168,76,0.15)] rounded-sm border border-transparent hover:border-gold/20 hover:bg-blue-mid/30 group">
            <div className="w-16 h-16 mx-auto bg-blue-mid flex items-center justify-center rounded-full mb-6 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] group-hover:bg-blue-deep border border-transparent group-hover:border-gold/30">
              <AlertCircle className="text-gold" />
            </div>
            <h3 className="font-medium text-lg mb-3">What Blocks Provision</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              Understand how sins, spiritual neglect, and harmful patterns affect the heart and one's livelihood.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// 5. Course Breakdown
function CourseBreakdownSection() {
  const modules = [
    { num: "01", title: "Ar-Razzaq & The Nature of Rizq", desc: "Understand how your provision was written before birth and why money anxiety is a whisper of Shaytan." },
    { num: "02", title: "What Rizq Really Is (Five Forms)", desc: "Learn the difference between your active effort (Kasb) and Allah's guaranteed provision (Rizq)." },
    { num: "03", title: "Tawakkul Correctly Understood", desc: "Discover the true levels of reliance on Allah and what it looks like in real financial situations." },
    { num: "04", title: "Keys That Open Provision", desc: "Learn the specific actions from the Qur'an and Sunnah that actively invite provision." },
    { num: "05", title: "What Blocks Rizq", desc: "Discover the spiritual barriers that cut off provision and how to effectively remove them." },
    { num: "06", title: "Barakah: The Deciding Blessing", desc: "Learn how to invite genuine Barakah into your life so your wealth brings you peace." },
    { num: "07", title: "Allah's Wisdom in Distribution", desc: "Understand why wealth is not a reward and poverty is not a punishment." }
  ];

  return (
    <section id="inside" className="py-24 px-6 bg-card">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4">Course Structure</p>
          <h2 className="font-serif text-4xl text-blue-deep">7 Modules for the Heart</h2>
        </div>

        <div className="space-y-4">
          {modules.map((mod, idx) => (
            <div key={idx} className="flex gap-6 p-6 border border-gold/50 hover:border-gold transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(201,168,76,0.2)] bg-background/50 rounded-sm">
              <div className="font-serif text-4xl text-gold/80 mt-1">{mod.num}</div>
              <div>
                <h3 className="text-xl font-medium text-blue-deep mb-2">{mod.title}</h3>
                <p className="text-muted leading-relaxed">{mod.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. What's Included
function IncludedSection() {
  return (
    <section className="py-24 px-6 bg-background border-t border-gold/10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-3xl text-blue-deep mb-12">What you get when you join</h2>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-card p-8 border-l-4 border-gold shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(201,168,76,0.15)] hover:border-gold-light">
            <FileText className="text-gold mb-6 h-8 w-8" />
            <h3 className="font-medium text-xl mb-3 text-blue-deep">7 Digital PDF Modules</h3>
            <p className="text-muted leading-relaxed">Carefully written, beautifully formatted lessons designed for deep reflection and calm reading.</p>
          </div>
          <div className="bg-card p-8 border-l-4 border-gold shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(201,168,76,0.15)] hover:border-gold-light">
            <HelpCircle className="text-gold mb-6 h-8 w-8" />
            <h3 className="font-medium text-xl mb-3 text-blue-deep">35-Question Reflection Test + Answer Key</h3>
            <p className="text-muted leading-relaxed">A guided self-check to help you review, absorb, and retain what you have learned.</p>
          </div>
        </div>
        
        <p className="text-muted mt-12 text-sm uppercase tracking-wider">
          One-time purchase • Instant access • Read on phone, tablet, or laptop • Lifetime access
        </p>
      </div>
    </section>
  );
}

// 7. Experience
function ExperienceSection() {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-3xl text-blue-deep mb-16">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(201,168,76,0.1)] rounded-sm border border-transparent hover:border-gold/20">
            <div className="text-5xl font-serif text-gold-light mb-4 transition-transform duration-500 origin-bottom">1</div>
            <h3 className="font-medium text-lg mb-2 text-blue-deep">Secure Checkout</h3>
            <p className="text-sm text-muted">Complete your one-time purchase safely and simply.</p>
          </div>
          <div className="p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(201,168,76,0.1)] rounded-sm border border-transparent hover:border-gold/20">
            <div className="text-5xl font-serif text-gold-light mb-4 transition-transform duration-500 origin-bottom">2</div>
            <h3 className="font-medium text-lg mb-2 text-blue-deep">Instant Access</h3>
            <p className="text-sm text-muted">Receive instant access to your course files after checkout.</p>
          </div>
          <div className="p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(201,168,76,0.1)] rounded-sm border border-transparent hover:border-gold/20">
            <div className="text-5xl font-serif text-gold-light mb-4 transition-transform duration-500 origin-bottom">3</div>
            <h3 className="font-medium text-lg mb-2 text-blue-deep">Study at Your Pace</h3>
            <p className="text-sm text-muted">Read slowly, reflect deeply, and return whenever you need.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// 8. Foundation
function FoundationSection() {
  return (
    <section className="py-24 px-6 bg-blue-deep text-center">
      <div className="max-w-3xl mx-auto text-white">
        <h2 className="font-serif text-4xl mb-6 text-gold-light">An Unshakeable Foundation</h2>
        <p className="text-lg leading-relaxed text-white/80">
          This course is grounded in the Noble Qur'an and authentic Sunnah. It does not promise wealth, shortcuts, or financial formulas. Its purpose is to correct understanding, calm the heart, and strengthen trust in Allah.
        </p>
      </div>
    </section>
  );
}

// 9. FAQ
function FaqSection() {
  const faqs = [
    {
      q: "Is this course about making more money?",
      a: "No. It is about understanding the reality of provision (Rizq) to heal your anxiety and establish Barakah (blessing). While obeying Allah opens doors of provision, this is a theological course, not a financial strategy program."
    },
    {
      q: "Is this course for both men and women?",
      a: "Yes. The theological principles of Tawakkul, Rizq, and Barakah apply to every Muslim regardless of gender, profession, or marital status."
    },
    {
      q: "Is the course delivered via video or PDF?",
      a: "The course is delivered as beautifully formatted PDF files. This is intentional: the reading format encourages slower reflection and deeper understanding."
    },
    {
      q: "How long will I have access?",
      a: "You get lifetime digital access immediately upon purchase. You can read it at your own pace and revisit it whenever you feel money anxiety creeping back."
    },
    {
      q: "How will I receive the course?",
      a: "Immediately after purchase, you will receive access to download the full course files."
    },
    {
      q: "Is this a one-time payment?",
      a: "Yes. This is a one-time purchase of $27 with lifetime access to the files."
    },
    {
      q: "Can I read it on my phone?",
      a: "Yes. The course files can be read comfortably on phone, tablet, or computer."
    }
  ];

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-blue-deep">Frequently Asked Questions</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-card p-6 md:p-8 shadow-sm border border-transparent transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(201,168,76,0.15)] hover:border-gold/30 rounded-sm">
              <h3 className="font-medium text-lg text-blue-deep mb-3 transition-colors">{faq.q}</h3>
              <p className="text-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 10. Final CTA
function FinalCtaSection() {
  return (
    <section className="py-32 px-6 bg-blue-mid text-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-light/5 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="font-serif text-3xl md:text-5xl text-gold mb-8 leading-tight">
          إِنَّ اللَّهَ هُوَ الرَّزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ
        </div>
        <p className="font-serif text-xl md:text-3xl font-light italic text-white/90 mb-4">
          "Indeed, it is Allah who is the [continual] Provider, the firm possessor of strength."
        </p>
        <p className="text-white/40 text-sm tracking-[0.1em] mb-8 uppercase">Surah Ad-Dhariyat, 58</p>
        
        <p className="text-gold-light text-sm font-medium tracking-wide uppercase mb-6">
          One-time purchase. Instant access. Read at your own pace.
        </p>

        <Link 
          href="/checkout" 
          className="inline-block bg-gold hover:bg-gold-light text-blue-deep px-12 py-5 text-lg font-medium tracking-wide transition-all duration-500 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_0_50px_rgba(201,168,76,0.6)] rounded-sm"
        >
          Get Instant Access — $27
        </Link>
      </div>
    </section>
  );
}

// 11. Footer
function Footer() {
  return (
    <footer className="py-12 px-6 bg-[#0a172d] text-center border-t border-white/5">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <p className="font-serif text-2xl text-gold-light/70 mb-8">Rizq, Tawakkul & Barakah</p>
        
        <div className="flex gap-6 mb-4 text-sm text-white/40">
          <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
        
        <p className="text-white/40 text-sm mb-8">
          For any questions: support@tawakkulihsan.com
        </p>

        <p className="text-white/30 text-xs">
          &copy; {new Date().getFullYear()} All rights reserved. 
        </p>
      </div>
    </footer>
  );
}
