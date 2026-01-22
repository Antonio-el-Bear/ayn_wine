'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>Ayn Wine - Premium Wine & Liquor Store</title>
        <meta name="description" content="Your premium source for wine and liquor online" />
      </head>
      <body className="bg-white">
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster position="bottom-center" />
        </QueryClientProvider>
      </body>
    </html>
  );
}
