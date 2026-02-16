'use client';

import NewsletterFilters from '@/components/newsletter/NewsletterFilters';
import NewsletterHeader from '@/components/newsletter/NewsletterHeader';
import NewsletterStats from '@/components/newsletter/NewsletterStats';
import SubscribersTable from '@/components/newsletter/SubscribersTable';
import { api } from '@/lib/api';
import { NewsletterSubscriber } from '@/types';
import { useEffect, useState } from 'react';

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'subscribed' | 'unsubscribed'>('all');

  useEffect(() => {
    loadSubscribers();
  }, []);

  useEffect(() => {
    filterSubscribers();
  }, [subscribers, searchQuery, statusFilter]);

  const loadSubscribers = async () => {
    try {
      const data = await api.getSubscribers();
      setSubscribers(data.subscribers || []);
    } catch (error) {
      console.error('Failed to load subscribers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterSubscribers = () => {
    let filtered = [...subscribers];

    if (searchQuery) {
      filtered = filtered.filter((sub) =>
        sub.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((sub) =>
        statusFilter === 'subscribed' ? sub.subscribed : !sub.subscribed
      );
    }

    setFilteredSubscribers(filtered);
  };

  const exportToCSV = () => {
    const csv = [
      ['Email', 'Status', 'Subscribed At', 'Unsubscribed At'],
      ...filteredSubscribers.map((sub) => [
        sub.email,
        sub.subscribed ? 'Subscribed' : 'Unsubscribed',
        sub.subscribedAt || '',
        sub.unsubscribedAt || '',
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const stats = {
    total: subscribers.length,
    subscribed: subscribers.filter((s) => s.subscribed).length,
    unsubscribed: subscribers.filter((s) => !s.subscribed).length,
  };

  return (
    <div className="space-y-6">
      <NewsletterHeader onExport={exportToCSV} canExport={filteredSubscribers.length > 0} />
      <NewsletterStats
        total={stats.total}
        subscribed={stats.subscribed}
        unsubscribed={stats.unsubscribed}
      />
      <NewsletterFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
      <SubscribersTable subscribers={filteredSubscribers} isLoading={isLoading} />
    </div>
  );
}
