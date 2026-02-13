import Link from 'next/link';

export default function FeaturedFragments() {
  return (
    <section className="py-24 bg-white" id="culture">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className="flex flex-col md:flex-row justify-between items-end mb-16"
          data-animation-on-scroll=""
        >
          <div className="max-w-2xl">
            <h3 className="text-4xl md:text-5xl font-light text-gray-900 font-secondary">
              Fragments of <span className="font-primary italic">Observation</span>
            </h3>
            <p className="text-gray-500 mt-4 text-lg">
              Cross-disciplinary insights into how we live, read, and report today.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-red-600 font-bold uppercase tracking-widest text-xs border-b-2 border-red-600 pb-1 mt-6 md:mt-0 hover:text-gray-900 hover:border-gray-900 transition-all"
          >
            Explore the Journal
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Literature Pillar */}
          <div
            className="group border border-gray-100 p-8 hover:bg-gray-50 transition-colors"
            data-animation-on-scroll=""
          >
            <div className="w-12 h-12 bg-red-600 text-white flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-4 font-secondary uppercase tracking-tight">
              The Printed Word
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Evaluating contemporary fiction through the lens of history, narrative architecture,
              and the emotional resonance of prose.
            </p>
            <ul className="space-y-3 text-xs font-bold uppercase tracking-widest text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span> Book Reviews
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span> Literary Theory
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span> Author Profiles
              </li>
            </ul>
          </div>

          {/* Culture Pillar */}
          <div
            className="group border border-gray-100 p-8 hover:bg-gray-50 transition-colors"
            data-animation-on-scroll=""
          >
            <div className="w-12 h-12 bg-gray-900 text-white flex items-center justify-center mb-6 text-xl">
              <span className="font-primary italic">c.</span>
            </div>
            <h4 className="text-xl font-bold mb-4 font-secondary uppercase tracking-tight">
              Modern Culture
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Navigating the noise of the digital age, examining social trends, and finding meaning
              in our collective behaviors.
            </p>
            <ul className="space-y-3 text-xs font-bold uppercase tracking-widest text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-900 rounded-full"></span> Digital Society
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-900 rounded-full"></span> Social Commentary
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-900 rounded-full"></span> Art & Aesthetics
              </li>
            </ul>
          </div>

          {/* Journalism Pillar */}
          <div
            className="group border border-gray-100 p-8 hover:bg-gray-50 transition-colors"
            data-animation-on-scroll=""
          >
            <div className="w-12 h-12 bg-red-600 text-white flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-4 font-secondary uppercase tracking-tight">
              Journalism
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Reporting from the frontlines of thought. Long-form essays that combine factual rigor
              with narrative storytelling.
            </p>
            <ul className="space-y-3 text-xs font-bold uppercase tracking-widest text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span> Investigative Essays
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span> Feature Stories
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span> Media Ethics
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
