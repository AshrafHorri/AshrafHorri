'use client';

import { useState } from 'react';
import TrackingSearch from '@/components/TrackingSearch';
import TrackingResults from '@/components/TrackingResults';
import TrackingHistory from '@/components/TrackingHistory';

export default function Home() {
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleTrack = async (trackingNumber: string) => {
    setLoading(true);
    setError(null);
    setTrackingData(null);

    try {
      const response = await fetch(`/api/track?number=${encodeURIComponent(trackingNumber)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch tracking data');
      }

      setTrackingData(data);
      
      if (!history.includes(trackingNumber)) {
        setHistory(prev => [trackingNumber, ...prev].slice(0, 5));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = (trackingNumber: string) => {
    handleTrack(trackingNumber);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Package Tracker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Track your packages in real-time across multiple carriers
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <TrackingSearch onTrack={handleTrack} loading={loading} />
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200 font-medium">{error}</p>
              </div>
            )}

            {trackingData && <TrackingResults data={trackingData} />}
          </div>

          <div className="lg:col-span-1">
            <TrackingHistory history={history} onHistoryClick={handleHistoryClick} />
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© 2024 Package Tracker. All rights reserved.</p>
          <p className="mt-2">Supporting FedEx, UPS, DHL, and USPS</p>
        </footer>
      </div>
    </div>
  );
}
