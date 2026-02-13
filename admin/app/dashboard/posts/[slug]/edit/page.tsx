'use client';

import ImageUpload from '@/components/ImageUpload';
import RichTextEditor from '@/components/RichTextEditor';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { api } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  category: z.enum(['Literature', 'Culture', 'Journalism', 'Essays']),
  featuredImage: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  published: z.boolean(),
});

type PostFormData = z.infer<typeof postSchema>;

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [content, setContent] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const category = watch('category');

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    try {
      setFetchError(null);
      const response = await api.getPostBySlug(slug);
      const post = response.post;
      reset({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        featuredImage: post.featuredImage || '',
        published: post.published,
      });
      setContent(post.content);
    } catch (error: any) {
      console.error('Failed to load post:', error);
      const errorMsg =
        error.response?.data?.error ||
        error.message ||
        'Failed to load post. Please check if the backend is running.';
      setFetchError(errorMsg);
    } finally {
      setIsFetching(false);
    }
  };

  const onSubmit = async (data: PostFormData) => {
    setIsLoading(true);
    try {
      await api.updatePost(slug, {
        ...data,
        content,
      });
      router.push('/dashboard/posts');
    } catch (error: any) {
      console.error('Failed to update post:', error);
      alert(error.response?.data?.error || 'Failed to update post');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6">
          <h2 className="text-lg font-bold text-destructive mb-2">Error Loading Post</h2>
          <p className="text-destructive/90 mb-4">{fetchError}</p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setIsFetching(true);
                loadPost();
              }}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors"
            >
              Retry
            </button>
            <Link
              href="/dashboard/posts"
              className="px-4 py-2 border border-border text-foreground font-medium rounded-lg hover:bg-accent transition-colors"
            >
              Back to Posts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/posts"
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <div>
            <h1 className="font-secondary text-3xl font-black text-foreground tracking-tight">
              Edit Post
            </h1>
            <p className="text-muted-foreground mt-1">Update your article</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Title *</label>
            <input
              {...register('title')}
              type="text"
              className="w-full px-4 py-3 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
              placeholder="Enter article title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Excerpt *</label>
            <textarea
              {...register('excerpt')}
              rows={3}
              className="w-full px-4 py-3 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none resize-none"
              placeholder="Brief summary of the article"
            />
            {errors.excerpt && (
              <p className="mt-1 text-sm text-destructive">{errors.excerpt.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Content *</label>
            <RichTextEditor
              content={content}
              onChange={(newContent) => {
                setContent(newContent);
                setValue('content', newContent);
              }}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-destructive">{errors.content.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
            <Select value={category} onValueChange={(value: any) => setValue('category', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Literature">Literature</SelectItem>
                <SelectItem value="Culture">Culture</SelectItem>
                <SelectItem value="Journalism">Journalism</SelectItem>
                <SelectItem value="Essays">Essays</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Cover Image</label>
            <ImageUpload
              value={watch('featuredImage') || ''}
              onChange={(url) => setValue('featuredImage', url)}
              type="cover"
            />
            {errors.featuredImage && (
              <p className="mt-1 text-sm text-destructive">{errors.featuredImage.message}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <input
              {...register('published')}
              type="checkbox"
              id="published"
              className="w-4 h-4 text-primary border-input rounded focus:ring-ring"
            />
            <label htmlFor="published" className="text-sm font-medium text-foreground">
              Published
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/dashboard/posts"
            className="px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-accent transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
