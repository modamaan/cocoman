import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy | COCOMAN',
  description: 'Shipping and Delivery Information for COCOMAN.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-soft-ivory text-jet-black min-h-screen pt-28 md:pt-32 pb-24 px-5 sm:px-8 md:px-16 font-sans w-full overflow-hidden">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-widest mb-10 md:mb-12 text-center break-words">
          Shipping Policy
        </h1>
        
        <div className="space-y-10 md:space-y-12 text-[14px] sm:text-sm md:text-[15px] leading-relaxed opacity-90">
          
          <section>
            <p className="mb-4">
              At <strong>COCOMAN</strong>, we are committed to delivering your orders in a timely, safe, and transparent manner. This Shipping Policy outlines order processing timelines, delivery estimates, shipping charges, and customer responsibilities.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">1. Order Processing Time</h2>
            <ul className="list-disc pl-5 md:pl-6 space-y-2">
              <li>Orders are processed within 1–2 business days from the date of order confirmation, excluding Sundays and public holidays.</li>
              <li>Delivery timelines commence after dispatch, not on the date of order placement.</li>
              <li>Customized, handcrafted, or made-to-order products may require additional processing time.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">2. Shipping Coverage</h2>
            
            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 className="font-bold mb-2">A. Domestic Shipping (within India)</h3>
                <ul className="list-disc pl-5 md:pl-6 space-y-1">
                  <li>We ship across India.</li>
                  <li>Delivery timelines depend on pin-code, location, and courier partner availability.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">B. International Shipping</h3>
                <ul className="list-disc pl-5 md:pl-6 space-y-1">
                  <li>We ship internationally, subject to destination feasibility.</li>
                  <li>International shipping charges are calculated based on order weight and destination and are borne by the customer.</li>
                  <li>Custom duties, import taxes, and local levies (if any) must be paid by the customer at the time of delivery as per the laws of the destination country.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">3. Estimated Delivery Timelines</h2>
            <p className="mb-3">Delivery timelines depend on the shipping address. Estimated delivery time is 2-12 working days.</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-2">
              <li>For metro and Tier-1 cities, delivery may take 2-7 working days, while for Tier-2, Tier-3 cities and rural areas it may take 4-12 working days.</li>
              <li>Delays of 2-3 working days may occur depending on the location.</li>
              <li>Products on pre-booking status will be dispatched only on the date mentioned on the website for that particular product.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">4. Shipping Charges (Within India)</h2>
            <ul className="list-disc pl-5 md:pl-6 space-y-2">
              <li><strong>Free Shipping</strong> on orders above ₹499.</li>
              <li>Orders below the free-shipping threshold may attract a flat shipping fee, which is non-refundable.</li>
              <li>Shipping offers may change during sales or promotional periods.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">5. Shipping Partners</h2>
            <p>
              We work with reputed logistics providers such as Blue Dart, Delhivery, DTDC, India Post, Blitz, and EKart to ensure your items arrive safely.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">6. Order Tracking</h2>
            <ul className="list-disc pl-5 md:pl-6 space-y-2">
              <li>Once your order is shipped, tracking details will be shared via SMS or email.</li>
              <li>Customers can track their shipment using the tracking link provided.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">7. Cash on Delivery (COD) Orders</h2>
            <ul className="list-disc pl-5 md:pl-6 space-y-2">
              <li>COD Orders are dispatched only after confirmation from the customer.</li>
              <li>If the customer does not respond to calls, messages, or emails within 2 days from the first confirmation attempt, the COD order will be cancelled.</li>
              <li>For prepaid orders, no confirmation attempt is required, and orders are dispatched as per standard timelines.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">8. Failed or Unsuccessful Deliveries</h2>
            <ul className="list-disc pl-5 md:pl-6 space-y-2">
              <li>If delivery fails due to customer-related reasons (unavailability, incorrect address, etc.), a second delivery attempt will be made upon customer confirmation.</li>
              <li>If a third delivery attempt is required, additional shipping charges shall be borne by the customer.</li>
              <li>Failure to pay such charges may result in order cancellation, and the company reserves the right to refuse future orders from the customer.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">9. Address Accuracy</h2>
            <ul className="list-disc pl-5 md:pl-6 space-y-2">
              <li>Customers are responsible for ensuring that the shipping address and contact details provided at checkout are accurate and complete.</li>
              <li>The company shall not be responsible for delivery failures caused due to incorrect or incomplete address details.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">10. Order Modification and Cancellation</h2>
            <ul className="list-disc pl-5 md:pl-6 space-y-2">
              <li>Any request for order modification or cancellation must be made before dispatch.</li>
              <li>Once an order has been dispatched, cancellation is not permitted, and no refund shall be issued.</li>
              <li>Please note that orders cannot be cancelled once they have been shipped.</li>
              <li>Customers requiring urgent delivery are advised to contact the support team prior to placing the order.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">11. Delays and Exceptional Circumstances</h2>
            <ul className="list-disc pl-5 md:pl-6 space-y-2">
              <li>Delivery timelines are indicative and may vary due to courier delays, weather conditions, festive seasons, or operational constraints.</li>
              <li>If an order is delayed beyond 2 weeks of the estimated delivery time, our team will contact the customer to confirm whether they wish to proceed with the order.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">12. Grievance Redressal Mechanism</h2>
            <p className="mb-4">
              We consider it our primary duty to provide fair treatment and timely support to our customers. You can reach our customer support team to address any of your queries or complaints at <a href="mailto:care@cocoman.store" className="underline hover:opacity-70 transition-opacity break-all">care@cocoman.store</a>.
            </p>
            <p className="mb-6">
              In case of any resolution that a customer is seeking in relation to a product or service which has been availed by the customer, for which they are not satisfied with the resolution provided by our customer support, the customer may contact our grievance officer.
            </p>

            <h3 className="font-bold mb-3">Grievance Officer Details</h3>
            <p className="mb-4">
              In accordance with the Information Technology Act 2000 and rules made thereunder, and the Consumer Protection (E-Commerce) Rules, 2020, the name and contact details of the Grievance Officer/Nodal Officer are provided below:
            </p>
            <div className="bg-jet-black/5 p-5 md:p-6 border border-jet-black/10 text-[13.5px] sm:text-sm overflow-hidden break-words">
              <p className="mb-1"><strong>Designation:</strong> General Manager</p>
              <p className="mb-1"><strong>Address:</strong> Sruthika building, asramam lane, kaloor, kochi</p>
              <p className="mb-1"><strong>Time:</strong> Mon – Fri (9:00 - 18:00)</p>
              <p className="mb-1 flex flex-wrap gap-1">
                <strong>Email:</strong> 
                <a href="mailto:care@cocoman.store" className="underline hover:opacity-70 transition-opacity break-all">care@cocoman.store</a>
              </p>
              <p className="mt-1"><strong>Phone:</strong> +91 9846459601</p>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
}
