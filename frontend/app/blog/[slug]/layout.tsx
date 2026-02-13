import type { Metadata } from 'next';

// This would typically fetch data from a CMS or database
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Await params as it's a Promise in Next.js 15+
  const { slug } = await params;

  // In a real application, you would fetch the article data here
  const article = {
    title: 'The Unspoken Architectures of 21st Century Fiction',
    description:
      'A deep exploration of how contemporary fiction is reshaping narrative structures and challenging traditional storytelling conventions.',
    image:
      'https://images.pexels.com/photos/13249024/pexels-photo-13249024.jpeg?w=1200&h=630&fit=crop',
    publishedTime: '2024-10-24T00:00:00Z',
    author: 'The Inkwell Editorial Team',
  };

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description,
      url: `/blog/${slug}`,
      type: 'article',
      publishedTime: article.publishedTime,
      authors: [article.author],
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.image],
    },
  };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
