import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us | Cocoman",
  description: "Learn about Cocoman's story, philosophy, and essence.",
};

export default function AboutPage() {
  return (
    <main className="w-full bg-soft-ivory overflow-hidden">

      {/* SECTION 1: HERO SPLIT */}
      <section className="relative flex flex-col md:flex-row w-full min-h-[90vh] overflow-hidden bg-[#0B0B0B] md:bg-[linear-gradient(to_right,#0B0B0B_50%,#F8F6F2_50%)]">

        {/* Left Side: Dark Background with Image */}
        <div className="w-full md:w-1/2 text-pure-white relative flex items-center justify-center pt-24 md:pt-0 pb-12 md:pb-0 px-6 md:px-12 z-10">
          {/* Vertical Branding */}
          <div className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 hidden lg:flex flex-col items-center gap-24 tracking-[0.3em] text-xs font-bold font-sans opacity-70">
            <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>01 / 05</span>
            <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>ABOUT US</span>
          </div>

          <div className="relative w-full max-w-sm aspect-[3/4] z-10">
            <Image
              src="/images/about/about_hero_1787291318802.jpg"
              alt="Cocoman Premium Wear"
              fill
              sizes="(max-width: 768px) 100vw, 384px"
              className="object-cover object-top rounded-sm shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Right Side: Light Background with Text */}
        <div className="w-full md:w-1/2 bg-soft-ivory md:bg-transparent flex flex-col justify-center px-8 md:px-24 py-20 md:py-0 z-10">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-jet-black mb-8 leading-tight">
            WE DON&apos;T FOLLOW <br className="hidden md:block" />
            TRENDS. WE SET <br className="hidden md:block" />
            OUR STANDARD.
          </h2>

          <div className="w-12 h-1 bg-jet-black/20 mb-8" />

          <p className="font-sans text-jet-black/80 text-base leading-relaxed mb-12 max-w-md">
            COCOMAN is a modern menswear brand built on simplicity, quality and purpose.
            We craft timeless pieces for the modern man who values confidence, comfort and individuality.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE STORY */}
      <section className="relative w-full bg-soft-ivory py-24 lg:py-40 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">

          {/* Left Side Text Block */}
          <div className="w-full lg:w-1/2 flex relative md:pl-16">
            {/* Vertical Text & Line */}
            <div className="absolute top-2 left-0 hidden md:flex flex-col items-center gap-6">
              <div className="w-px h-12 bg-[#B8966E]" />
              <span className="text-[10px] font-bold tracking-[0.3em] font-sans text-jet-black" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>OUR STORY</span>
            </div>

            <div className="flex flex-col max-w-lg">
              <h2 className="font-serif text-3xl md:text-4xl text-jet-black mb-8 font-bold">ABOUT COCOMAN</h2>
              <p className="font-sans text-jet-black/80 text-sm leading-relaxed mb-6">
                COCOMAN was founded with a simple belief — that great style begins with intention. Every piece we design is created with attention to detail, premium fabrics and a focus on versatility.
              </p>
              <p className="font-sans text-jet-black/80 text-sm leading-relaxed mb-16">
                From everyday essentials to statement pieces, our collections are made to elevate your wardrobe and express who you are.
              </p>

              {/* Icons Grid */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { title: "PREMIUM\nQUALITY", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
                  { title: "TIMELESS\nDESIGN", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                  { title: "MODERN\nFIT", icon: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" },
                  { title: "MADE FOR\nEVERYDAY", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
                ].map((item) => (
                  <div key={item.title} className="flex flex-col items-center text-center gap-4">
                    <div className="h-10 flex items-center justify-center text-[#B8966E]">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d={item.icon} /></svg>
                    </div>
                    <span className="text-[9px] md:text-[10px] font-bold font-sans tracking-[0.1em] text-jet-black leading-tight uppercase whitespace-pre-line">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Image & Floating Elements */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end pr-0 lg:pr-12 mt-12 lg:mt-0">

            {/* Wrapper to bind floating elements tightly to the image */}
            <div className="relative w-full max-w-[450px] lg:max-w-[500px]">

              {/* Dotted Grid Background */}
              <div className="absolute -bottom-8 -right-4 lg:-right-4 w-3/4 h-3/4 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #B8966E 1px, transparent 0)', backgroundSize: '32px 32px' }} />

              {/* Floating Social Block */}
              <div className="absolute top-4 md:top-12 -left-4 md:-left-12 lg:-left-20 z-30 flex shadow-2xl scale-[0.7] md:scale-100 origin-top-left">
                <div className="bg-jet-black text-pure-white px-6 py-4 flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#B8966E]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                  <span className="font-sans text-[11px] font-bold tracking-widest uppercase">FOLLOW US</span>
                </div>
                <div className="bg-[#B8966E] text-pure-white flex flex-col items-center justify-center gap-4 px-3 py-4">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z" /></svg>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative w-full aspect-[3/4] z-20 shadow-2xl">
                <Image
                  src="/images/about/about_story_1787291330246.jpg"
                  alt="About Cocoman Story"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-center"
                />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: PHILOSOPHY */}
      <section className="w-full bg-soft-ivory pb-24 md:pb-48 px-6 md:px-12 relative overflow-hidden">
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">

          {/* Left Side Image */}
          <div className="w-full lg:w-1/2 h-[500px] md:h-[700px] relative">
            <Image
              src="/images/about/about_philosophy_1787291342783.jpg"
              alt="Cocoman Philosophy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover shadow-xl"
            />
          </div>

          {/* Right Side Text */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="relative mb-12">
              <span className="text-6xl font-serif text-jet-black/20 absolute -top-8 -left-8">&ldquo;</span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-jet-black leading-tight uppercase relative z-10">
                STYLE IS A WAY TO SAY WHO YOU ARE WITHOUT SAYING A WORD.
              </h2>
            </div>

            <h3 className="font-sans font-bold tracking-[0.2em] text-sm uppercase text-jet-black mb-6">OUR PHILOSOPHY</h3>
            <p className="font-sans text-jet-black/70 text-base leading-relaxed mb-16 max-w-lg">
              We believe in minimal design, functional details and lasting quality. Our goal is to build clothing that not only looks good, but feels right — empowering you to move through life with confidence season after season.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-12 md:gap-24">
              {[
                { number: "500+", label: "DESIGNS" },
                { number: "50K+", label: "HAPPY CUSTOMERS" },
                { number: "15+", label: "COUNTRIES" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2">
                  <span className="font-serif text-3xl md:text-4xl text-[#B8966E]">{stat.number}</span>
                  <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-jet-black">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: OUR ESSENCE (Dark Mode) */}
      <section className="w-full bg-jet-black text-pure-white py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">

        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24 relative z-10">

          {/* Left Side Text */}
          <div className="w-full lg:w-5/12 flex flex-col relative">

            {/* Vertical Text */}
            <div className="absolute top-0 -left-12 hidden lg:block">
              <span className="text-xs font-bold tracking-[0.3em] font-sans text-pure-white/20" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>WHAT WE DO</span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl text-pure-white mb-16">OUR ESSENCE</h2>

            <div className="flex flex-col gap-12">
              {[
                { title: "CRAFTED WITH CARE", desc: "Every stitch is a promise of quality and durability.", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
                { title: "DESIGNED TO INSPIRE", desc: "Clean aesthetics that inspire confidence and individuality.", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
                { title: "BUILT TO LAST", desc: "Timeless pieces made to be worn, loved and lived in.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-6">
                  <div className="mt-1 text-[#B8966E]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} /></svg>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-sans font-bold tracking-[0.1em] text-sm uppercase text-[#B8966E] mb-2">{item.title}</h3>
                    <p className="font-sans text-sm text-pure-white/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination / Nav placeholder */}
            <div className="mt-20 flex items-center gap-6 font-sans text-xs font-bold tracking-widest text-pure-white/40">
              <span className="text-pure-white">01</span>
              <div className="w-12 h-px bg-pure-white/20" />
              <span>05</span>
              <span className="ml-auto hover:text-pure-white transition-colors cursor-pointer">PREV / NEXT</span>
            </div>

          </div>

          {/* Right Side Video Thumbnail */}
          <div className="w-full lg:w-7/12 relative aspect-video group cursor-pointer">
            <Image
              src="/images/about/about_essence_1787291358805.jpg"
              alt="Cocoman Essence Video"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 shadow-2xl"
            />
          </div>

        </div>
      </section>

    </main>
  );
}
