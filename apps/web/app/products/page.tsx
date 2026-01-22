'use client';

import Link from 'next/link';
import MainLayout from '@/components/MainLayout';
import { Beer, GlassWater, Sparkles, Wine } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type LiquorCategory = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  variants: { title: string; notes: string }[];
  highlights: string[];
};

const liquorCategories: LiquorCategory[] = [
  {
    id: 'wine',
    name: 'Wine',
    description: 'Estate bottles and crowd-pleasers across reds, whites, and celebratory bubbles.',
    icon: Wine,
    variants: [
      { title: 'Red Wine', notes: 'Cabernet Sauvignon, Merlot, Pinot Noir, Syrah' },
      { title: 'White Wine', notes: 'Chardonnay, Sauvignon Blanc, Riesling, Pinot Grigio' },
      { title: 'Sparkling Wine', notes: 'Champagne, Prosecco, Cava, Crémant' },
      { title: 'Rosé & Light', notes: 'Provence rosé, sparkling rosé, Beaujolais' },
    ],
    highlights: ['Food-friendly picks', 'Cellar-worthy vintages', 'Sampler bundles'],
  },
  {
    id: 'whiskey',
    name: 'Whiskey',
    description: 'From sweet corn-forward bourbons to smoky, long-finish single malts.',
    icon: Sparkles,
    variants: [
      { title: 'Bourbon', notes: 'Vanilla-rich, caramelized corn mashbills' },
      { title: 'Rye', notes: 'Spicy, peppery profiles with herbal lift' },
      { title: 'Scotch & Single Malt', notes: 'Highland honey to Islay smoke' },
      { title: 'Irish & Japanese', notes: 'Silky triple-distilled and delicate grain blends' },
    ],
    highlights: ['Limited releases', 'Cask strength', 'Age-stated classics'],
  },
  {
    id: 'vodka',
    name: 'Vodka',
    description: 'Clean, crisp bases for martinis, infusions, and effortless highballs.',
    icon: GlassWater,
    variants: [
      { title: 'Classic', notes: 'Neutral, ultra-filtered, freezer-ready' },
      { title: 'Potato', notes: 'Creamier body with soft, rounded finish' },
      { title: 'Wheat & Rye', notes: 'Light spice and lifted aromatics' },
      { title: 'Flavored & Infused', notes: 'Citrus, berry, vanilla, and seasonal spins' },
    ],
    highlights: ['Chill-and-serve', 'Mixology staples', 'Mini bottles for tasting'],
  },
  {
    id: 'beer',
    name: 'Beer',
    description: 'Refreshing lagers, hop-forward IPAs, and rich dark styles from craft breweries.',
    icon: Beer,
    variants: [
      { title: 'Lagers & Pilsners', notes: 'Crisp, clean, and highly drinkable' },
      { title: 'Pale Ales & IPAs', notes: 'Citrus, pine, and resin-driven hop profiles' },
      { title: 'Stouts & Porters', notes: 'Roasty cacao, coffee, and silky bodies' },
      { title: 'Seasonal & Sours', notes: 'Fruited, barrel-aged, and limited drops' },
    ],
    highlights: ['Local favorites', 'Mixed packs', 'Low-ABV options'],
  },
  {
    id: 'ciders',
    name: 'Ciders',
    description: 'Orchard-fresh bottles spanning bone-dry to gently sweet styles.',
    icon: Sparkles,
    variants: [
      { title: 'Dry', notes: 'Crisp, clean finishes with lively acidity' },
      { title: 'Semi-Sweet', notes: 'Balanced sweetness with fresh apple character' },
      { title: 'Hopped & Spiced', notes: 'Herbal, citrusy twists on the classic' },
      { title: 'Perry & Blends', notes: 'Pear-led profiles and orchard blends' },
    ],
    highlights: ['Gluten-friendly choices', 'Can and bottle formats', 'Picnic-ready sizes'],
  },
];

export default function ProductsPage() {
  return (
    <MainLayout>
      <section className="bg-gradient-to-b from-primary to-gray-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-secondary font-semibold">Shop by taste</p>
              <h1 className="text-3xl sm:text-5xl font-bold mb-4">Discover every bottle, by style</h1>
              <p className="text-gray-200 text-lg mb-6">
                Browse curated liquor categories with quick-glance breakdowns—wine with red, white, and sparkling,
                plus whiskey, vodka, beer, and ciders each mapped to their key styles.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#wine"
                  className="px-5 py-3 bg-secondary text-primary font-semibold rounded-lg hover:opacity-90"
                >
                  Start with wine
                </Link>
                <Link
                  href="#whiskey"
                  className="px-5 py-3 border-2 border-secondary text-white rounded-lg hover:bg-secondary hover:text-primary"
                >
                  Explore whiskey
                </Link>
              </div>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-semibold mb-4">Quick picks</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {['Top-rated reds', 'Cellar-worthy whites', 'Small-batch bourbon', 'Classic martinis', 'Crisp lagers', 'Dry ciders'].map((item) => (
                  <span key={item} className="px-3 py-2 bg-white/10 rounded-lg border border-white/10 text-white">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 mb-8">
            {liquorCategories.map((category) => (
              <Link
                key={category.id}
                href={`#${category.id}`}
                className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-secondary hover:text-primary font-semibold text-sm"
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="space-y-12">
            {liquorCategories.map((category) => {
              const Icon = category.icon;
              return (
                <section
                  key={category.id}
                  id={category.id}
                  className="border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                >
                  <div className="bg-gray-50 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="p-3 rounded-full bg-primary text-white"><Icon className="w-6 h-6" /></span>
                      <div>
                        <h2 className="text-2xl font-bold">{category.name}</h2>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="text-sm font-semibold text-primary hover:text-secondary"
                    >
                      Need a recommendation?
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
                    {category.variants.map((variant) => (
                      <div key={variant.title} className="bg-white p-6">
                        <h3 className="text-lg font-semibold mb-2">{variant.title}</h3>
                        <p className="text-gray-600">{variant.notes}</p>
                      </div>
                    ))}
                  </div>

                  <div className="px-6 py-4 bg-white border-t border-gray-200 flex flex-wrap gap-2">
                    {category.highlights.map((highlight) => (
                      <span key={highlight} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to place an order?</h2>
            <p className="text-gray-200 mb-6">
              Tell us what you enjoy, and we will point you to the right bottles—whether it is a weeknight red,
              a whiskey to sip neat, or a mixed beer and cider pack for the weekend.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="px-5 py-3 bg-secondary text-primary font-semibold rounded-lg hover:opacity-90"
              >
                Talk to us
              </Link>
              <Link
                href="/faq"
                className="px-5 py-3 border-2 border-secondary text-white rounded-lg hover:bg-secondary hover:text-primary"
              >
                FAQ & policies
              </Link>
            </div>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold mb-3">Delivery basics</h3>
            <ul className="space-y-2 text-gray-100 text-sm">
              <li>• Age verification required upon delivery.</li>
              <li>• Safe, insulated packaging for bottles and cans.</li>
              <li>• Tracking updates for every shipment.</li>
              <li>• Local delivery options where available.</li>
            </ul>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
