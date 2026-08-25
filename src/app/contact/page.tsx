'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    formData.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMsg('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full bg-soft-ivory overflow-hidden min-h-screen pb-24">

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 md:pt-24">

        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div>
            <div className="inline-block border border-jet-black/10 bg-pure-white px-4 py-1.5 mb-6">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-jet-black">Get In Touch</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl text-jet-black leading-none tracking-tight">
              Contact Us
            </h1>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-jet-black/70 text-sm leading-relaxed font-medium">
              We&apos;re here to help and answer any question you might have. We look forward to hearing from you.
            </p>
          </div>
        </div>

        {/* Middle Section: Form and Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Left Card: Form */}
          <div className="bg-pure-white p-8 md:p-12 shadow-sm border border-jet-black/5">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 py-20">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#B8966E" strokeWidth="1.5" className="mb-6">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="font-serif text-3xl text-jet-black mb-4">Thank You.</h3>
                <p className="font-sans text-sm text-jet-black/70 max-w-sm">
                  Your message has been received. Our dedicated team will get back to you within 24-48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full animate-in fade-in">
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-sans text-[11px] font-bold uppercase text-jet-black">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="bg-soft-ivory/50 border border-jet-black/10 px-4 py-3 focus:outline-none focus:border-jet-black/30 transition-colors font-sans text-sm text-jet-black"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-sans text-[11px] font-bold uppercase text-jet-black">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="bg-soft-ivory/50 border border-jet-black/10 px-4 py-3 focus:outline-none focus:border-jet-black/30 transition-colors font-sans text-sm text-jet-black"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="font-sans text-[11px] font-bold uppercase text-jet-black">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="bg-soft-ivory/50 border border-jet-black/10 px-4 py-3 focus:outline-none focus:border-jet-black/30 transition-colors font-sans text-sm text-jet-black"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="font-sans text-[11px] font-bold uppercase text-jet-black">Subject</label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        required
                        defaultValue=""
                        className="bg-soft-ivory/50 border border-jet-black/10 px-4 py-3 focus:outline-none focus:border-jet-black/30 transition-colors font-sans text-sm text-jet-black/70 w-full appearance-none rounded-none"
                      >
                        <option value="" disabled>Select a subject...</option>
                        <option value="Order Inquiry">Order Inquiry</option>
                        <option value="Product Question">Product Question</option>
                        <option value="Returns/Exchanges">Returns & Exchanges</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-jet-black/50">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className="font-sans text-[11px] font-bold uppercase text-jet-black">Company (Optional)</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="bg-soft-ivory/50 border border-jet-black/10 px-4 py-3 focus:outline-none focus:border-jet-black/30 transition-colors font-sans text-sm text-jet-black"
                      placeholder="Your company name"
                    />
                  </div>

                  {/* Help Type */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="helpType" className="font-sans text-[11px] font-bold uppercase text-jet-black">How can we help you?</label>
                    <div className="relative">
                      <select
                        id="helpType"
                        name="helpType"
                        defaultValue="General Inquiry"
                        className="bg-soft-ivory/50 border border-jet-black/10 px-4 py-3 focus:outline-none focus:border-jet-black/30 transition-colors font-sans text-sm text-jet-black/70 w-full appearance-none rounded-none"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Support">Support</option>
                        <option value="Wholesale">Wholesale</option>
                        <option value="Press">Press</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-jet-black/50">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-sans text-[11px] font-bold uppercase text-jet-black">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="bg-soft-ivory/50 border border-jet-black/10 px-4 py-3 focus:outline-none focus:border-jet-black/30 transition-colors font-sans text-sm text-jet-black resize-none"
                    placeholder="Tell us more about your message..."
                  ></textarea>
                </div>

                {errorMsg && (
                  <p className="text-red-500 font-sans text-xs">{errorMsg}</p>
                )}

                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-jet-black text-pure-white px-8 py-4 font-sans text-xs tracking-widest uppercase font-bold hover:bg-charcoal transition-colors inline-flex items-center gap-4 disabled:opacity-50"
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                    {!isSubmitting && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Card: Editorial Image */}
          <div className="relative w-full h-[500px] lg:h-auto overflow-hidden bg-jet-black border border-jet-black/5">
            <Image
              src="/images/contact/contact_hero.jpg"
              alt="Cocoman Studio"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute top-6 right-6 border border-pure-white/30 bg-jet-black/20 backdrop-blur-md px-4 py-1.5">
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-pure-white">Our Store</span>
            </div>
            {/* Minimal logo overlay on image to match reference styling */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <h2 className="font-serif text-5xl tracking-[0.3em] uppercase text-jet-black drop-shadow-lg mix-blend-overlay">COCOMAN</h2>
            </div>
          </div>

        </div>

        {/* Info Banner Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-jet-black/5 border border-jet-black/5 mb-6">
          <div className="bg-pure-white flex flex-col items-center justify-center p-12 text-center">
            <div className="w-12 h-12 rounded-full border border-jet-black/10 flex items-center justify-center mb-6 text-jet-black/70">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
            </div>
            <h4 className="font-sans text-sm font-bold text-jet-black mb-3">Call & WhatsApp</h4>
            <p className="font-sans text-sm text-jet-black/70 leading-relaxed">+91 98765 43210<br />+91 82818 76543</p>
          </div>
          <div className="bg-pure-white flex flex-col items-center justify-center p-12 text-center">
            <div className="w-12 h-12 rounded-full border border-jet-black/10 flex items-center justify-center mb-6 text-jet-black/70">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
            </div>
            <h4 className="font-sans text-sm font-bold text-jet-black mb-3">Working Hours</h4>
            <p className="font-sans text-sm text-jet-black/70 leading-relaxed">Monday - Saturday: 10AM - 7PM<br />Sunday: Closed</p>
          </div>
          <div className="bg-pure-white flex flex-col items-center justify-center p-12 text-center">
            <div className="w-12 h-12 rounded-full border border-jet-black/10 flex items-center justify-center mb-6 text-jet-black/70">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>
            </div>
            <h4 className="font-sans text-sm font-bold text-jet-black mb-3">Email Us</h4>
            <p className="font-sans text-sm text-jet-black/70 leading-relaxed">hello@cocoman.com<br />support@cocoman.com</p>
          </div>
        </div>

        {/* Let's Connect Footer Section */}
        <div className="bg-pure-white border border-jet-black/5 p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center shadow-sm">

          <div className="flex flex-col items-start max-w-md">
            <div className="inline-block border border-jet-black/10 bg-soft-ivory px-4 py-1.5 mb-8">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-jet-black">Let&apos;s Connect</span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl text-jet-black leading-[1.1] mb-6">
              Let&apos;s build something <br />
              <span className="text-[#B8966E] italic">exceptional together.</span>
            </h2>

            <p className="font-sans text-sm text-jet-black/70 leading-relaxed mb-10">
              Whether you have a question, want to collaborate, or just want to say hello, we&apos;d love to hear from you. Experience the Cocoman standard.
            </p>

            <Link href="/" className="bg-jet-black text-pure-white px-8 py-4 font-sans text-xs tracking-widest uppercase font-bold hover:bg-charcoal transition-colors inline-flex items-center gap-4 w-fit">
              EXPLORE OUR PRODUCTS
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 h-[300px] md:h-[400px] lg:h-[450px]">
            <div className="relative w-full h-full overflow-hidden bg-jet-black">
              <Image
                src="/images/contact/connect_1.jpg"
                alt="Cocoman Collection"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-full overflow-hidden bg-jet-black mt-8 md:mt-12">
              <Image
                src="/images/contact/connect_2.jpg"
                alt="Cocoman Store"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
