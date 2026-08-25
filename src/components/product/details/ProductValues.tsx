import Image from "next/image";

export function ProductValues() {
  return (
    <section className="w-full bg-soft-ivory py-20 md:py-32 px-6 border-t border-jet-black/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center font-sans text-xs font-bold tracking-[0.3em] uppercase text-jet-black/60 mb-16">
          This Product Is Featured In
        </h2>
        
        <div className="flex flex-col md:flex-row gap-16 md:gap-8 justify-between items-start text-center">
          
          {/* Value 1 */}
          <div className="flex flex-col items-center flex-1 max-w-xs mx-auto">
            <div className="w-56 h-56 md:w-64 md:h-64 relative rounded-full overflow-hidden mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:scale-105 transition-transform duration-500">
              <Image 
                src="/images/minimal_essentials_1787289539125.jpg" 
                alt="Minimal Essentials"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 224px, 256px"
              />
            </div>
            <h3 className="font-serif text-xl md:text-2xl text-jet-black mb-4 uppercase tracking-wide">
              Minimal Essentials
            </h3>
            <p className="font-sans text-sm md:text-base text-jet-black/70 leading-relaxed">
              Timeless pieces made for daily wear. High quality fabrics and clean design.
            </p>
          </div>

          {/* Value 2 */}
          <div className="flex flex-col items-center flex-1 max-w-xs mx-auto">
            <div className="w-56 h-56 md:w-64 md:h-64 relative rounded-full overflow-hidden mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:scale-105 transition-transform duration-500">
              <Image 
                src="/images/quality_crafted_1787289552418.jpg" 
                alt="Quality Crafted"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 224px, 256px"
              />
            </div>
            <h3 className="font-serif text-xl md:text-2xl text-jet-black mb-4 uppercase tracking-wide">
              Quality Crafted
            </h3>
            <p className="font-sans text-sm md:text-base text-jet-black/70 leading-relaxed">
              We focus on details, durability, and comfort to give you the best everyday experience.
            </p>
          </div>

          {/* Value 3 */}
          <div className="flex flex-col items-center flex-1 max-w-xs mx-auto">
            <div className="w-56 h-56 md:w-64 md:h-64 relative rounded-full overflow-hidden mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:scale-105 transition-transform duration-500">
              <Image 
                src="/images/designed_to_last_1787289564844.jpg" 
                alt="Designed to Last"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 224px, 256px"
              />
            </div>
            <h3 className="font-serif text-xl md:text-2xl text-jet-black mb-4 uppercase tracking-wide">
              Designed to Last
            </h3>
            <p className="font-sans text-sm md:text-base text-jet-black/70 leading-relaxed">
              Built to last. Minimal today, classic tomorrow. Always relevant.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
