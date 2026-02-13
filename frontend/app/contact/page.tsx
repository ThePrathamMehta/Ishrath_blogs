'use client';

import { useEffect } from 'react';

export default function ContactPage() {
  
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact The Inkwell',
            description:
              'Get in touch with The Inkwell for collaborations, press inquiries, or to share your thoughts',
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://theinkwell.com'}/contact`,
          }),
        }}
      />

      <section className="py-24 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16">
            <div data-animation-on-scroll="">
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 font-secondary leading-none">
                Contact the <span className="font-primary italic text-red-600">Editors.</span>
              </h1>
              <p className="text-gray-600 text-lg mb-12 max-w-md">
                Reach out for collaborations, press inquiries, or simply to share a thought. We read
                every message.
              </p>

              <div className="space-y-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-red-600 block mb-2">
                    Email
                  </span>
                  <p className="text-xl font-secondary">correspondence@theinkwell.com</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-red-600 block mb-2">
                    Location
                  </span>
                  <p className="text-xl font-secondary">Remote / London / New York</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-red-600 block mb-2">
                    Social
                  </span>
                  <div className="flex gap-4 mt-2">
                    <a
                      href="#"
                      className="text-gray-900 hover:text-red-600 transition-colors uppercase font-bold text-sm tracking-tighter"
                    >
                      Instagram
                    </a>
                    <a
                      href="#"
                      className="text-gray-900 hover:text-red-600 transition-colors uppercase font-bold text-sm tracking-tighter"
                    >
                      Twitter
                    </a>
                    <a
                      href="#"
                      className="text-gray-900 hover:text-red-600 transition-colors uppercase font-bold text-sm tracking-tighter"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-gray-50 p-8 md:p-12 border border-gray-100 shadow-xl"
              data-animation-on-scroll=""
            >
              <form className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b-2 border-gray-200 py-3 focus:outline-none focus:border-red-600 transition-colors font-secondary text-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b-2 border-gray-200 py-3 focus:outline-none focus:border-red-600 transition-colors font-secondary text-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Subject
                  </label>
                  <select className="w-full bg-transparent border-b-2 border-gray-200 py-3 focus:outline-none focus:border-red-600 transition-colors font-secondary text-lg appearance-none">
                    <option>General Inquiry</option>
                    <option>Pitch an Essay</option>
                    <option>Book Recommendation</option>
                    <option>Collaboration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-transparent border-b-2 border-gray-200 py-3 focus:outline-none focus:border-red-600 transition-colors font-secondary text-lg resize-none"
                  ></textarea>
                </div>
                <button className="w-full bg-red-600 text-white font-bold uppercase tracking-widest py-5 text-sm hover:bg-gray-900 transition-all mt-4">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
