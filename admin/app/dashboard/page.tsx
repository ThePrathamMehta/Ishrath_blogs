'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import RecentPostsList from '@/components/dashboard/RecentPostsList';
import StatsGrid from '@/components/dashboard/StatsGrid';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';

interface Stats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalSubscribers: number;
  unreadContacts: number;
}

interface RecentPost {
  id: number;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
  category: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalSubscribers: 0,
    unreadContacts: 0,
  });
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [postsData, subscribersData, contactsData] = await Promise.all([
        api.getAllPosts(),
        api.getSubscribers(true),
        api.getContactSubmissions(true),
      ]);

      const posts = postsData.posts || [];
      setStats({
        totalPosts: posts.length,
        publishedPosts: posts.filter((p: any) => p.published).length,
        draftPosts: posts.filter((p: any) => !p.published).length,
        totalSubscribers: subscribersData.total || 0,
        unreadContacts: contactsData.total || 0,
      });

      setRecentPosts(posts.slice(0, 5));
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <DashboardHeader />
      <StatsGrid stats={stats} isLoading={isLoading} />
      <RecentPostsList posts={recentPosts} isLoading={isLoading} />
    </div>
  );
}
