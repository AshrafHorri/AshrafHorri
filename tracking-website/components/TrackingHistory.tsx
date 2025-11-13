'use client';

interface TrackingHistoryProps {
  history: string[];
  onHistoryClick: (trackingNumber: string) => void;
}

export default function TrackingHistory({ history, onHistoryClick }: TrackingHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Searches</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">No recent searches yet. Start tracking a package to see your history here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 sticky top-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Searches</h3>
      <div className="space-y-2">
        {history.map((trackingNumber, index) => (
          <button
            key={index}
            onClick={() => onHistoryClick(trackingNumber)}
            className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors group"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {trackingNumber}
              </span>
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
