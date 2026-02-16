import { Clock, FileText, Mail, MessageSquare, TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';

interface Stats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalSubscribers: number;
  unreadContacts: number;
}

interface StatsGridProps {
  stats: Stats;
  isLoading: boolean;
}

export default function StatsGrid({ stats, isLoading }: StatsGridProps) {
  const statCards = [
    {
      label: 'Total Articles',
      value: stats.totalPosts,
      icon: FileText,
      href: '/dashboard/posts',
    },
    {
      label: 'Published',
      value: stats.publishedPosts,
      icon: TrendingUp,
      href: '/dashboard/posts',
    },
    {
      label: 'Drafts',
      value: stats.draftPosts,
      icon: Clock,
      href: '/dashboard/posts',
    },
    {
      label: 'Subscribers',
      value: stats.totalSubscribers,
      icon: Mail,
      href: '/dashboard/newsletter',
    },
    {
      label: 'New Messages',
      value: stats.unreadContacts,
      icon: MessageSquare,
      href: '/dashboard/contact',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {statCards.map((stat, index) => (
        <StatsCard
          key={index}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          href={stat.href}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
