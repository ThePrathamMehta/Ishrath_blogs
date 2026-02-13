'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function BlogPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animation-on-scroll]').forEach((el) => {
      el.classList.add('animate-on-scroll-hidden');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'The Journal',
            description: 'Essays, articles, and dispatches on literature, culture, and journalism',
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://theinkwell.com'}/blog`,
          }),
        }}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16 border-b border-gray-100 pb-12" data-animation-on-scroll="">
            <h1 className="text-6xl font-extrabold text-gray-900 font-secondary mb-4">
              The Journal.
            </h1>
            <p className="text-gray-500 font-secondary text-xl">
              Cataloging the human experience one word at a time.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button className="px-6 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-widest">
                All
              </button>
              <button className="px-6 py-2 bg-gray-50 text-gray-900 hover:bg-gray-100 text-xs font-bold uppercase tracking-widest">
                Literature
              </button>
              <button className="px-6 py-2 bg-gray-50 text-gray-900 hover:bg-gray-100 text-xs font-bold uppercase tracking-widest">
                Culture
              </button>
              <button className="px-6 py-2 bg-gray-50 text-gray-900 hover:bg-gray-100 text-xs font-bold uppercase tracking-widest">
                Journalism
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
            {/* Article 1 */}
            <article className="group" data-animation-on-scroll="">
              <div className="aspect-[16/9] overflow-hidden mb-6 bg-gray-100">
                <Image
                  src="https://images.pexels.com/photos/19943722/pexels-photo-19943722.jpeg?w=1200&fit=crop"
                  alt="The Last Newsroom in a Dying City"
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-600">
                  Journalism
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
                  Oct 24, 2024
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 font-secondary mb-4 leading-tight group-hover:text-red-600 transition-colors">
                The Last Newsroom in a Dying City
              </h2>
              <p className="text-gray-600 font-secondary leading-relaxed mb-6">
                A deep dive into the reporters keeping community journalism alive in the Rust Belt.
                An investigation into memory, facts, and local identity.
              </p>
              <Link
                href="/blog/the-last-newsroom-in-a-dying-city"
                className="text-xs font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-1 hover:border-red-600 hover:text-red-600 transition-all"
              >
                Read Essay
              </Link>
            </article>

            {/* Article 2 */}
            <article className="group" data-animation-on-scroll="">
              <div className="aspect-[16/9] overflow-hidden mb-6 bg-gray-100">
                <Image
                  src="https://images.pexels.com/photos/29976379/pexels-photo-29976379.jpeg?w=1200&fit=crop"
                  alt="Why We Still Read the Russians in Times of Crisis"
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-600">
                  Literature
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
                  Oct 20, 2024
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 font-secondary mb-4 leading-tight group-hover:text-red-600 transition-colors">
                Why We Still Read the Russians in Times of Crisis
              </h2>
              <p className="text-gray-600 font-secondary leading-relaxed mb-6">
                Tolstoy, Dostoevsky, and the enduring relevance of the 'Great Soul' in the face of
                modern geo-political uncertainty.
              </p>
              <Link
                href="/blog/why-we-still-read-the-russians-in-times-of-crisis"
                className="text-xs font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-1 hover:border-red-600 hover:text-red-600 transition-all"
              >
                Read Essay
              </Link>
            </article>

            {/* Article 3 */}
            <article className="group" data-animation-on-scroll="">
              <div className="aspect-[16/9] overflow-hidden mb-6 bg-gray-100">
                <Image
                  src="https://images.pexels.com/photos/35753334/pexels-photo-35753334.jpeg?w=1200&fit=crop"
                  alt="The Aesthetics of Digital Minimalism"
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-600">
                  Culture
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
                  Oct 15, 2024
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 font-secondary mb-4 leading-tight group-hover:text-red-600 transition-colors">
                The Aesthetics of Digital Minimalism
              </h2>
              <p className="text-gray-600 font-secondary leading-relaxed mb-6">
                How our search for 'clean' digital spaces reflects a deeper desire for control in an
                chaotic physical world.
              </p>
              <Link
                href="/blog/the-aesthetics-of-digital-minimalism"
                className="text-xs font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-1 hover:border-red-600 hover:text-red-600 transition-all"
              >
                Read Essay
              </Link>
            </article>

            {/* Article 4 */}
            <article className="group" data-animation-on-scroll="">
              <div className="aspect-[16/9] overflow-hidden mb-6 bg-gray-100">
                <Image
                  src="https://images.pexels.com/photos/4865536/pexels-photo-4865536.jpeg?w=1200&fit=crop"
                  alt="On Avoiding the Echo Chamber"
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-600">
                  Essays
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
                  Oct 02, 2024
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 font-secondary mb-4 leading-tight group-hover:text-red-600 transition-colors">
                On Avoiding the Echo Chamber
              </h2>
              <p className="text-gray-600 font-secondary leading-relaxed mb-6">
                Practical philosophy for the modern reader: how to curate your information diet for
                maximum intellectual growth.
              </p>
              <Link
                href="/blog/on-avoiding-the-echo-chamber"
                className="text-xs font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-1 hover:border-red-600 hover:text-red-600 transition-all"
              >
                Read Essay
              </Link>
            </article>
          </div>

          {/* Pagination */}
          <div className="mt-24 flex justify-center items-center gap-4" data-animation-on-scroll="">
            <Link
              href="#"
              className="w-12 h-12 flex items-center justify-center border-2 border-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all"
            >
              1
            </Link>
            <Link
              href="#"
              className="w-12 h-12 flex items-center justify-center border-2 border-gray-100 font-bold hover:border-gray-900 transition-all"
            >
              2
            </Link>
            <Link
              href="#"
              className="w-12 h-12 flex items-center justify-center border-2 border-gray-100 font-bold hover:border-gray-900 transition-all"
            >
              3
            </Link>
            <span className="text-gray-300">...</span>
            <Link
              href="#"
              className="text-xs font-bold uppercase tracking-widest hover:text-red-600 transition-colors"
            >
              Next →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
