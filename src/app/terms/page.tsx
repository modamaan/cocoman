import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | COCOMAN',
  description: 'Terms and Conditions for using COCOMAN.',
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-soft-ivory text-jet-black min-h-screen pt-28 md:pt-32 pb-24 px-5 sm:px-8 md:px-16 font-sans w-full overflow-hidden">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-widest mb-10 md:mb-12 text-center break-words">
          Terms of Use
        </h1>
        
        <div className="space-y-10 md:space-y-12 text-[14px] sm:text-sm md:text-[15px] leading-relaxed opacity-90">
          
          <section>
            <p className="mb-4">
              Access to and use of cocoman.store and the products and service available through the website are subject to the following terms, conditions, and notices (“Terms of Service”). By browsing through these Terms of Service and using the services provided by our website, you agree to all Terms of Service along with the Privacy Policy, which may be updated by us from time to time.
            </p>
            <p className="mb-4">
              Please check this page regularly to take notice of any changes we may have made. We reserve the right to review and withdraw or amend the services without notice. We will not be liable if for any reason this Website is unavailable at any time or for any period. From time to time, we may restrict access to some parts or this entire Website.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">1. Introduction</h2>
            <p>
              The domain name cocoman.store is operated by COCOMAN, a company incorporated under the laws of India with its registered office at Sruthika building, asramam lane, kaloor, kochi. These Terms of Service apply to your use of our online platform.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">2. Services</h2>
            <p>
              COCOMAN is an online retailer of premium apparel and lifestyle products offered at great values to the consumer. Membership allows customers to purchase a variety of products. Upon placing an order, COCOMAN shall ship the product to you and be entitled to its payment for the service.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">3. Your Account</h2>
            <p>
              By creating an account on our website, you agree that all information you provide is accurate, current, and complete. You are solely responsible for maintaining the confidentiality of your account password and for restricting access to your computer or mobile device. You accept full responsibility for all activities that occur under your account. If you believe your account security has been compromised, you must notify us immediately. We reserve the right to terminate accounts, refuse service, and remove or edit content in our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">4. Privacy</h2>
            <p>
              Our <Link href="/privacy" className="underline hover:opacity-70 transition-opacity">Privacy Policy</Link>, incorporated by reference in these Terms of Service, sets out how we will use personal information you provide to us. By using this Website, you agree to be bound by the Privacy Policy and warrant that all data provided by you is accurate and up to date.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">5. Product Information & Pricing</h2>
            <p className="mb-4">
              The images of the items on the website are for illustrative purposes only. Although we have made every effort to display the colours accurately, we cannot guarantee that your device’s display will accurately reflect the colour of the items. Your items may vary slightly from those images. All sizes and measurements of items are approximate; however, we do make every effort to ensure they are as accurate as possible. We take all reasonable care to ensure that all details, descriptions, and prices of items are as accurate as possible.
            </p>
            <p className="mb-4">
              We ensure that all details of prices appearing on the website are accurate; however, errors may occur. If we discover an error in the price of any goods which you have ordered, we will inform you of this as soon as possible. If we are unable to contact you, we will treat the order as cancelled. If you cancel and have already paid for the goods, you will receive a full refund.
            </p>
            <p>
              Additionally, prices for items may change from time to time without notice. However, these changes will not affect orders that have already been dispatched. The price of an item includes applicable taxes at the prevailing rate for which we are responsible as a seller.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">6. Payment</h2>
            <p className="mb-4">
              Upon receiving your order, we carry out a standard pre-authorization check on your payment method to ensure there are sufficient funds to fulfill the transaction. Goods will not be dispatched until this pre-authorization check has been completed. Your card will be debited once the order has been accepted. Similarly, for UPI payments, if the transaction fails for any reason, the order will not be processed or dispatched until a successful payment is received.
            </p>
            <p>
              We accept various payment methods, including Credit Cards, Debit Cards, Net Banking, and UPI. A Cash on Delivery (COD) option may also be available for select pincodes in India. For COD orders, a non-refundable fee may be required to be paid while placing the order, with the remaining order amount to be paid upon delivery. For any further payment-related queries, please contact our support team.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">7. Delivery</h2>
            <p className="mb-4">
              You will be given various options for the delivery of items during the order process. The options available to you will vary depending on where you are ordering from. An estimated delivery time is displayed on the order summary page. Upon placing your order, you will receive an email containing a summary of the order and the estimated delivery time to your location.
            </p>
            <p className="mb-4">
              Sometimes, delivery may take longer due to unforeseen circumstances. In such cases, we will proactively reach out to you via email and SMS. However, we will not be able to compensate for any mental agony caused due to a delay in delivery.
            </p>
            <p className="mb-4">
              For more details, please refer to our <Link href="/shipping" className="underline hover:opacity-70 transition-opacity">Shipping Policy</Link>.
            </p>
            <p>
              Please note that an order containing multiple items may be delivered in separate packages and arrive at different times.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">8. Returns & Refunds</h2>
            <p>
              If you change your mind about any items purchased, you can return them to us (subject to specific exclusions). For more information on Returns and Refunds, please contact our support team.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">9. Intellectual Property Rights</h2>
            <p>
              All and any intellectual property rights in connection with the products, content, text, graphics, images, logos, and software on the website shall be owned absolutely by the Company. The "COCOMAN" name and logo and all related product and service names, design marks, and slogans are the trademarks, logos, or service marks ("Marks") of the Company. You are prohibited from using these Marks or any other content on the website without the express written consent of the Company.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">10. Third-Party Websites and Content</h2>
            <p className="mb-4">
              Our website provides links for sharing our content on Facebook, Instagram, and other such third-party websites. These are only for sharing and/or listing purposes, and we take no responsibility for the third-party websites and/or their contents listed on our website and disclaim all our liabilities arising out of any or all third-party websites.
            </p>
            <p>
              We disclaim all liabilities and take no responsibility for the content that may be posted on such third-party websites by the users of such websites in their personal capacity on any of the above-mentioned links for sharing and/or listing purposes, as well as any content and/or comments that may be posted by such user in their personal capacity on any official webpage of COCOMAN on any social networking platform.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">11. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless the Company, its directors, officers, employees, consultants, agents, and affiliates, from any and all third-party claims, liability, damages, or costs arising from your use of this website, your breach of these Terms of Service, or infringement of any intellectual property right.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">12. Violation & Termination</h2>
            <p>
              You agree that the Company may, in its sole discretion and without prior notice, terminate your access to the website and block your future access if we determine that you have violated these Terms of Service or any other policies. If you or the Company terminates your use of any service, you shall still be liable to pay for any service that you have already ordered until the time of such termination.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">13. Governing Law and Jurisdiction</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India without reference to conflict of laws principles, and disputes arising in relation hereto shall be subject to the exclusive jurisdiction of the courts at Kochi, Kerala, India.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">14. Wallet Cashback & Cancellation Policy</h2>
            <ul className="list-disc pl-5 md:pl-6 space-y-2">
              <li>The cashback amount will be credited to your wallet once the order is delivered successfully.</li>
              <li>The wallet amount can be used only for purchasing from our website.</li>
              <li>The wallet amount cannot be transferred to any bank accounts.</li>
              <li>All cancellation requests will be refunded to your wallet instantly to prevent any cancellation charges from the respective banks.</li>
            </ul>
          </section>

          <section>
            <div className="bg-jet-black/5 p-5 md:p-6 border border-jet-black/10 text-[13.5px] sm:text-sm overflow-hidden break-words mt-8">
              <p>
                If you have any questions, comments, or requests regarding our Terms of Service or the website, please contact us at: <br/>
                <a href="mailto:care@cocoman.store" className="underline hover:opacity-70 transition-opacity font-bold mt-2 inline-block">care@cocoman.store</a>
              </p>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
}
