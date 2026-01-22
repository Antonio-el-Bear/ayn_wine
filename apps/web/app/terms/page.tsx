'use client';

import MainLayout from '@/components/MainLayout';

export default function TermsPage() {
  return (
    <MainLayout>
      <section className="bg-gradient-to-b from-primary to-gray-900 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-widest text-secondary font-semibold">Terms</p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-gray-200 text-lg">Guidelines for using Ayn Wine and purchasing alcohol responsibly.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Eligibility</h3>
            <p className="text-gray-700">You must be 21+ to purchase. ID is required on delivery or pickup.</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Orders & pricing</h3>
            <p className="text-gray-700">
              Prices and availability may change. Orders are confirmed once payment is authorized. Some destinations may
              have delivery restrictions based on local laws.
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Responsible use</h3>
            <p className="text-gray-700">Please consume alcohol responsibly. We reserve the right to refuse service when appropriate.</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <p className="text-gray-700">Questions about your order? Contact support@aynwine.com with your order number.</p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
