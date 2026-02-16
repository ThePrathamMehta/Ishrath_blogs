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
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  category: z.enum(['Literature', 'Culture', 'Journalism', 'Essays']),
  featuredImage: z.union([z.string().url(), z.instanceof(File), z.literal('')]).optional(),
  published: z.boolean(),
});

type PostFormData = z.infer<typeof postSchema>;

export default function NewPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [inlineImages, setInlineImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      published: false,
      category: 'Literature',
    },
  });

  const category = watch('category');

  const onSubmit = async (data: PostFormData) => {
    setIsLoading(true);
    try {
      let updatedContent = content;

      // Upload inline images and replace preview URLs with actual URLs
      if (inlineImages.length > 0) {
        console.log(`📤 Uploading ${inlineImages.length} inline images...`);

        for (const file of inlineImages) {
          const result = await api.uploadContentImage(file);
          const tempUrl = URL.createObjectURL(file);
          updatedContent = updatedContent.replace(tempUrl, result.url);
          console.log(`✅ Uploaded: ${file.name}`);
        }
      }

      // Create post with cover image file - backend will handle the upload
      await api.createPost(
        {
          ...data,
          content: updatedContent,
        },
        coverImageFile || undefined
      );

      console.log('✅ Post created successfully');
      router.push('/dashboard/posts');
    } catch (error: any) {
      console.error('Failed to create post:', error);
      alert(error.response?.data?.error || error.message || 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoverImageChange = (value: string | File) => {
    if (value instanceof File) {
      setCoverImageFile(value);
      setValue('featuredImage', value);
    } else {
      setCoverImageFile(null);
      setValue('featuredImage', value);
    }
  };

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
              Create New Post
            </h1>
            <p className="text-muted-foreground mt-1">Write a new article for your blog</p>
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
              value={content}
              onChange={(newContent) => {
                setContent(newContent);
                setValue('content', newContent);
              }}
              onImagesChange={setInlineImages}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-destructive">{errors.content.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Cover Image</label>
            <ImageUpload
              value={watch('featuredImage') || ''}
              onChange={handleCoverImageChange}
              type="cover"
            />
            {errors.featuredImage && (
              <p className="mt-1 text-sm text-destructive">
                {errors.featuredImage.message as string}
              </p>
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
              Publish immediately
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
            {isLoading ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
