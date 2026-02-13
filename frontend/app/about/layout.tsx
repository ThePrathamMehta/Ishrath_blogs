import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Learn about The Inkwell's mission to explore literature, culture, and journalism through deep dives into the printed word and the modern human condition.",
  openGraph: {
    title: 'About The Inkwell',
    description: 'Learn about our mission to explore literature, culture, and journalism',
    url: '/about',
  },
};

export { default } from './page';
