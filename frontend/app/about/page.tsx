'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export default function AboutPage() {
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
            '@type': 'AboutPage',
            name: 'About The Inkwell',
            description:
              "Learn about The Inkwell's mission to explore literature, culture, and journalism",
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://theinkwell.com'}/about`,
          }),
        }}
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div data-animation-on-scroll="">
            <span className="text-red-600 font-bold uppercase tracking-widest text-xs mb-4 block">
              The Mission
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-12 tracking-tight font-secondary">
              Why <span className="font-primary italic">The Inkwell</span> Exists
            </h1>
          </div>

          <div
            className="prose prose-lg text-gray-700 font-secondary leading-relaxed space-y-8"
            data-animation-on-scroll=""
          >
            <p className="text-2xl font-light leading-snug">
              In a world of hyper-specialization, we chose the path of the generalist. The Inkwell
              is a digital sanctuary for those whose curiosities refuse to be neatly categorized.
            </p>

            <Image
              src="https://images.pexels.com/photos/6913349/pexels-photo-6913349.jpeg?w=1200&h=600&fit=crop"
              alt="Workspace"
              width={1200}
              height={600}
              className="w-full h-96 object-cover rounded-sm my-12 grayscale shadow-xl"
            />

            <h2 className="text-3xl font-bold text-gray-900 mt-16 font-secondary uppercase tracking-tight">
              The Three Pillars
            </h2>

            <div className="grid md:grid-cols-1 gap-12 mt-8">
              <div>
                <h3 className="text-xl font-bold text-red-600 mb-2 uppercase tracking-wide">
                  01. Literature
                </h3>
                <p>
                  Books are not just objects; they are frameworks for understanding. We explore how
                  narrative shapes our reality, from the classics to the most daring contemporary
                  experiments.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-600 mb-2 uppercase tracking-wide">
                  02. Contemporary Culture
                </h3>
                <p>
                  We analyze the shifts in human behavior, the mechanics of digital trends, and the
                  underlying aesthetics that define our era. No topic is too small for a big idea.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-600 mb-2 uppercase tracking-wide">
                  03. Journalism
                </h3>
                <p>
                  Fact-based storytelling remains our north star. We apply the rigor of
                  investigative reporting to the nuances of life, culture, and art.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
