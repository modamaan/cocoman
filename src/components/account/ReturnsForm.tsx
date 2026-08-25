'use client';

import { useState } from 'react';

export function ReturnsForm({ customer }: { customer: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const orders = customer.orders?.edges?.map((e: any) => e.node) || [];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    formData.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '');
    
    // Add customer email hidden field for context
    formData.append('Customer Email', customer.email);
    formData.append('Customer Name', `${customer.firstName} ${customer.lastName}`);

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

  if (isSuccess) {
    return (
      <div className="bg-white p-12 text-center border border-jet-black/10">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-6">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="font-serif text-2xl font-bold uppercase tracking-tight mb-4">Request Submitted</h3>
        <p className="text-sm text-jet-black/70 mb-8">
          We have received your return/exchange request. Our team will manually review the details and get back to you via email shortly.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="bg-jet-black text-soft-ivory py-3 px-8 text-sm font-semibold uppercase tracking-wider hover:bg-jet-black/90 transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-serif font-bold uppercase tracking-tight mb-6">Return / Exchange Request</h2>
      
      <div className="bg-white p-6 md:p-8 border border-jet-black/10">
        <p className="text-sm text-jet-black/70 mb-8">
          Please fill out the form below to request a return or exchange. Include your order number and a brief reason. Our admin team will contact you directly.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
          
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-wider">Select Order</label>
            <select
              name="Order Number"
              required
              defaultValue=""
              className="border border-jet-black/20 p-3 w-full bg-transparent focus:outline-none focus:border-jet-black"
            >
              <option value="" disabled>Select an order...</option>
              {orders.map((order: any) => (
                <option key={order.id} value={order.orderNumber}>
                  #{order.orderNumber} - {new Date(order.processedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </option>
              ))}
              <option value="Other">Other / Cannot find order</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-wider">Request Type</label>
            <select
              name="Request Type"
              required
              defaultValue=""
              className="border border-jet-black/20 p-3 w-full bg-transparent focus:outline-none focus:border-jet-black"
            >
              <option value="" disabled>Select type...</option>
              <option value="Return for Refund">Return for Refund</option>
              <option value="Exchange for Size/Color">Exchange for Size/Color</option>
              <option value="Damaged/Defective Item">Damaged/Defective Item</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-wider">Reason / Details</label>
            <textarea
              name="Details"
              required
              rows={4}
              placeholder="Please provide details about which item you want to return/exchange and why..."
              className="border border-jet-black/20 p-3 w-full bg-transparent focus:outline-none focus:border-jet-black resize-y"
            ></textarea>
          </div>

          {errorMsg && (
            <p className="text-red-500 text-xs font-semibold">{errorMsg}</p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-jet-black text-soft-ivory py-4 px-8 text-sm font-semibold uppercase tracking-wider hover:bg-jet-black/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
