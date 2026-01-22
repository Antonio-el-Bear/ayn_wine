'use client';

import Link from 'next/link';
import MainLayout from '@/components/MainLayout';
import { Wine } from 'lucide-react';

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary to-gray-900 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Wine className="w-16 h-16 sm:w-20 sm:h-20 text-secondary" />
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Welcome to Ayn Wine
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto px-4">
              Discover the finest selection of wines and liquors from around the world.
              Expertly curated for the discerning palate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="px-6 py-3 bg-secondary text-primary font-bold rounded-lg hover:opacity-90 transition text-center"
              >
                Start Shopping
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border-2 border-secondary text-white rounded-lg hover:bg-secondary hover:text-primary transition text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: '🚚 Fast Delivery',
                description: 'Quick shipping to your doorstep',
              },
              {
                title: '💯 Authentic Products',
                description: 'Guaranteed genuine wines and spirits',
              },
              {
                title: '💳 Secure Payment',
                description: 'Safe and encrypted transactions',
              },
              {
                title: '📞 Expert Support',
                description: '24/7 customer service',
              },
              {
                title: '🎁 Special Offers',
                description: 'Regular discounts and promotions',
              },
              {
                title: '⭐ Expert Reviews',
                description: 'Detailed tasting notes and ratings',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Liquor Highlights */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-sm uppercase tracking-widest text-secondary font-semibold">Curated styles</p>
              <h2 className="text-2xl sm:text-3xl font-bold">Explore by Liquor</h2>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Quickly jump to the bottles you love—from bold reds and bright whites to small-batch whiskey,
                crisp vodka, beer staples, and craft ciders.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-primary text-white font-semibold hover:opacity-90"
            >
              View all products
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[{
              title: 'Wine',
              blurb: 'Red, white, sparkling, and rosé vintages for every table setting.',
              tags: ['Red wine', 'White wine', 'Sparkling', 'Rosé']
            }, {
              title: 'Whiskey',
              blurb: 'Small-batch bourbons, peppery rye, and smoky single malts.',
              tags: ['Bourbon', 'Rye', 'Scotch', 'Irish']
            }, {
              title: 'Vodka',
              blurb: 'Clean, crisp vodkas perfect for martinis or highballs.',
              tags: ['Classic', 'Potato', 'Flavored', 'Small-batch']
            }, {
              title: 'Beer',
              blurb: 'Lagers, IPAs, stouts, and seasonal releases from top breweries.',
              tags: ['Lager', 'IPA', 'Stout', 'Seasonal']
            }, {
              title: 'Ciders',
              blurb: 'Bright, orchard-fresh ciders ranging from dry to semi-sweet.',
              tags: ['Dry', 'Semi-sweet', 'Hopped', 'Perry']
            }, {
              title: 'Sparkling & More',
              blurb: 'Champagne, Prosecco, and celebratory bottles ready to pop.',
              tags: ['Champagne', 'Prosecco', 'Cava', 'Crémant']
            }].map((category) => (
              <div key={category.title} className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                  <Link
                    href={`/products#${category.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="text-sm text-secondary hover:underline font-semibold"
                  >
                    Shop
                  </Link>
                </div>
                <p className="text-gray-600 mb-4">{category.blurb}</p>
                <div className="flex flex-wrap gap-2">
                  {category.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Explore Our Collection</h2>
          <p className="text-gray-300 mb-8 text-sm sm:text-base">
            Thousands of premium wines and spirits awaiting discovery
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-secondary text-primary font-bold rounded-lg hover:opacity-90 transition"
          >
            Browse Products
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
