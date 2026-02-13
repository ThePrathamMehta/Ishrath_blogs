'use client';

import { api } from '@/lib/api';
import {
  ArrowUpRight,
  Calendar,
  Clock,
  FileText,
  Mail,
  MessageSquare,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-secondary text-3xl font-black text-foreground tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your blog analytics</p>
        </div>
        <Link
          href="/dashboard/posts/new"
          className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          New Article
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            href={stat.href}
            className="group relative bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity" />

            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>

              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">
                  {isLoading ? '...' : stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Posts */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-secondary text-lg font-bold text-foreground">Recent Articles</h2>
          <Link
            href="/dashboard/posts"
            className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
          >
            View all
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="divide-y divide-border">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading...</div>
          ) : recentPosts.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No articles yet. Create your first one!
            </div>
          ) : (
            recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/dashboard/posts/${post.slug}/edit`}
                className="flex items-center justify-between p-4 hover:bg-accent transition-colors group"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      post.published
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
