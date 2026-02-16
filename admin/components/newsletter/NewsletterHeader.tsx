import { Download } from 'lucide-react';

interface NewsletterHeaderProps {
  onExport: () => void;
  canExport: boolean;
}

export default function NewsletterHeader({ onExport, canExport }: NewsletterHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-secondary text-3xl font-black text-foreground tracking-tight">
          Newsletter Subscribers
        </h1>
        <p className="text-muted-foreground mt-1">Manage your email subscribers</p>
      </div>
      <button
        onClick={onExport}
        disabled={!canExport}
        className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
      >
        <Download className="w-4 h-4" />
        Export CSV
      </button>
    </div>
  );
}
