import { BlogPost } from '@/types';
import { Edit, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface PostCardProps {
  post: BlogPost;
  onTogglePublish: (slug: string, currentStatus: boolean) => void;
  onDelete: (slug: string) => void;
}

export default function PostCard({ post, onTogglePublish, onDelete }: PostCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
      {post.featuredImage && (
        <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-foreground line-clamp-2">{post.title}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${
              post.published ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
            }`}
          >
            {post.published ? 'Published' : 'Draft'}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>

        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Link
            href={`/dashboard/posts/${post.slug}/edit`}
            className="flex-1 px-3 py-2 text-sm bg-muted hover:bg-accent text-foreground rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Link>
          <button
            onClick={() => onTogglePublish(post.slug, post.published)}
            className="flex-1 px-3 py-2 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {post.published ? 'Unpublish' : 'Publish'}
          </button>
          <button
            onClick={() => onDelete(post.slug)}
            className="px-3 py-2 text-sm bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
}
