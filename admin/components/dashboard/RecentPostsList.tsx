import { ArrowUpRight, Calendar } from 'lucide-react';
import Link from 'next/link';

interface RecentPost {
  id: number;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
  category: string;
}

interface RecentPostsListProps {
  posts: RecentPost[];
  isLoading: boolean;
}

export default function RecentPostsList({ posts, isLoading }: RecentPostsListProps) {
  return (
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
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No articles yet. Create your first one!
          </div>
        ) : (
          posts.map((post) => (
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
                    post.published ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
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
  );
}
