import { ContactSubmission } from '@/types';
import { Trash2 } from 'lucide-react';

interface SubmissionsListProps {
  submissions: ContactSubmission[];
  isLoading: boolean;
  onView: (submission: ContactSubmission) => void;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function SubmissionsList({
  submissions,
  isLoading,
  onView,
  onMarkAsRead,
  onDelete,
}: SubmissionsListProps) {
  return (
    <div className="bg-card rounded-xl border border-border divide-y divide-border">
      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Loading...</div>
      ) : submissions.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">No submissions found</div>
      ) : (
        submissions.map((submission) => (
          <div key={submission.id} className="p-4 hover:bg-accent transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-foreground truncate">{submission.name}</h3>
                  {!submission.read && (
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{submission.email}</p>
                <p className="text-sm font-medium text-foreground mb-2">{submission.subject}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{submission.message}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(submission.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onView(submission)}
                  className="px-4 py-2 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                >
                  View
                </button>
                {!submission.read && (
                  <button
                    onClick={() => onMarkAsRead(submission.id)}
                    className="px-4 py-2 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => onDelete(submission.id)}
                  className="p-2 text-sm bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
