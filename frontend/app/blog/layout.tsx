import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Journal',
  description:
    'Essays, articles, and dispatches on literature, culture, and journalism. Cataloging the human experience one word at a time.',
  openGraph: {
    title: 'The Journal | The Inkwell',
    description: 'Essays, articles, and dispatches on literature, culture, and journalism',
    url: '/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
