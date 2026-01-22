'use client';

import MainLayout from '@/components/MainLayout';

const faqs = [
  {
    q: 'Do you verify age on delivery?',
    a: 'Yes. A government-issued ID showing 21+ is required upon delivery or pickup.'
  },
  {
    q: 'Which liquor categories do you carry?',
    a: 'Wine (red, white, sparkling, rosé), whiskey (bourbon, rye, scotch), vodka, beer, and ciders with rotating seasonal additions.'
  },
  {
    q: 'How fast is shipping?',
    a: 'Orders typically ship within 1–2 business days. Transit time varies by location; tracking updates are included.'
  },
  {
    q: 'Do you offer recommendations?',
    a: 'Absolutely. Tell us what you like and we will suggest bottles tailored to your taste and budget.'
  },
  {
    q: 'Can I return a bottle?',
    a: 'See our returns policy for eligibility. If something arrives damaged, contact us right away for a replacement.'
  },
];

export default function FAQPage() {
  return (
    <MainLayout>
      <section className="bg-gradient-to-b from-primary to-gray-900 text-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-widest text-secondary font-semibold">FAQ</p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Answers at a glance</h1>
          <p className="text-gray-200 text-lg">Quick details on shipping, categories, and service.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {faqs.map((item) => (
            <div key={item.q} className="p-6 border border-gray-200 rounded-xl shadow-sm bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">{item.q}</h3>
              <p className="text-gray-700">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
