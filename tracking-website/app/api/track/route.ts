import { NextRequest, NextResponse } from 'next/server';

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

const carriers = ['FedEx', 'UPS', 'DHL', 'USPS'];
const statuses = ['In Transit', 'Out for Delivery', 'Delivered', 'Processing', 'Delayed'];
const locations = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA',
];

function generateMockTrackingData(trackingNumber: string): TrackingData {
  const hash = trackingNumber.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const carrier = carriers[hash % carriers.length];
  const statusIndex = hash % statuses.length;
  const status = statuses[statusIndex];
  
  const events: TrackingEvent[] = [];
  const numEvents = 3 + (hash % 5);
  
  for (let i = 0; i < numEvents; i++) {
    const daysAgo = numEvents - i;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    const eventStatuses = [
      'Package received',
      'In transit',
      'Arrived at facility',
      'Out for delivery',
      'Delivered',
    ];
    
    events.push({
      timestamp: date.toISOString(),
      status: eventStatuses[Math.min(i, eventStatuses.length - 1)],
      location: locations[(hash + i) % locations.length],
      description: `Package ${eventStatuses[Math.min(i, eventStatuses.length - 1)].toLowerCase()}`,
    });
  }
  
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + (statusIndex === 2 ? 0 : 2));
  
  return {
    trackingNumber,
    carrier,
    status,
    estimatedDelivery: deliveryDate.toISOString(),
    currentLocation: locations[hash % locations.length],
    events: events.reverse(),
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const trackingNumber = searchParams.get('number');
  
  if (!trackingNumber) {
    return NextResponse.json(
      { error: 'Tracking number is required' },
      { status: 400 }
    );
  }
  
  if (trackingNumber.length < 8) {
    return NextResponse.json(
      { error: 'Invalid tracking number format' },
      { status: 400 }
    );
  }
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const trackingData = generateMockTrackingData(trackingNumber);
  
  return NextResponse.json(trackingData);
}
