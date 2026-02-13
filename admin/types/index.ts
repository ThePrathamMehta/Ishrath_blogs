export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Literature' | 'Culture' | 'Journalism' | 'Essays';
  featuredImage?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  subscribed: boolean;
  subscribedAt?: string;
  unsubscribedAt?: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}
