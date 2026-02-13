'use client';

import AboutCallout from '@/components/AboutCallout';
import CallToAction from '@/components/CallToAction';
import FeaturedFragments from '@/components/FeaturedFragments';
import Hero from '@/components/Hero';
import LatestDispatches from '@/components/LatestDispatches';
import ScrollMarquee from '@/components/ScrollMarquee';
import { useEffect } from 'react';

export default function Home() {
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
            '@type': 'WebSite',
            name: 'The Inkwell',
            description: 'A journal of literature, culture, and journalism',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://theinkwell.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://theinkwell.com'}/blog?q={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'The Inkwell',
            description: 'A journal of literature, culture, and journalism',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://theinkwell.com',
            logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://theinkwell.com'}/logo.png`,
            sameAs: [
              'https://twitter.com/theinkwell',
              'https://instagram.com/theinkwell',
              'https://linkedin.com/company/theinkwell',
            ],
          }),
        }}
      />

      <Hero />
      <ScrollMarquee />
      <FeaturedFragments />
      <LatestDispatches />
      <AboutCallout />
      <CallToAction />
    </main>
  );
}
