import { Search } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Search />
      </div>
      <p className="empty-state-text">
        Select an algorithm above to configure its parameters
      </p>
    </div>
  );
}