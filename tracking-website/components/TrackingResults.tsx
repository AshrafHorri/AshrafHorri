'use client';

interface TrackingEvent {
  timestamp: string;
  status: string;
  location: string;
  description: string;
}

interface TrackingData {
  trackingNumber: string;
  carrier: string;
  status: string;
  estimatedDelivery: string;
  currentLocation: string;
  events: TrackingEvent[];
}

interface TrackingResultsProps {
  data: TrackingData;
}

export default function TrackingResults({ data }: TrackingResultsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'out for delivery':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'in transit':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'delayed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Tracking Details
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Tracking #: <span className="font-mono font-semibold">{data.trackingNumber}</span>
            </p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(data.status)}`}>
            {data.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Carrier</p>
            <p className="text-xl font-bold text-blue-900 dark:text-blue-100">{data.carrier}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
            <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">Current Location</p>
            <p className="text-xl font-bold text-purple-900 dark:text-purple-100">{data.currentLocation}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">Est. Delivery</p>
            <p className="text-xl font-bold text-green-900 dark:text-green-100">
              {new Date(data.estimatedDelivery).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tracking History</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            <div className="space-y-6">
              {data.events.map((event, index) => (
                <div key={index} className="relative pl-12">
                  <div className="absolute left-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{event.status}</h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(event.timestamp)}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{event.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
