'use client';

import MainLayout from '@/components/MainLayout';

export default function ReturnsPage() {
  return (
    <MainLayout>
      <section className="bg-gradient-to-b from-primary to-gray-900 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-widest text-secondary font-semibold">Returns</p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Returns & Replacements</h1>
          <p className="text-gray-200 text-lg">We stand behind every bottle and pack orders to arrive safely.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Damaged or incorrect items</h3>
            <p className="text-gray-700">If something arrives damaged or differs from your order, email support@aynwine.com within 7 days with photos and your order number. We will arrange a replacement or credit.</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Eligible returns</h3>
            <p className="text-gray-700">Unopened, safely stored bottles may be returnable where permitted by law. Customers are responsible for return shipping unless the issue was on our end.</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Refunds</h3>
            <p className="text-gray-700">Approved returns are refunded to the original payment method after inspection. Timing depends on your bank or card issuer.</p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
