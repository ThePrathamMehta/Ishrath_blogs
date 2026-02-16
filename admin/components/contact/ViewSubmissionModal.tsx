import { ContactSubmission } from '@/types';
import { Mail, X } from 'lucide-react';

interface ViewSubmissionModalProps {
  submission: ContactSubmission | null;
  onClose: () => void;
  onMarkAsRead: (id: number) => void;
}

export default function ViewSubmissionModal({
  submission,
  onClose,
  onMarkAsRead,
}: ViewSubmissionModalProps) {
  if (!submission) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-secondary text-xl font-bold text-foreground">Message Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
            <p className="text-foreground">{submission.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
            <p className="text-foreground">{submission.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Subject</label>
            <p className="text-foreground">{submission.subject}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Message</label>
            <p className="text-foreground whitespace-pre-wrap">{submission.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Received</label>
            <p className="text-foreground">{new Date(submission.createdAt).toLocaleString()}</p>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <a
              href={`mailto:${submission.email}?subject=Re: ${submission.subject}`}
              className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Reply via Email
            </a>
            {!submission.read && (
              <button
                onClick={() => {
                  onMarkAsRead(submission.id);
                  onClose();
                }}
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors"
              >
                Mark as Read
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
