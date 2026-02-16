'use client';

import ContactFilters from '@/components/contact/ContactFilters';
import ContactHeader from '@/components/contact/ContactHeader';
import ContactStats from '@/components/contact/ContactStats';
import DeleteSubmissionDialog from '@/components/contact/DeleteSubmissionDialog';
import SubmissionsList from '@/components/contact/SubmissionsList';
import ViewSubmissionModal from '@/components/contact/ViewSubmissionModal';
import { api } from '@/lib/api';
import { ContactSubmission } from '@/types';
import { useEffect, useState } from 'react';

export default function ContactPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'read' | 'unread'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState<number | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  useEffect(() => {
    filterSubmissions();
  }, [submissions, searchQuery, statusFilter]);

  const loadSubmissions = async () => {
    try {
      const data = await api.getContactSubmissions();
      setSubmissions(data.submissions || []);
    } catch (error) {
      console.error('Failed to load submissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterSubmissions = () => {
    let filtered = [...submissions];

    if (searchQuery) {
      filtered = filtered.filter(
        (sub) =>
          sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((sub) => (statusFilter === 'read' ? sub.read : !sub.read));
    }

    setFilteredSubmissions(filtered);
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await api.markContactAsRead(id);
      setSubmissions(submissions.map((s) => (s.id === id ? { ...s, read: true } : s)));
    } catch (error) {
      console.error('Failed to mark as read:', error);
      alert('Failed to mark as read');
    }
  };

  const handleDeleteClick = (id: number) => {
    setSubmissionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!submissionToDelete) return;

    try {
      await api.deleteContactSubmission(submissionToDelete);
      setSubmissions(submissions.filter((s) => s.id !== submissionToDelete));
      setSelectedSubmission(null);
      setDeleteDialogOpen(false);
      setSubmissionToDelete(null);
    } catch (error) {
      console.error('Failed to delete submission:', error);
      alert('Failed to delete submission');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSubmissionToDelete(null);
  };

  const stats = {
    total: submissions.length,
    unread: submissions.filter((s) => !s.read).length,
  };

  return (
    <div className="space-y-6">
      <ContactHeader />
      <ContactStats total={stats.total} unread={stats.unread} />
      <ContactFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
      <SubmissionsList
        submissions={filteredSubmissions}
        isLoading={isLoading}
        onView={setSelectedSubmission}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDeleteClick}
      />
      <ViewSubmissionModal
        submission={selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
        onMarkAsRead={handleMarkAsRead}
      />
      <DeleteSubmissionDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}
