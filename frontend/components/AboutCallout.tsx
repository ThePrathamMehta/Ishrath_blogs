'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AboutCallout() {
  return (
    <section className="py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative" data-animation-on-scroll="">
            <span className="absolute -top-12 -left-12 text-[10rem] font-primary italic text-gray-50 select-none">
              &amp;
            </span>
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-secondary relative z-10 leading-tight">
              A Journal of <span className="font-primary italic text-red-600">Eclectic</span>{' '}
              Interests.
            </h3>
            <p className="text-gray-600 mt-8 text-lg leading-relaxed">
              The Inkwell was born from a refusal to specialize. We believe that a deep
              understanding of literature informs our view of contemporary culture, and that
              rigorous journalism is the only way to document either.
            </p>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Founded in 2024, our mission is to provide a home for the "all over the place"
              thinkers who see the threads connecting a Russian novel, a social media trend, and a
              global news event.
            </p>
            <div className="mt-10">
              <Link
                href="/about"
                className="bg-gray-900 text-white font-bold uppercase tracking-widest py-4 px-8 text-sm hover:bg-red-600 transition-colors inline-block"
              >
                The Full Story
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4" data-animation-on-scroll="">
            <Image
              src="https://images.pexels.com/photos/2002217/pexels-photo-2002217.jpeg?w=400&fit=crop"
              alt="Books"
              width={400}
              height={400}
              className="rounded-sm grayscale hover:grayscale-0 transition-all duration-500"
            />
            <Image
              src="https://images.pexels.com/photos/30068225/pexels-photo-30068225.jpeg?w=400&fit=crop"
              alt="Culture"
              width={400}
              height={400}
              className="rounded-sm grayscale hover:grayscale-0 transition-all duration-500 mt-8"
            />
            <Image
              src="https://images.pexels.com/photos/17280212/pexels-photo-17280212.jpeg?w=400&fit=crop"
              alt="Journalism"
              width={400}
              height={400}
              className="rounded-sm grayscale hover:grayscale-0 transition-all duration-500 -mt-8"
            />
            <Image
              src="https://images.pexels.com/photos/33455766/pexels-photo-33455766.jpeg?w=400&fit=crop"
              alt="Life"
              width={400}
              height={400}
              className="rounded-sm grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
