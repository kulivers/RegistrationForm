import React from 'react';
import { Button } from './Button';

interface PrivacyPolicyProps {
  onBack?: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-6">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-4"
        >
          ← Back to Registration
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
        <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-4 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including your name, email address, phone number, and any other information you choose to provide when registering for an account with PropertyPro.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, process your registration, send you technical notices and support messages, and for any other purpose for which the information was collected.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business, provided they agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information at any time. You may also opt out of receiving marketing communications from us by following the unsubscribe instructions in such messages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@propertypro.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

