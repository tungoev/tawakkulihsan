"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { BookOpen, AlertCircle, HeartHandshake, CheckCircle2, ArrowUp } from 'lucide-react';

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, { threshold: 0.1 });
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function IntroPage() {
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isPastHero = window.scrollY > window.innerHeight * 0.6;
      
      // РЎРєСЂС‹С‚СЊ РёРЅС„РѕСЂРјРµСЂ, РµСЃР»Рё РјС‹ РїСЂРёР±Р»РёР¶Р°РµРјСЃСЏ Рє РїРѕСЃР»РµРґРЅРµР№ РєРЅРѕРїРєРµ (в‰€600px РґРѕ РєРѕРЅС†Р° СЃС‚СЂР°РЅРёС†С‹)
      const scrolledToBottom = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.offsetHeight;
      const pixelsFromBottom = documentHeight - scrolledToBottom;
      const isNearBottom = pixelsFromBottom < 600;

      if (isPastHero && !isNearBottom) {
        setShowStickyCta(true);
      } else {
        setShowStickyCta(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main id="top" className="flex flex-col w-full selection:bg-gold/20 font-light text-foreground bg-background relative">
      
      {/* в”Ђв”Ђ HERO в”Ђв”Ђ */}
      <section className="relative min-h-screen bg-blue-mid flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">
        {/* Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(201,168,76,0.12)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_100%,rgba(15,52,96,0.6)_0%,transparent_60%)]" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
          <Reveal delay={200}>
            <div className="text-3xl sm:text-5xl text-gold tracking-widest mb-8 font-serif">ШЁЩђШіЩ’Щ…Щђ Ш§Щ„Щ„ЩЋЩ‘Щ‡Щђ Ш§Щ„Ш±ЩЋЩ‘Ш­Щ’Щ…ЩЋЩ†Щђ Ш§Щ„Ш±ЩЋЩ‘Ш­ЩђЩЉЩ…Щђ</div>
          </Reveal>
          
          <Reveal delay={400}>
            <h1 className="font-serif text-5xl sm:text-7xl text-white leading-tight mb-4 tracking-wide">
              Rizq — <span className="text-gold-light italic">Provision from Allah</span>
            </h1>
          </Reveal>

          <Reveal delay={600}>
            <p className="font-sans text-sm sm:text-lg text-white/60 tracking-[0.12em] uppercase mb-12">
              A Course for Practising Muslims
            </p>
          </Reveal>

          <Reveal delay={700}>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-12" />
          </Reveal>

          <Reveal delay={800}>
            <p className="max-w-2xl text-lg text-white/80 leading-relaxed">
              How a correct understanding of rizq opens the path to provision, calms anxiety about money, and brings the heart to peace — through the Quran and Sunnah.
            </p>
          </Reveal>

          <Reveal delay={1000} className="mt-12 flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link 
              href="/course-access" 
              className="w-full sm:w-auto bg-gold hover:bg-gold-light text-blue-deep px-10 py-5 font-medium tracking-wide transition-all duration-500 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_40px_rgba(201,168,76,0.6)] rounded-sm text-center"
            >
              Access Your Course Files Now
            </Link>
            <a 
              href="#instructions" 
              className="w-full sm:w-auto border border-white/20 hover:border-gold text-white/80 hover:text-gold px-10 py-5 font-medium tracking-wide transition-all duration-300 rounded-sm text-center"
            >
              Read Instructions
            </a>
          </Reveal>
        </div>
      </section>

      {/* в”Ђв”Ђ INTRO BLOCK в”Ђв”Ђ */}
      <section className="bg-card py-24 px-6 border-b border-gold/10">
        <Reveal className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 sm:gap-16 items-start">
          <div>
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-3">About This Course</p>
            <blockquote className="font-serif text-2xl sm:text-3xl font-light italic text-blue-deep leading-relaxed border-l-2 border-gold pl-6 py-2">
              "And whoever relies upon Allah — He is sufficient for him."
              <footer className="block mt-4 text-[13px] not-italic font-sans text-muted tracking-wider">Surah At-Talaq, verse 3</footer>
            </blockquote>
          </div>
          <div className="space-y-4 text-muted leading-relaxed text-lg">
            <p>This course was written to <strong className="text-foreground font-medium">help your heart find the true path to provision</strong> — the path that Allah has shown.</p>
            <p>Most of us know the words "tawakkul" and "rizq." Yet anxiety about money does not go away. This course addresses exactly that — not through beautiful words, but through verses of the Quran and authentic hadith.</p>
            <p>Seven modules. Each one a living conversation with the soul — not a lecture.</p>
          </div>
        </Reveal>
      </section>

      {/* в”Ђв”Ђ HOW TO TAKE в”Ђв”Ђ */}
      <section id="instructions" className="py-24 px-6 bg-background">
        <Reveal className="max-w-5xl mx-auto">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-3">How to Take the Course</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-blue-deep mb-6">How the Course Is Structured</h2>
          <p className="text-muted max-w-2xl leading-relaxed mb-12">The course is taken sequentially — each module builds on the previous one. Do not rush. Each module is written to be read slowly.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: "01", title: "Read in Order", text: "Begin with Module 1 and move sequentially. Each subsequent module builds on the understanding of the one before." },
              { num: "02", title: "Complete the Practice", text: "At the end of each module there is one small action. Do not skip it. It is through practice that knowledge becomes alive." },
              { num: "03", title: "Take the Test", text: "After all modules — a test of 35 questions. It will help you see what has truly settled in the heart, not merely in memory." },
              { num: "04", title: "Check the Answers", text: "Open the answer file only after completing the test. Every answer comes with an explanation and a source." }
            ].map((step, i) => (
              <div key={i} className="bg-card p-8 shadow-sm border border-gold/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:border-gold/30">
                <div className="font-serif text-5xl font-light text-gold/20 mb-4">{step.num}</div>
                <h3 className="text-sm font-medium tracking-wide uppercase text-blue-deep mb-3">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* в”Ђв”Ђ MODULES в”Ђв”Ђ */}
      <section className="py-24 px-6 bg-card border-y border-gold/10">
        <Reveal className="max-w-4xl mx-auto">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-3">Contents</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-blue-deep mb-6">Seven Modules and Completion</h2>
          <p className="text-muted max-w-2xl leading-relaxed mb-12">Each module is a separate file. Open them one at a time, in numbered order.</p>

          <div className="flex flex-col gap-[1px] bg-gold/10 border border-gold/10">
            {[
              { num: "1", title: "Ar-Razzaq — The One Who Has Not Forgotten a Single Soul", desc: "The Name of Allah that changes everything. Where anxiety about money comes from — and why it is Shaytan's whisper. Rizq is written before your birth: what this means in practice.", tag: "Foundation" },
              { num: "2", title: "What Is Rizq — A Complete Understanding", desc: "Five forms of rizq that most people don't think about. The difference between kasb and rizq — your part and Allah's part. Why you are wealthier than you think.", tag: "Understanding" },
              { num: "3", title: "Tawakkul — The Reliance That Sets You Free", desc: "The most misunderstood word in Islam. Three levels of tawakkul. How it appears in real financial situations — and why people with it achieve more.", tag: "State" },
              { num: "4", title: "The Keys to Rizq", desc: "Seven specific actions from the Quran and Sunnah that open rizq: dhikr, istighfar, Fajr prayer, fasting, sadaqah, silah ar-rahim, du'a. Each with a story and a practice.", tag: "Action" },
              { num: "5", title: "What Blocks Rizq", desc: "Four barriers: sins, haram earnings, severed ties of kinship, extravagance and miserliness. How tawbah opens what was closed.", tag: "Purification" },
              { num: "6", title: "Barakah — The Blessing That Changes Everything", desc: "Why some have much money yet no peace — while others have little, yet it is enough. Where barakah comes from and what removes it. The true goal is not maximum money.", tag: "Blessing" },
              { num: "7", title: "The Wisdom of Allah in the Distribution of Rizq", desc: "Why wealth is not a reward and poverty is not a punishment. The story of Qarun and the Prophet Ayyub п·є. Sabr and shukr as the two states that determine everything.", tag: "Wisdom" },
            ].map((mod, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8 bg-card hover:bg-background transition-colors items-start">
                <div className="font-serif text-4xl text-gold font-light sm:w-16">{mod.num}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-blue-deep mb-2">{mod.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{mod.desc}</p>
                </div>
                <div className="hidden sm:block text-[11px] font-medium tracking-wider uppercase text-gold/70">{mod.tag}</div>
              </div>
            ))}

            {/* Special Rows */}
            {[
              { title: "Course Conclusion", desc: "A final map of beliefs. A complete collection of du'as for rizq with transliteration. A practical tawakkul checklist. A closing word.", tag: "Conclusion" },
              { title: "Test — 35 Questions", desc: "Seven sections covering all modules. Questions of various types: multiple choice, concept matching, open questions from the heart. Open after all modules.", tag: "Test" },
              { title: "Answer Key", desc: "Every answer with an explanation of the mechanism and a source from the Quran or Sunnah. Open only after completing the test.", tag: "Answers" }
            ].map((mod, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8 bg-blue-mid hover:bg-blue-deep transition-colors items-start border-t border-blue-deep/50">
                <div className="font-serif text-4xl text-gold-light font-light sm:w-16">вњ¦</div>
                <div className="flex-1">
                  <h3 className="font-medium text-white mb-2">{mod.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{mod.desc}</p>
                </div>
                <div className="hidden sm:block text-[11px] font-medium tracking-wider uppercase text-gold-light">{mod.tag}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* в”Ђв”Ђ TIPS в”Ђв”Ђ */}
      <section className="py-24 px-6 bg-background">
        <Reveal className="max-w-5xl mx-auto">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-3">Before You Begin</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-blue-deep mb-12">A Few Things to Know</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "рџ“–", title: "Read Slowly", text: "This is not a textbook to be 'completed.' Stop wherever something touches you. Allow the meaning to settle." },
              { icon: "рџ¤І", title: "Begin with Intention", text: "Before each module, say inwardly: 'I am reading this to better understand Allah and His generosity.' Intention changes how the material is received." },
              { icon: "вњЌпёЏ", title: "Complete the Practice", text: "At the end of each module — one action. Small. Concrete. It is through this that knowledge becomes part of life, rather than merely information." },
              { icon: "рџ—“", title: "One Module a Day", text: "The ideal pace is one module per day, or every other day. Do not rush to finish everything at once. Better one module lived deeply." }
            ].map((tip, i) => (
              <div key={i} className="bg-card p-6 md:p-8 border-b-2 border-gold shadow-sm transition-transform hover:-translate-y-1">
                <div className="text-2xl mb-4">{tip.icon}</div>
                <h3 className="text-sm font-medium tracking-wide uppercase text-blue-deep mb-3">{tip.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* в”Ђв”Ђ FINAL CTA / CLOSING в”Ђв”Ђ */}
      <section className="py-24 px-6 bg-blue-mid text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(201,168,76,0.08)_0%,transparent_70%)]" />
        
        <Reveal className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <div className="text-2xl sm:text-4xl text-gold-light mb-6 font-serif">إِنَّ اللَّهَ هُوَ الرَّزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ</div>
          <p className="font-serif text-xl sm:text-3xl italic text-white/90 leading-relaxed mb-4">
            "Indeed, Allah is the Provider, the Firm Possessor of Strength"
          </p>
          <p className="text-sm text-white/40 tracking-[0.1em] uppercase mb-16">Surah Adh-Dhariyat, verse 58</p>

          <Link 
            href="/course-access" 
            className="inline-block bg-gold hover:bg-gold-light text-blue-deep px-12 py-5 font-medium tracking-wide text-lg sm:text-xl transition-all duration-500 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_50px_rgba(201,168,76,0.7)] rounded-sm"
          >
            Access Your Course Files Now
          </Link>
        </Reveal>
      </section>

      {/* в”Ђв”Ђ Floating Action Buttons в”Ђв”Ђ */}
      <div 
        className={`fixed z-50 transition-all duration-700 ease-out flex items-end sm:items-center justify-between w-full max-w-7xl mx-auto px-6 lg:px-10 left-0 right-0 pointer-events-none ${showStickyCta ? 'bottom-6 lg:bottom-10 opacity-100 translate-y-0' : '-bottom-20 opacity-0 translate-y-10'}`}
      >
        <Link 
          href="/course-access" 
          className="pointer-events-auto bg-blue-deep/95 backdrop-blur border border-gold/30 hover:bg-gold text-gold hover:text-blue-deep px-6 py-3 sm:px-8 sm:py-4 font-medium tracking-wide text-xs sm:text-sm uppercase transition-all duration-500 shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_0_40px_rgba(201,168,76,0.6)] rounded-full hover:-translate-y-1 flex items-center gap-2"
        >
          Download Course Files
        </Link>
        
        <a 
          href="#top" 
          className="pointer-events-auto w-12 h-12 bg-blue-deep/90 backdrop-blur-md hover:bg-gold-light text-gold hover:text-blue-deep rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(201,168,76,0.2)] transition-all duration-500 border border-gold/20 hover:border-transparent opacity-80 hover:opacity-100 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(201,168,76,0.5)] flex-shrink-0"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </a>
      </div>

    </main>
  );
}
