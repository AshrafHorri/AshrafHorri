'use client';

import { useState, FormEvent } from 'react';

interface TrackingSearchProps {
  onTrack: (trackingNumber: string) => void;
  loading: boolean;
}

export default function TrackingSearch({ onTrack, loading }: TrackingSearchProps) {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      onTrack(trackingNumber.trim());
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="tracking-number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter Tracking Number
          </label>
          <input
            id="tracking-number"
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="e.g., 1234567890"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !trackingNumber.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Tracking...
            </span>
          ) : (
            'Track Package'
          )}
        </button>
      </form>
      
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Try these sample tracking numbers:</p>
        <div className="flex flex-wrap gap-2">
          {['TRK123456789', 'PKG987654321', 'SHP555666777'].map((sample) => (
            <button
              key={sample}
              onClick={() => setTrackingNumber(sample)}
              className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full transition-colors"
              disabled={loading}
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
