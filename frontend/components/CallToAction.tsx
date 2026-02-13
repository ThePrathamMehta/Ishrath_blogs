import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-20 bg-red-600" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center" data-animation-on-scroll="">
        <h3 className="text-4xl md:text-6xl font-extrabold text-white mb-8 font-secondary">
          Connect with the <span className="font-primary italic">Well</span>
        </h3>
        <p className="text-red-100 text-xl mb-12 max-w-2xl mx-auto">
          Have a tip, a book recommendation, or a pitch for an essay? We're always listening.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-white text-red-600 font-bold uppercase tracking-widest py-4 px-10 text-sm hover:bg-gray-900 hover:text-white transition-all"
          >
            Send a Message
          </Link>
          <Link
            href="#hero"
            className="border-2 border-white text-white font-bold uppercase tracking-widest py-4 px-10 text-sm hover:bg-white hover:text-red-600 transition-all"
          >
            Join the Dispatch
          </Link>
        </div>
      </div>
    </section>
  );
}
