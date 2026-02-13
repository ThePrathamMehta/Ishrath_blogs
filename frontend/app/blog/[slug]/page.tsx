'use client';

import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect } from 'react';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Use React.use() to unwrap the Promise in a Client Component
  const { slug } = use(params);

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

  // This would typically come from a CMS or database
  const article = {
    title: 'The Unspoken Architectures of 21st Century Fiction',
    category: 'Literature',
    date: 'October 24, 2024',
    author: 'The Inkwell Editorial Team',
    readTime: '12 min read',
    image:
      'https://images.pexels.com/photos/13249024/pexels-photo-13249024.jpeg?w=1200&h=800&fit=crop',
    excerpt:
      'A deep exploration of how contemporary fiction is reshaping narrative structures and challenging traditional storytelling conventions.',
  };

  return (
    <main>
      {/* JSON-LD Structured Data for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            image: article.image,
            datePublished: '2024-10-24T00:00:00Z',
            dateModified: '2024-10-24T00:00:00Z',
            author: {
              '@type': 'Organization',
              name: article.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'The Inkwell',
              logo: {
                '@type': 'ImageObject',
                url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://theinkwell.com'}/logo.png`,
              },
            },
            description: article.excerpt,
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: process.env.NEXT_PUBLIC_SITE_URL || 'https://theinkwell.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Journal',
                item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://theinkwell.com'}/blog`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: article.title,
                item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://theinkwell.com'}/blog/${slug}`,
              },
            ],
          }),
        }}
      />

      <article className="bg-white">
        {/* Breadcrumb Navigation */}
        <nav className="max-w-4xl mx-auto px-6 pt-8" data-animation-on-scroll="">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-red-600 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-red-600 transition-colors">
                Journal
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-bold">{article.category}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-6 py-12" data-animation-on-scroll="">
          <div className="mb-6">
            <span className="inline-block px-4 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-widest mb-4">
              {article.category}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight font-secondary leading-tight">
            {article.title}
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500 border-t border-b border-gray-100 py-4">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="font-bold">{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <time dateTime="2024-10-24">{article.date}</time>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{article.readTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto px-6 mb-12" data-animation-on-scroll="">
          <Image
            src={article.image}
            alt={article.title}
            width={1200}
            height={800}
            className="w-full h-auto rounded-sm shadow-2xl"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto px-6 pb-20" data-animation-on-scroll="">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed text-gray-700 font-secondary mb-8 first-letter:text-7xl first-letter:font-bold first-letter:text-red-600 first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:font-primary">
              In the landscape of contemporary fiction, something remarkable is happening beneath
              the surface. While critics debate the death of the novel and readers scroll through
              endless digital content, a quiet revolution in narrative architecture is reshaping how
              stories are told.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 font-secondary mb-6">
              The traditional three-act structure, once the bedrock of storytelling, is being
              deconstructed and reimagined by a new generation of writers who refuse to be bound by
              convention. These authors are building narratives that mirror the fragmented,
              non-linear nature of modern consciousness itself.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 font-secondary">
              The Collapse of Linear Time
            </h2>

            <p className="text-lg leading-relaxed text-gray-700 font-secondary mb-6">
              Consider the work of contemporary novelists like Jennifer Egan, whose "A Visit from
              the Goon Squad" weaves through time with the fluidity of memory itself. Or Ali Smith's
              seasonal quartet, which blends past and present in a way that feels both disorienting
              and deeply true to how we actually experience life.
            </p>

            <blockquote className="border-l-4 border-red-600 pl-6 my-8 italic text-2xl text-gray-800 font-primary">
              "The architecture of a story is not just how it's built—it's how it breathes, how it
              allows the reader to inhabit its spaces."
            </blockquote>

            <p className="text-lg leading-relaxed text-gray-700 font-secondary mb-6">
              This shift isn't merely stylistic experimentation. It represents a fundamental
              rethinking of what narrative can do. In an age of information overload and fractured
              attention, these new structures offer a way to capture the texture of contemporary
              experience.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 font-secondary">
              Multiple Perspectives, Multiple Truths
            </h2>

            <p className="text-lg leading-relaxed text-gray-700 font-secondary mb-6">
              The rise of multi-perspective narratives reflects our growing understanding that truth
              is rarely singular. Authors like Colson Whitehead and Yaa Gyasi construct stories that
              shift between viewpoints, challenging readers to hold multiple, sometimes
              contradictory truths simultaneously.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 font-secondary mb-6">
              This approach does more than create complexity—it builds empathy. By forcing us to see
              through different eyes, these narratives train us in the kind of perspective- taking
              that feels increasingly essential in our polarized world.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 font-secondary">
              The Future of Form
            </h2>

            <p className="text-lg leading-relaxed text-gray-700 font-secondary mb-6">
              As we look ahead, the question isn't whether traditional narrative structures will
              survive—they will, because they serve fundamental human needs. The question is how new
              forms will continue to emerge, shaped by the technologies and anxieties of our time.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 font-secondary mb-6">
              What's certain is that the architecture of 21st-century fiction will continue to
              evolve, reflecting and shaping how we understand ourselves and our world. And in that
              evolution lies the enduring power of the novel: its ability to adapt, to surprise, and
              to reveal truths we didn't know we needed to hear.
            </p>
          </div>

          {/* Article Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-400">
                  Share:
                </span>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-red-600 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-red-600 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-red-600 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
              <Link
                href="/blog"
                className="text-sm font-bold uppercase tracking-widest text-red-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Journal
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 font-secondary">
              Related <span className="font-primary italic">Reading</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Link
                  key={i}
                  href={`/blog/related-post-${i}`}
                  className="group"
                  data-animation-on-scroll=""
                >
                  <div className="aspect-[16/9] overflow-hidden mb-4 bg-gray-200 rounded-sm">
                    <Image
                      src={`https://images.pexels.com/photos/${29554056 + i}/pexels-photo-${29554056 + i}.jpeg?w=600&fit=crop`}
                      alt={`Related Article ${i}`}
                      width={600}
                      height={338}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">
                    Culture
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-red-600 transition-colors">
                    The Evolution of Modern Storytelling
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
