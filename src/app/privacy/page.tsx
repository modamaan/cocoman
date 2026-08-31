import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | COCOMAN',
  description: 'Privacy Policy and Data Protection Information for COCOMAN.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-soft-ivory text-jet-black min-h-screen pt-28 md:pt-32 pb-24 px-5 sm:px-8 md:px-16 font-sans w-full overflow-hidden">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-widest mb-10 md:mb-12 text-center break-words">
          Privacy Policy
        </h1>

        <div className="space-y-10 md:space-y-12 text-[14px] sm:text-sm md:text-[15px] leading-relaxed opacity-90">

          <section>
            <p className="mb-4">
              <strong>COCOMAN</strong> (“Company”, “we”, “our”, or “us”) is committed to protecting your personal data in accordance with:
            </p>
            <ul className="list-disc pl-5 md:pl-6 space-y-2 mb-4">
              <li>The Information Technology Act, 2000</li>
              <li>The Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</li>
              <li>The Digital Personal Data Protection Act, 2023</li>
            </ul>
            <p>
              By accessing our website, Shopify store, mobile interfaces, or visiting our physical outlets, you agree to this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">1. Role of the Company</h2>
            <p>
              Under the DPDP Act, COCOMAN acts as a Data Fiduciary, meaning we determine the purpose and means of processing your personal data.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">2. Personal Data We Collect</h2>
            <p className="mb-4">We collect only data necessary for lawful purposes.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="font-bold mb-2">A. Identity & Contact Data</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Mobile number</li>
                  <li>Billing and shipping address</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">B. Transaction Data</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Order history</li>
                  <li>Payment transaction reference details</li>
                  <li>Refund information</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">C. Account Data</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Username</li>
                  <li>Encrypted password</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">D. Technical Data</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Cookies and usage analytics</li>
                </ul>
              </div>
            </div>

            <p className="mt-6 italic text-sm">We do not intentionally collect data from children below 18 years of age.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">3. Purpose of Processing (Lawful Use)</h2>
            <p className="mb-4">We process personal data only for:</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-2 mb-4">
              <li>Order fulfilment</li>
              <li>Customer support</li>
              <li>Account management</li>
              <li>Collaboration processing</li>
              <li>Fraud detection</li>
              <li>Legal compliance</li>
              <li>Marketing communications (with consent)</li>
              <li>Improving user experience</li>
            </ul>
            <p>
              Personal data will not be processed for purposes other than those stated above unless explicit consent is obtained from the user or where such processing is required under applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">4. Consent (Core DPDP Requirement)</h2>
            <p className="mb-4">Consent under DPDP Act must be: Free, Specific, Informed, Unconditional, Unambiguous, and given through clear affirmative action.</p>
            <p className="mb-4">
              By clicking “I Agree”, placing an order, or creating an account, you provide consent for processing your data for specified purposes.
            </p>
            <p className="mb-2 font-bold">You have the right to:</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-2 mb-4">
              <li>Withdraw consent at any time</li>
              <li>Request correction</li>
              <li>Request erasure</li>
              <li>Access information about processing</li>
            </ul>
            <p>
              To exercise these rights, contact: <a href="mailto:care@cocoman.store" className="underline hover:opacity-70 transition-opacity break-all">care@cocoman.store</a>
            </p>
            <p className="mt-2 text-[13px] sm:text-sm italic">Withdrawal of consent will not affect lawful processing done prior to withdrawal.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">5. Data Principal Rights (DPDP Compliance)</h2>
            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 className="font-bold mb-2">1. Right to Access Information</h3>
                <p>Summary of data processed, processing activities, and identities of data processors.</p>
              </div>

              <div>
                <h3 className="font-bold mb-2">2. Right to Correction and Erasure</h3>
                <p className="mb-3">Users have the right to request correction of inaccurate or incomplete personal data or request deletion of their personal data maintained by the Company.</p>
                <ul className="list-decimal pl-5 md:pl-6 space-y-2 text-[13.5px] sm:text-[14px]">
                  <li><strong>Submit a Request:</strong> Users may submit a request by emailing the designated grievance/support email.</li>
                  <li><strong>Provide Required Details:</strong> The request should include the user’s name, registered contact details, and a clear description of the data that needs to be corrected or erased.</li>
                  <li><strong>Verification:</strong> The Company may verify the identity of the requester before processing the request.</li>
                  <li><strong>Processing:</strong> Upon verification, the Company will review the request and take appropriate action to correct or delete the data.</li>
                  <li><strong>Timeline:</strong> The Company will respond to such requests within 15 working days.</li>
                  <li><strong>Exceptions:</strong> Certain information may be retained where required under applicable laws or for legitimate business purposes.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">3. Right to Grievance Redressal</h3>
                <p className="mb-3">Users have the right to raise grievances regarding the collection, use, or processing of their personal data.</p>
                <ul className="list-decimal pl-5 md:pl-6 space-y-2 text-[13.5px] sm:text-[14px]">
                  <li><strong>Filing a Complaint:</strong> Users may submit their grievance through the contact form on the website or by emailing the designated grievance officer.</li>
                  <li><strong>Complaint Details:</strong> The complaint should include the user’s name, contact information, and a brief description of the issue.</li>
                  <li><strong>Acknowledgement:</strong> The Company will acknowledge the complaint within 3–5 working days.</li>
                  <li><strong>Review and Resolution:</strong> The grievance will be reviewed internally and appropriate action will be taken.</li>
                  <li><strong>Resolution Timeline:</strong> The Company will aim to resolve the grievance within 15 working days from the date of receipt.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">4. Right to Nominate</h3>
                <p>You may nominate another individual to exercise your rights in case of death or incapacity. Requests will be addressed within prescribed timelines.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">6. Children’s Data</h2>
            <p>
              We do not knowingly process personal data of children (below 18 years). If discovered, such data will be deleted promptly. No behavioural tracking or targeted advertising is conducted for minors.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">7. Data Security Safeguards</h2>
            <p className="mb-4">We implement reasonable technical and organisational safeguards including:</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-2 mb-4">
              <li>SSL encryption</li>
              <li>Secure payment gateway integration</li>
              <li>Access control mechanisms</li>
              <li>Vendor confidentiality agreements</li>
              <li>Periodic security audits</li>
            </ul>
            <p>
              In the event of a data breach, we will notify the Data Protection Board of India and affected users as required under the DPDP Act.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">8. Data Retention</h2>
            <p className="mb-4">We retain data only as long as necessary for:</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-2 mb-4">
              <li>Fulfilling orders</li>
              <li>Legal compliance (tax, audit, accounting)</li>
              <li>Dispute resolution</li>
            </ul>
            <p>When data is no longer required, it is securely deleted or anonymised.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">9. Disclosure of Data to Third Parties</h2>
            <p className="mb-4">In order to provide our services effectively, we may share limited personal data with trusted third-party service providers including:</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-2 mb-4">
              <li>Payment gateway providers for processing transactions</li>
              <li>Logistics and delivery partners for order fulfilment</li>
              <li>Cloud hosting providers (including Shopify infrastructure)</li>
              <li>IT service providers supporting our website and systems</li>
              <li>Auditors, legal advisors, and regulatory authorities where required by law</li>
            </ul>
            <p className="mb-4">
              Such sharing will take place only with the explicit consent of the user or where it is necessary for the performance of a contract or compliance with legal obligations.
            </p>
            <p>
              All third parties with whom personal data is shared are contractually obligated to maintain strict confidentiality, implement appropriate security measures, and process personal data only for the specified purpose in accordance with applicable data protection laws.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">10. Cross-Border Data Transfers</h2>
            <p>
              Personal data may be processed outside India through cloud service providers or Shopify infrastructure. Such transfers shall comply with restrictions notified by the Government of India under the DPDP Act.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">11. Non-Personal Identifiable Information</h2>
            <p>
              We may also collect aggregated information regarding the use of our service, such as the extent to which certain features are used. Aggregated information is anonymous, statistical information that reflects the scope of our user base, sales, and customer patterns from both online and physical outlet usage. We use this information to better understand how COCOMAN service is used, and to improve the online experience of our users. This information is not used in a way that will personally identify you. In addition, certain non-personally identifiable information is collected by COCOMAN and may be used by any third-party advertising providers during the course of your use of COCOMAN service.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">12. Cookies & Shared Objects</h2>
            <p>
              We may also use cookies and/or shared objects to track and understand the traffic on our website. Cookies are alphanumeric identifiers that our website places onto your computer’s hard drive. Cookies identify your computer so that we can recognize you the next time you visit us. We may use cookies and/or shared objects to collect and store some information about you, such as the name of the domain and host from which you access the Internet, the Internet Protocol (IP) address of the computer you are using, the date and time you access our website and the Internet address of the website from which you linked directly to our website. We use this information to better understand our users and customize our site for users’ particular preferences.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">13. Deletion of E-commerce Transaction Data</h2>
            <p>
              For users who have made purchases through our Shopify website or at our physical outlets, certain transactional data may be retained for accounting and legal compliance purposes. However, any unnecessary personal information will be securely deleted upon request.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">14. Confirmation of Data Deletion</h2>
            <p>
              Upon successful deletion of user data, COCOMAN will provide confirmation to the user via email or another agreed-upon communication method.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">15. Data Backup and Deletion</h2>
            <p>
              We regularly backup our website data for security and disaster recovery purposes. While deleted user data is removed from active systems, it may be retained in backup archives for a limited period. These backups are securely stored and will be overwritten or deleted in due course.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">16. Grievance Officer</h2>
            <p className="mb-4">In compliance with applicable law:</p>
            <div className="bg-jet-black/5 p-5 md:p-6 border border-jet-black/10 text-[13.5px] sm:text-sm overflow-hidden break-words">
              <p className="mb-1"><strong>Designation:</strong> General Manager</p>
              <p className="mb-1 flex flex-wrap gap-1">
                <strong>Email:</strong>
                <a href="mailto:care@cocoman.store" className="underline hover:opacity-70 transition-opacity break-all">care@cocoman.store</a>
              </p>
              <p className="mt-1"><strong>Address:</strong> Sruthika building, asramam lane, kaloor, kochi</p>
              <p className="mt-1"><strong>Phone:</strong> +91 9846459601</p>
            </div>
            <p className="mt-4">
              Complaints will be acknowledged within 36 hours and resolved within one month.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider mb-3 md:mb-4">17. Changes to this Policy</h2>
            <p className="mb-4">
              COCOMAN reserves the right to update or modify this User Data Deletion section of the privacy policy at any time. Users will be notified of any changes through the website or other communication channels.
            </p>
            <p className="mb-8">
              For any inquiries or concerns regarding data deletion, please contact our team at <a href="mailto:care@cocoman.store" className="underline hover:opacity-70 transition-opacity break-all">care@cocoman.store</a>.
            </p>

            <h3 className="font-serif text-lg sm:text-xl uppercase tracking-wider mb-2">Customer Service</h3>
            <p>
              For assistance, please email us at <a href="mailto:care@cocoman.store" className="underline hover:opacity-70 transition-opacity break-all">care@cocoman.store</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
