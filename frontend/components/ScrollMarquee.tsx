export default function ScrollMarquee() {
  return (
    <div className="bg-red-600 overflow-hidden py-4 -rotate-1 shadow-lg relative z-20 origin-left scale-105 border-y-4 border-red-700 my-8">
      <div className="flex items-center gap-12 whitespace-nowrap animate-marquee">
        <div className="flex items-center gap-12">
          <span className="text-white text-sm font-bold uppercase tracking-widest font-secondary">
            New Essays Daily
          </span>
          <span className="text-red-300">•</span>
          <span className="text-white text-sm font-bold uppercase tracking-widest font-secondary">
            Literary Criticism
          </span>
          <span className="text-red-300">•</span>
          <span className="text-white text-sm font-bold uppercase tracking-widest font-secondary">
            Cultural Commentary
          </span>
          <span className="text-red-300">•</span>
          <span className="text-white text-sm font-bold uppercase tracking-widest font-secondary">
            Gonzo Journalism
          </span>
          <span className="text-red-300">•</span>
          <span className="text-white text-sm font-bold uppercase tracking-widest font-secondary">
            The Human Perspective
          </span>
          <span className="text-red-300">•</span>
        </div>
        <div className="flex items-center gap-12">
          <span className="text-white text-sm font-bold uppercase tracking-widest font-secondary">
            New Essays Daily
          </span>
          <span className="text-red-300">•</span>
          <span className="text-white text-sm font-bold uppercase tracking-widest font-secondary">
            Literary Criticism
          </span>
          <span className="text-red-300">•</span>
          <span className="text-white text-sm font-bold uppercase tracking-widest font-secondary">
            Cultural Commentary
          </span>
          <span className="text-red-300">•</span>
          <span className="text-white text-sm font-bold uppercase tracking-widest font-secondary">
            Gonzo Journalism
          </span>
          <span className="text-red-300">•</span>
          <span className="text-white text-sm font-bold uppercase tracking-widest font-secondary">
            The Human Perspective
          </span>
          <span className="text-red-300">•</span>
        </div>
      </div>
    </div>
  );
}
