import { ArrowUpRight, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  href: string;
  isLoading?: boolean;
}

export default function StatsCard({ label, value, icon: Icon, href, isLoading }: StatsCardProps) {
  return (
    <Link
      href={href}
      className="group relative bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all overflow-hidden"
    >
      <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>

        <div className="space-y-1">
          <p className="text-2xl font-bold text-foreground">{isLoading ? '...' : value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </Link>
  );
}
