'use client';

import DeletePostDialog from '@/components/posts/DeletePostDialog';
import PostCard from '@/components/posts/PostCard';
import PostsFilters from '@/components/posts/PostsFilters';
import PostsHeader from '@/components/posts/PostsHeader';
import { api } from '@/lib/api';
import { BlogPost } from '@/types';
import { useEffect, useState } from 'react';

export default function PostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchQuery, statusFilter, categoryFilter]);

  const loadPosts = async () => {
    try {
      const data = await api.getAllPosts();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = [...posts];

    if (searchQuery) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((post) =>
        statusFilter === 'published' ? post.published : !post.published
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((post) => post.category === categoryFilter);
    }

    setFilteredPosts(filtered);
  };

  const handleDeleteClick = (slug: string) => {
    setPostToDelete(slug);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;

    try {
      await api.deletePost(postToDelete);
      setPosts(posts.filter((p) => p.slug !== postToDelete));
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const togglePublish = async (slug: string, currentStatus: boolean) => {
    try {
      await api.publishPost(slug, !currentStatus);
      setPosts(posts.map((p) => (p.slug === slug ? { ...p, published: !currentStatus } : p)));
    } catch (error) {
      console.error('Failed to update post:', error);
      alert('Failed to update post');
    }
  };

  return (
    <div className="space-y-6">
      <PostsHeader />

      <PostsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
      />

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No posts found. Create your first post!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onTogglePublish={togglePublish}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      <DeletePostDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}
