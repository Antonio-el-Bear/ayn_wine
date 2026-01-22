'use client';

import MainLayout from '@/components/MainLayout';

export default function PrivacyPage() {
  return (
    <MainLayout>
      <section className="bg-gradient-to-b from-primary to-gray-900 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-widest text-secondary font-semibold">Privacy</p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Your data, handled with care</h1>
          <p className="text-gray-200 text-lg">We collect only what we need to fulfill orders and support you.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Information we collect</h3>
            <p className="text-gray-700">
              Contact details, delivery addresses, payment confirmations, and purchase history needed to process and deliver
              your order. We do not store full payment card numbers; payments are processed by secure providers.
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">How we use it</h3>
            <p className="text-gray-700">Order processing, support, age verification, and service updates you opt into.</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Your choices</h3>
            <p className="text-gray-700">
              You can request updates or deletion of your data (unless required to retain for legal compliance). Marketing
              emails are opt-in and include an unsubscribe option.
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Security</h3>
            <p className="text-gray-700">
              Data is encrypted in transit. We follow least-privilege access and routinely review vendor security.
            </p>
          </div>
          <p className="text-gray-600 text-sm">
            For questions about privacy or data requests, email support@aynwine.com.
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
