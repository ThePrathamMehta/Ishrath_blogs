'use client';

import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Heading2,
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Undo,
  X,
  Link as LinkIcon,
} from 'lucide-react';
import { useRef, useState } from 'react';

interface InlineImage {
  id: string;
  file: File;
  preview: string;
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onImagesChange?: (images: File[]) => void;
}

export default function RichTextEditor({ value, onChange, onImagesChange }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inlineImages, setInlineImages] = useState<InlineImage[]>([]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: 'Start writing your blog post...',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4',
      },
      handleDrop: (view, event, slice, moved) => {
        // This function is typically used for custom drag-and-drop handling.
        // If you don't need custom logic, you can remove it or leave it empty.
        // Returning false allows Tiptap's default drop handling.
        return false;
      },
    },
  });

  const handleImageUpload = (file: File) => {
    if (!editor) return;

    const id = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const preview = URL.createObjectURL(file);

    const newImage: InlineImage = { id, file, preview };
    const updatedImages = [...inlineImages, newImage];
    setInlineImages(updatedImages);

    editor.chain().focus().setImage({ src: preview, alt: id }).run();

    if (onImagesChange) {
      onImagesChange(updatedImages.map((img) => img.file));
    }
  };

  const handleRemoveImage = (id: string) => {
    const imageToRemove = inlineImages.find((img) => img.id === id);
    if (!imageToRemove) return;

    URL.revokeObjectURL(imageToRemove.preview);

    const updatedImages = inlineImages.filter((img) => img.id !== id);
    setInlineImages(updatedImages);

    if (editor) {
      const { state } = editor;
      const { doc } = state;
      const tr = state.tr;

      doc.descendants((node, pos) => {
        if (node.type.name === 'image' && node.attrs.alt === id) {
          tr.delete(pos, pos + node.nodeSize);
        }
      });

      editor.view.dispatch(tr);
    }

    if (onImagesChange) {
      onImagesChange(updatedImages.map((img) => img.file));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
    e.target.value = '';
  };

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-muted">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-accent ${editor.isActive('bold') ? 'bg-accent' : ''}`}
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-accent ${editor.isActive('italic') ? 'bg-accent' : ''}`}
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded hover:bg-accent ${editor.isActive('heading', { level: 2 }) ? 'bg-accent' : ''}`}
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-accent ${editor.isActive('bulletList') ? 'bg-accent' : ''}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-accent ${editor.isActive('orderedList') ? 'bg-accent' : ''}`}
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-accent ${editor.isActive('blockquote') ? 'bg-accent' : ''}`}
          >
            <Quote className="w-4 h-4" />
          </button>
          <button type="button" onClick={handleImageClick} className="p-2 rounded hover:bg-accent">
            <ImageIcon className="w-4 h-4" />
          </button>
          <button type="button" onClick={addLink} className="p-2 rounded hover:bg-accent">
            <LinkIcon className="w-4 h-4" />
          </button>
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            className="p-2 rounded hover:bg-accent"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            className="p-2 rounded hover:bg-accent"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <EditorContent editor={editor} />
      </div>

      {inlineImages.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">
            Inline Images ({inlineImages.length})
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {inlineImages.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.preview}
                  alt={image.file.name}
                  className="w-full h-24 object-cover rounded-lg border border-border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(image.id)}
                  className="absolute top-1 right-1 p-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
                <p className="text-xs text-muted-foreground mt-1 truncate">{image.file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
