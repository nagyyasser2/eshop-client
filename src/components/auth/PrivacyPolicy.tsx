import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8">
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-8">Last updated: October 5, 2025</p>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p className="mb-4">
              We respect your privacy and are committed to protecting your
              personal data. This privacy policy will inform you about how we
              handle your personal data when you visit our platform and tell you
              about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Information We Collect
            </h2>
            <p className="mb-4">
              We may collect, use, store, and transfer different kinds of
              personal data about you:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Identity Data:</strong> First name, last name, username,
                date of birth
              </li>
              <li>
                <strong>Contact Data:</strong> Email address, telephone number,
                billing and delivery addresses
              </li>
              <li>
                <strong>Financial Data:</strong> Payment card details (processed
                securely through our payment providers)
              </li>
              <li>
                <strong>Transaction Data:</strong> Details about payments and
                products purchased
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type, time
                zone, device information
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our
                platform
              </li>
              <li>
                <strong>Marketing Data:</strong> Your preferences in receiving
                marketing communications
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. How We Collect Your Data
            </h2>
            <p className="mb-4">
              We use different methods to collect data from and about you:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Direct interactions:</strong> You provide data by
                filling in forms, creating an account, placing orders, or
                contacting us
              </li>
              <li>
                <strong>Automated technologies:</strong> As you interact with
                our platform, we may automatically collect technical data
                through cookies and similar technologies
              </li>
              <li>
                <strong>Third parties:</strong> We may receive data from
                analytics providers, payment providers, and advertising networks
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. How We Use Your Information
            </h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to.
              Most commonly, we use your data to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Process and deliver your orders</li>
              <li>Manage payments and collect money owed to us</li>
              <li>
                Manage our relationship with you, including notifying you about
                changes
              </li>
              <li>Improve our platform, products, and services</li>
              <li>Recommend products that may be of interest to you</li>
              <li>Protect against fraudulent or illegal activity</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Data Security
            </h2>
            <p className="mb-4">
              We have implemented appropriate security measures to prevent your
              personal data from being accidentally lost, used, accessed,
              altered, or disclosed in an unauthorized way. We limit access to
              your personal data to employees, agents, contractors, and third
              parties who have a business need to know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Data Retention
            </h2>
            <p className="mb-4">
              We will only retain your personal data for as long as necessary to
              fulfill the purposes for which we collected it, including
              satisfying any legal, accounting, or reporting requirements. To
              determine the appropriate retention period, we consider the
              amount, nature, and sensitivity of the personal data, the
              potential risk of harm from unauthorized use or disclosure, and
              applicable legal requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Your Legal Rights
            </h2>
            <p className="mb-4">
              Under certain circumstances, you have rights under data protection
              laws in relation to your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Cookies
            </h2>
            <p className="mb-4">
              Our platform uses cookies to distinguish you from other users.
              This helps us provide you with a good experience and allows us to
              improve our platform. A cookie is a small file of letters and
              numbers that we store on your browser or the hard drive of your
              computer. You can set your browser to refuse all or some browser
              cookies, but this may affect your ability to access or use certain
              parts of our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Third-Party Links
            </h2>
            <p className="mb-4">
              Our platform may include links to third-party websites, plug-ins,
              and applications. Clicking on those links or enabling those
              connections may allow third parties to collect or share data about
              you. We do not control these third-party websites and are not
              responsible for their privacy statements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Children's Privacy
            </h2>
            <p className="mb-4">
              Our platform is not intended for children under 13 years of age.
              We do not knowingly collect personal information from children
              under 13. If you are a parent or guardian and believe your child
              has provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Changes to Privacy Policy
            </h2>
            <p className="mb-4">
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new privacy policy on
              this page and updating the "Last updated" date. You are advised to
              review this privacy policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              12. Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or our privacy
              practices, please contact us at:
            </p>
            <div className="ml-4">
              <p>Email: privacy@yourcompany.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Privacy Street, Suite 100, City, State 12345</p>
            </div>
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

export default PrivacyPolicy;
