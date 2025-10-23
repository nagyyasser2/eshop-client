import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="my-4">
      <div className="container mx-auto bg-white rounded-lg">
        <h3 className="text-xl font-bold text-slate-600 mb-2">
          Terms of Service
        </h3>
        <p className="text-gray-600 mb-8">Last updated: October 5, 2025</p>

        <div className="space-y-8 text-gray-700">
          <section>
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h4>
            <p className="mb-4">
              By accessing and using this e-commerce platform, you accept and
              agree to be bound by the terms and provision of this agreement. If
              you do not agree to abide by the above, please do not use this
              service.
            </p>
          </section>

          <section>
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Use License
            </h4>
            <p className="mb-4">
              Permission is granted to temporarily access the materials on our
              platform for personal, non-commercial transitory viewing only.
              This is the grant of a license, not a transfer of title, and under
              this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>
                Use the materials for any commercial purpose or public display
              </li>
              <li>
                Attempt to decompile or reverse engineer any software contained
                on the platform
              </li>
              <li>
                Remove any copyright or proprietary notations from the materials
              </li>
              <li>
                Transfer the materials to another person or mirror the materials
                on any other server
              </li>
            </ul>
          </section>

          <section>
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Account Registration
            </h4>
            <p className="mb-4">
              To access certain features of our platform, you may be required to
              create an account. You agree to provide accurate, current, and
              complete information during the registration process and to update
              such information to keep it accurate, current, and complete. You
              are responsible for safeguarding your password and for all
              activities that occur under your account.
            </p>
          </section>

          <section>
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Product Information and Pricing
            </h4>
            <p className="mb-4">
              We strive to provide accurate product descriptions and pricing
              information. However, we do not warrant that product descriptions,
              pricing, or other content on this platform is accurate, complete,
              reliable, current, or error-free. We reserve the right to correct
              any errors, inaccuracies, or omissions and to change or update
              information at any time without prior notice.
            </p>
          </section>

          <section>
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Orders and Payment
            </h4>
            <p className="mb-4">
              By placing an order, you represent that the products ordered will
              be used only in a lawful manner. We reserve the right to refuse or
              cancel any order for any reason, including but not limited to
              product availability, errors in pricing or product information, or
              suspected fraudulent activity. Payment must be received by us
              prior to our acceptance of an order.
            </p>
          </section>

          <section>
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Shipping and Delivery
            </h4>
            <p className="mb-4">
              We will make every effort to deliver products within the estimated
              timeframes. However, we are not responsible for delays outside of
              our control. Risk of loss and title for items purchased pass to
              you upon delivery to the carrier.
            </p>
          </section>

          <section>
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Returns and Refunds
            </h4>
            <p className="mb-4">
              Our return and refund policy allows you to return products within
              30 days of receipt for a full refund, provided they are in
              original condition with all packaging and accessories. Certain
              products may not be eligible for return due to hygiene or safety
              reasons. Refunds will be processed within 7-10 business days of
              receiving the returned item.
            </p>
          </section>

          <section>
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Limitation of Liability
            </h4>
            <p className="mb-4">
              In no event shall our company or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on our platform, even if we or
              our authorized representative has been notified orally or in
              writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">
              9. User Conduct
            </h4>
            <p className="mb-4">You agree not to use the platform to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit any harmful or malicious code</li>
              <li>Engage in any fraudulent activity</li>
              <li>Harass, abuse, or harm other users</li>
            </ul>
          </section>

          <section>
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Intellectual Property
            </h4>
            <p className="mb-4">
              All content on this platform, including but not limited to text,
              graphics, logos, images, and software, is the property of our
              company or its content suppliers and is protected by international
              copyright laws. Unauthorized use of any materials may violate
              copyright, trademark, and other laws.
            </p>
          </section>

          <section>
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Modifications to Terms
            </h4>
            <p className="mb-4">
              We reserve the right to revise these terms of service at any time
              without notice. By using this platform, you agree to be bound by
              the current version of these terms of service.
            </p>
          </section>

          <section>
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">
              12. Contact Information
            </h4>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please
              contact us at support@yourcompany.com
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            to="/"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
