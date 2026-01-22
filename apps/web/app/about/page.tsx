'use client';

import Link from 'next/link';
import MainLayout from '@/components/MainLayout';

export default function AboutPage() {
  return (
    <MainLayout>
      <section className="bg-gradient-to-b from-primary to-gray-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-secondary font-semibold">Our story</p>
              <h1 className="text-3xl sm:text-5xl font-bold mb-4">A modern bottle shop built for discovery</h1>
              <p className="text-gray-200 text-lg">
                Ayn Wine curates wines and spirits that balance everyday drinkability with special-occasion wow.
                We partner with trusted importers, family producers, and craft distillers to keep our shelves fresh,
                seasonal, and responsibly sourced.
              </p>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-semibold mb-3">What guides us</h3>
              <ul className="space-y-2 text-gray-100 text-sm">
                <li>• Quality first: bottles we would pour for our own table.</li>
                <li>• Clear guidance: tasting notes and food pairings made simple.</li>
                <li>• Responsible service: age verification and safe delivery every time.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[{
              title: 'Curated selection',
              text: 'Small producers, benchmark classics, and limited seasonal drops.'
            }, {
              title: 'Education-first',
              text: 'Straightforward notes so you can choose quickly and confidently.'
            }, {
              title: 'Service minded',
              text: 'Fast fulfillment, protective packaging, and responsive support.'
            }].map((item) => (
              <div key={item.title} className="p-6 border border-gray-200 rounded-xl shadow-sm bg-gray-50">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3">How we choose bottles</h3>
              <p className="text-gray-700 mb-3">
                We taste broadly, favoring producers who balance craft with sustainability. Each product page
                highlights flavor cues, serving tips, and ideal pairings to make decision-making easy.
              </p>
              <p className="text-gray-700">
                Whether you are stocking the bar cart, building a cellar, or gifting a friend, we keep categories
                clear—wine (red, white, sparkling, rosé), whiskey, vodka, beer, and ciders.
              </p>
            </div>
            <div className="bg-primary text-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Let us help</h3>
              <p className="text-gray-200 mb-4">
                Want pairing ideas for dinner? Planning a celebration? Tell us what you are after and we will make
                a short list.
              </p>
              <Link
                href="/contact"
                className="inline-flex px-5 py-3 bg-secondary text-primary font-semibold rounded-lg hover:opacity-90"
              >
                Talk with the team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
