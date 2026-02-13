import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with The Inkwell for collaborations, press inquiries, or to share your thoughts. We read every message.',
  openGraph: {
    title: 'Contact The Inkwell',
    description: 'Reach out for collaborations, press inquiries, or to share a thought',
    url: '/contact',
  },
};

export { default } from './page';
