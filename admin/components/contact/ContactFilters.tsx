import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

interface ContactFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: 'all' | 'read' | 'unread';
  onStatusChange: (value: 'all' | 'read' | 'unread') => void;
}

export default function ContactFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: ContactFiltersProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input bg-background text-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
          />
        </div>

        <Select value={statusFilter} onValueChange={(value: any) => onStatusChange(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Messages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Messages</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
