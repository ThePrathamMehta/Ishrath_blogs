import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function PostsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-secondary text-3xl font-black text-foreground tracking-tight">
          Blog Posts
        </h1>
        <p className="text-muted-foreground mt-1">Manage your articles</p>
      </div>
      <Link
        href="/dashboard/posts/new"
        className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        New Post
      </Link>
    </div>
  );
}
