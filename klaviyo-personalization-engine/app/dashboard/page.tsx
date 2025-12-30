// ===== FILE: app/dashboard/page.tsx =====
// Main dashboard component with matching styling

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CustomerSegment } from '@/types';
import { 
  TrendingUp, 
  Users, 
  Mail, 
  Clock, 
  ArrowLeft,
  AlertCircle,
  Sparkles,
  Activity
} from 'lucide-react';

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
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Discovering customer segments...</p>
        </div>
      </div>
    );
  }

  const totalCustomers = segments.reduce((sum, seg) => sum + seg.customerCount, 0);
  const avgHealthScore = segments.length > 0 
    ? (segments.reduce((sum, seg) => sum + seg.healthScore, 0) / segments.length).toFixed(1)
    : '0';
  const avgEngagement = segments.length > 0
    ? Math.round(segments.reduce((sum, seg) => sum + seg.avgEngagement, 0) / segments.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={24} />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Personalization Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  Auto-discovered segments & insights
                </p>
              </div>
            </div>
            
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow">
              Create Campaign
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Users className="text-blue-600" size={24} />}
            label="Total Customers"
            value={totalCustomers.toLocaleString()}
            bgColor="bg-blue-50"
          />
          
          <StatCard
            icon={<Activity className="text-green-600" size={24} />}
            label="Avg Health Score"
            value={`${avgHealthScore}/10`}
            bgColor="bg-green-50"
          />
          
          <StatCard
            icon={<TrendingUp className="text-purple-600" size={24} />}
            label="Avg Engagement"
            value={`${avgEngagement}%`}
            bgColor="bg-purple-50"
          />
          
          <StatCard
            icon={<Sparkles className="text-yellow-600" size={24} />}
            label="Active Segments"
            value={segments.length.toString()}
            bgColor="bg-yellow-50"
          />
        </div>

        {/* Recommended Actions */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-orange-600 flex-shrink-0 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                ⚡ Recommended Actions
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>The Browsers</strong> - Send educational content, not sales</li>
                <li>• <strong>Deal Hunters</strong> - Flash sale opportunity detected</li>
                <li>• 23 customers ready for personalized re-engagement</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Segments List */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            📊 Auto-Discovered Segments
          </h2>
          <p className="text-gray-600 mb-6">
            Machine learning has automatically grouped your customers based on behavior patterns
          </p>
        </div>

        <div className="grid gap-6">
          {segments.map((segment, index) => (
            <SegmentCard key={segment.id} segment={segment} index={index} />
          ))}
        </div>

        {segments.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Users className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No segments discovered yet
            </h3>
            <p className="text-gray-600">
              Connect your Klaviyo account to start discovering customer segments
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ 
  icon, 
  label, 
  value, 
  bgColor 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string;
  bgColor: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
      <div className={`inline-flex p-3 rounded-lg ${bgColor} mb-4`}>
        {icon}
      </div>
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
}

// Segment Card Component
function SegmentCard({ 
  segment, 
  index 
}: { 
  segment: CustomerSegment;
  index: number;
}) {
  const icons = ['🏆', '💎', '⭐', '🎯', '💼'];
  const colors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-pink-500 to-pink-600'
  ];

  const getHealthColor = (score: number) => {
    if (score >= 7) return 'text-green-600 bg-green-50';
    if (score >= 5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 70) return 'text-green-600';
    if (engagement >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${colors[index % colors.length]} p-6 text-white`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{icons[index % icons.length]}</div>
            <div>
              <h2 className="text-2xl font-bold">{segment.name}</h2>
              <p className="text-blue-100 mt-1">{segment.description}</p>
            </div>
          </div>
          <div className="text-right bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
            <div className="text-3xl font-bold">{segment.customerCount}</div>
            <div className="text-sm text-blue-100">customers</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Activity size={18} className="text-gray-600" />
              <div className="text-sm text-gray-600">Health Score</div>
            </div>
            <div className={`text-2xl font-bold px-3 py-1 rounded-lg inline-block ${getHealthColor(segment.healthScore)}`}>
              {segment.healthScore}/10
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp size={18} className="text-gray-600" />
              <div className="text-sm text-gray-600">Engagement</div>
            </div>
            <div className={`text-2xl font-bold ${getEngagementColor(segment.avgEngagement)}`}>
              {segment.avgEngagement}%
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock size={18} className="text-gray-600" />
              <div className="text-sm text-gray-600">Best Time</div>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {segment.bestSendTime}
            </div>
          </div>
        </div>

        {/* Characteristics */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Sparkles size={18} className="text-purple-600" />
            Key Characteristics
          </h3>
          <ul className="space-y-2">
            {segment.characteristics.map((char, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <span className="text-blue-600 mt-1">•</span>
                <span>{char}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-100 pt-6 mt-6 flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
            <Mail size={18} />
            Send Campaign
          </button>
          <Link 
            href={`/dashboard/segments/${segment.id}`}
            className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-200 hover:border-gray-300 transition-colors text-gray-700 flex items-center justify-center"
          >
            View Customers
          </Link>
        </div>
      </div>
    </div>
  );
}
