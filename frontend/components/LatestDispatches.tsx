'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function LatestDispatches() {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden" id="blog-preview">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h3 className="text-3xl font-light mb-12" data-animation-on-scroll="">
          Latest <span className="font-primary italic">Dispatches</span>
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
          <Link
            href="/blog/post-1"
            className="group relative aspect-3/4 overflow-hidden bg-gray-900"
            data-animation-on-scroll=""
          >
            <Image
              src="https://images.pexels.com/photos/13249024/pexels-photo-13249024.jpeg?w=600&h=800&fit=crop"
              alt="The Unspoken Architectures of 21st Century Fiction"
              width={600}
              height={800}
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 z-20">
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-white/90 px-2 py-1 mb-3 inline-block">
                Literature
              </span>
              <h4 className="text-white font-bold text-lg leading-tight">
                The Unspoken Architectures of 21st Century Fiction
              </h4>
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
          </Link>

          <Link
            href="/blog/post-2"
            className="group relative aspect-3/4 overflow-hidden bg-gray-900"
            data-animation-on-scroll=""
          >
            <Image
              src="https://images.pexels.com/photos/29554056/pexels-photo-29554056.jpeg?w=600&h=800&fit=crop"
              alt="Melancholy in the Age of Constant Connectivity"
              width={600}
              height={800}
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 z-20">
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-white/90 px-2 py-1 mb-3 inline-block">
                Culture
              </span>
              <h4 className="text-white font-bold text-lg leading-tight">
                Melancholy in the Age of Constant Connectivity
              </h4>
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
          </Link>

          <Link
            href="/blog/post-3"
            className="group relative aspect-3/4 overflow-hidden bg-gray-900"
            data-animation-on-scroll=""
          >
            <Image
              src="https://images.pexels.com/photos/7319483/pexels-photo-7319483.jpeg?w=600&h=800&fit=crop"
              alt="The Death Table: A Report on Modern Newsrooms"
              width={600}
              height={800}
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 z-20">
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-white/90 px-2 py-1 mb-3 inline-block">
                Journalism
              </span>
              <h4 className="text-white font-bold text-lg leading-tight">
                The Death Table: A Report on Modern Newsrooms
              </h4>
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
          </Link>

          {/* Article 4 */}
          <Link
            href="/blog/post-4"
            className="group relative aspect-3/4 overflow-hidden bg-gray-900"
            data-animation-on-scroll=""
          >
            <Image
              src="https://images.pexels.com/photos/7335377/pexels-photo-7335377.jpeg?w=600&h=800&fit=crop"
              alt="Why We Keep Returning to the Physical Page"
              width={600}
              height={800}
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 z-20">
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-white/90 px-2 py-1 mb-3 inline-block">
                Essays
              </span>
              <h4 className="text-white font-bold text-lg leading-tight">
                Why We Keep Returning to the Physical Page
              </h4>
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}
