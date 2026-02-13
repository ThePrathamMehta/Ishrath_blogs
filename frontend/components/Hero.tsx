'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden" id="hero">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-xl relative z-10" data-animation-on-scroll="">
            <span className="text-red-600 font-bold uppercase tracking-widest text-xs mb-4 block">
              Issue No. 42 • Winter 2024
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight font-secondary leading-none">
              Literature. <br />
              Culture. <br />
              Real Life.
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-700 leading-snug mb-8 font-light">
              Deep dives into the{' '}
              <span className="font-primary italic relative inline-block">
                printed word
                <svg
                  className="absolute w-full h-2 -bottom-1 left-0 text-red-600"
                  viewBox="0 0 100 5"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 2.5 Q 50 5 100 2.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  ></path>
                </svg>
              </span>{' '}
              and the modern{' '}
              <span className="font-primary italic relative inline-block">
                human condition
                <svg
                  className="absolute w-4 h-4 -top-2 -right-3 text-gray-800"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z"></path>
                </svg>
              </span>{' '}
              as seen through journalism.
            </h2>

            {/* Newsletter Section */}
            <div className="bg-gray-50/80 p-6 rounded-sm max-w-lg relative border border-neutral-100">
              <p className="text-xs font-bold uppercase text-gray-400 mb-4 tracking-tighter">
                Subscribe to our weekly dispatch
              </p>
              <div className="flex flex-col md:flex-row gap-4 mb-3">
                <div className="flex-2">
                  <input
                    type="email"
                    placeholder="email@address.com"
                    className="w-full border-b-2 border-gray-300 bg-transparent px-2 py-2 focus:outline-none focus:border-red-600 transition-colors text-sm"
                  />
                </div>
                <div className="flex-1">
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest py-3 text-sm transition-colors shadow-sm">
                    Join
                  </button>
                </div>
              </div>

              {/* Scribble Arrow */}
              <svg
                width="60"
                height="40"
                viewBox="0 0 100 60"
                fill="none"
                className="absolute -bottom-10 -right-6 text-gray-800 transform -rotate-12 pointer-events-none"
              >
                <path
                  d="M10 10 Q 40 40 80 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                ></path>
                <path
                  d="M80 20 L 70 25 M 80 20 L 75 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
              </svg>
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="relative" data-animation-on-scroll="">
            <Image
              src="https://images.pexels.com/photos/3494806/pexels-photo-3494806.jpeg?w=800&h=1000&fit=crop"
              alt="Literature and Culture"
              width={800}
              height={1000}
              className="w-full h-[600px] object-cover rounded-sm shadow-2xl z-20 relative grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
            {/* Background block to mimic reference style */}
            <div className="absolute top-6 -right-6 w-full h-full border-4 border-gray-200 z-0"></div>
            <div className="absolute -bottom-4 -left-4 bg-red-600 text-white p-6 z-30 shadow-xl hidden lg:block">
              <p className="font-primary italic text-3xl leading-tight">
                "A room without books is like a body without a soul."
              </p>
              <p className="text-xs uppercase font-bold tracking-widest mt-4">— Cicero</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
