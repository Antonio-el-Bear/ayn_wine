'use client';

import MainLayout from '@/components/MainLayout';

export default function ShippingPage() {
  return (
    <MainLayout>
      <section className="bg-gradient-to-b from-primary to-gray-900 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-widest text-secondary font-semibold">Shipping</p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Shipping & Delivery</h1>
          <p className="text-gray-200 text-lg">How we pack, ship, and verify your order.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Processing times</h3>
            <p className="text-gray-700">Orders typically ship within 1–2 business days. You will receive tracking once packed.</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Packaging</h3>
            <p className="text-gray-700">Bottles are secured with protective, insulated packaging to reduce breakage and temperature swings.</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Age verification</h3>
            <p className="text-gray-700">Adult signature (21+) with valid ID is required upon delivery. Carriers may add re-delivery fees if no adult is present.</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Service areas</h3>
            <p className="text-gray-700">Availability varies by state and local laws. Some regions may have restrictions on spirits or delivery windows.</p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
