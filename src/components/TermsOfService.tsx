import React from 'react';
import { Button } from './Button';

interface TermsOfServiceProps {
  onBack?: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
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
        <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
        <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-4 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing and using PropertyPro ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Use License</h2>
            <p>
              Permission is granted to temporarily access the materials on PropertyPro for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">3. User Accounts</h2>
            <p>
              You are responsible for maintaining the security of your account and password. You agree to provide accurate, current, and complete information during the registration process.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Prohibited Uses</h2>
            <p>
              You may not use the Service for any unlawful purpose or to solicit others to perform unlawful acts. You agree not to violate any local, state, national, or international law or regulation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Disclaimer</h2>
            <p>
              The materials on PropertyPro are provided on an 'as is' basis. PropertyPro makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Limitations</h2>
            <p>
              In no event shall PropertyPro or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PropertyPro.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Revisions and Errata</h2>
            <p>
              The materials appearing on PropertyPro could include technical, typographical, or photographic errors. PropertyPro does not warrant that any of the materials on its website are accurate, complete, or current.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at support@propertypro.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

