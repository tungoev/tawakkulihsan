import Link from 'next/link';

export default function CourseAccessPage() {
  return (
    <div className="flex-1 bg-background pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl text-blue-deep mb-4">Course Access</h1>
        <p className="text-muted mb-12">
          Download your course files below. Read them slowly and with reflection.
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-card p-6 border border-gold/10 hover:border-gold/30 transition-all rounded-sm shadow-sm gap-4">
            <span className="font-medium text-blue-deep text-lg">Course Intro</span>
            <Link href="/intro" className="text-gold hover:text-gold-light font-medium tracking-wide text-sm uppercase transition-colors cursor-pointer bg-gold/5 py-2 px-4 rounded-sm hover:-translate-y-0.5 inline-block text-center border border-gold/10">Read Online</Link>
          </div>

          {[1, 2, 3, 4, 5, 6, 7].map((m) => (
            <div key={m} className="flex flex-col sm:flex-row justify-between sm:items-center bg-card p-6 border border-gold/10 hover:border-gold/30 transition-all rounded-sm shadow-sm gap-4">
              <span className="font-medium text-blue-deep text-lg">Module {m}</span>
              <a href={`/course-files/module_${m}.pdf`} download className="text-gold hover:text-gold-light font-medium tracking-wide text-sm uppercase transition-colors cursor-pointer bg-gold/5 py-2 px-4 rounded-sm hover:-translate-y-0.5 inline-block text-center border border-gold/10">Download PDF</a>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-card p-6 border border-gold/10 hover:border-gold/30 transition-all rounded-sm shadow-sm gap-4">
            <span className="font-medium text-blue-deep text-lg">Conclusion</span>
            <a href="/course-files/conclusion.pdf" download className="text-gold hover:text-gold-light font-medium tracking-wide text-sm uppercase transition-colors cursor-pointer bg-gold/5 py-2 px-4 rounded-sm hover:-translate-y-0.5 inline-block text-center border border-gold/10">Download PDF</a>
          </div>
        </div>
        
        <h2 className="font-serif text-2xl text-blue-deep mb-4 mt-12">Bonuses</h2>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-blue-mid p-6 shadow-md rounded-sm gap-4">
            <span className="font-medium text-white text-lg">Reflection Test</span>
            <a href="/course-files/test.pdf" download className="text-blue-mid bg-gold hover:bg-gold-light font-medium tracking-wide text-sm uppercase transition-all cursor-pointer py-2 px-6 rounded-sm hover:-translate-y-0.5 inline-block text-center">Download PDF</a>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-blue-mid p-6 shadow-md rounded-sm gap-4">
            <span className="font-medium text-white text-lg">Test Answers</span>
            <a href="/course-files/answers.pdf" download className="text-blue-mid bg-gold hover:bg-gold-light font-medium tracking-wide text-sm uppercase transition-all cursor-pointer py-2 px-6 rounded-sm hover:-translate-y-0.5 inline-block text-center">Download PDF</a>
          </div>
        </div>
      </div>
    </div>
  );
}
