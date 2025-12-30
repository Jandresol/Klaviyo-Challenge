// ===== FILE: app/dashboard/page.tsx =====
// Main dashboard component

'use client';

import { useEffect, useState } from 'react';
import { CustomerSegment } from '@/types';

export default function Dashboard() {
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/segments')
      .then(res => res.json())
      .then(data => {
        setSegments(data.segments);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8">Loading segments...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Hyper-Personalization Dashboard
        </h1>

        <div className="space-y-4">
          {segments.map(segment => (
            <div key={segment.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{segment.name}</h2>
                  <p className="text-gray-600">{segment.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{segment.customerCount}</div>
                  <div className="text-sm text-gray-500">customers</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500">Health Score</div>
                  <div className="text-lg font-semibold">
                    {segment.healthScore}/10
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Engagement</div>
                  <div className="text-lg font-semibold">
                    {segment.avgEngagement}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Best Time</div>
                  <div className="text-lg font-semibold">
                    {segment.bestSendTime}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Characteristics:</h3>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {segment.characteristics.map((char, i) => (
                    <li key={i}>{char}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

