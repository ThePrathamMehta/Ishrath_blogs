import { Mail, UserCheck, UserX } from 'lucide-react';

interface NewsletterStatsProps {
  total: number;
  subscribed: number;
  unsubscribed: number;
}

export default function NewsletterStats({ total, subscribed, unsubscribed }: NewsletterStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{total}</p>
            <p className="text-sm text-muted-foreground">Total Subscribers</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <UserCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{subscribed}</p>
            <p className="text-sm text-muted-foreground">Active</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-muted">
            <UserX className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{unsubscribed}</p>
            <p className="text-sm text-muted-foreground">Unsubscribed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
