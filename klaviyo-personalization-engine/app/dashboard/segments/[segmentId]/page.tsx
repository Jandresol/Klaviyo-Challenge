// ===== FILE: app/dashboard/segments/[segmentId]/page.tsx =====
// Segment detail page showing all customers in a segment

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Users,
  Mail,
  TrendingUp,
  Clock,
  DollarSign,
  Target,
  ChevronRight,
  Activity
} from 'lucide-react';

interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  healthScore: number;
  behaviors: {
    avgOpenRate: number;
    avgClickRate: number;
    purchaseFrequency: number;
    avgCartValue: number;
  };
  preferences: {
    bestOpenTime: string;
    subjectLineStyle: string;
    contentFormat: string;
    discountThreshold: number;
  };
}

interface SegmentDetail {
  id: string;
  name: string;
  description: string;
  customerCount: number;
  characteristics: string[];
  healthScore: number;
  avgEngagement: number;
  bestSubjectLine: string;
  bestSendTime: string;
  customers: Customer[];
}

export default function SegmentDetailPage() {
  const params = useParams();
  const segmentId = params.segmentId as string;
  const [segment, setSegment] = useState<SegmentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'health' | 'engagement' | 'value'>('health');

  useEffect(() => {
    // Fetch segment details and customers
    fetch(`/api/segments/${segmentId}`)
      .then(res => res.json())
      .then(data => {
        setSegment(data.segment);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, [segmentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading segment details...</p>
        </div>
      </div>
    );
  }

  if (!segment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-medium">Segment not found</p>
        </div>
      </div>
    );
  }

  const sortedCustomers = [...segment.customers].sort((a, b) => {
    if (sortBy === 'health') return b.healthScore - a.healthScore;
    if (sortBy === 'engagement') return b.behaviors.avgOpenRate - a.behaviors.avgOpenRate;
    return b.behaviors.avgCartValue - a.behaviors.avgCartValue;
  });

  const segmentIcons = ['🏆', '💎', '⭐', '🎯', '💼'];
  const segmentColors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-pink-500 to-pink-600'
  ];
  
  const segmentIndex = parseInt(segmentId.split('-')[1] || '0');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{segmentIcons[segmentIndex % segmentIcons.length]}</span>
                <h1 className="text-2xl font-bold text-gray-900">
                  {segment.name}
                </h1>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {segment.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Segment Overview Banner */}
        <div className={`bg-gradient-to-r ${segmentColors[segmentIndex % segmentColors.length]} rounded-xl p-8 mb-8 text-white shadow-xl`}>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <Users size={32} className="mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold">{segment.customerCount}</div>
              <div className="text-sm text-blue-100">Customers</div>
            </div>
            <div className="text-center">
              <Activity size={32} className="mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold">{segment.healthScore}/10</div>
              <div className="text-sm text-blue-100">Avg Health</div>
            </div>
            <div className="text-center">
              <TrendingUp size={32} className="mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold">{segment.avgEngagement}%</div>
              <div className="text-sm text-blue-100">Engagement</div>
            </div>
            <div className="text-center">
              <Clock size={32} className="mx-auto mb-2 opacity-80" />
              <div className="text-xl font-bold">{segment.bestSendTime}</div>
              <div className="text-sm text-blue-100">Best Send Time</div>
            </div>
          </div>
        </div>

        {/* Characteristics */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Segment Characteristics</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {segment.characteristics.map((char, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-700">{char}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sort & Actions Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('health')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'health' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Health Score
              </button>
              <button
                onClick={() => setSortBy('engagement')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'engagement' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Engagement
              </button>
              <button
                onClick={() => setSortBy('value')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'value' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Cart Value
              </button>
            </div>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center gap-2">
            <Mail size={18} />
            Send Campaign to All
          </button>
        </div>

        {/* Customer List */}
        <div className="grid gap-4">
          {sortedCustomers.map(customer => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CustomerCard({ customer }: { customer: Customer }) {
  const getHealthColor = (score: number) => {
    if (score >= 7) return 'bg-green-100 text-green-700 border-green-200';
    if (score >= 5) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  const displayName = customer.firstName && customer.lastName
    ? `${customer.firstName} ${customer.lastName}`
    : customer.firstName || customer.email.split('@')[0];

  return (
    <Link href={`/dashboard/customers/${customer.id}`}>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 p-6 cursor-pointer hover:border-blue-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
              {displayName.charAt(0).toUpperCase()}
            </div>

            {/* Customer Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-semibold text-gray-900">{displayName}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getHealthColor(customer.healthScore)}`}>
                  Health: {customer.healthScore.toFixed(1)}/10
                </span>
              </div>
              <p className="text-sm text-gray-500">{customer.email}</p>
            </div>

            {/* Metrics */}
            <div className="hidden md:flex gap-8">
              <div className="text-center">
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                  <Mail size={14} />
                  <span>Open Rate</span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {Math.round(customer.behaviors.avgOpenRate * 100)}%
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                  <Target size={14} />
                  <span>Click Rate</span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {Math.round(customer.behaviors.avgClickRate * 100)}%
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                  <DollarSign size={14} />
                  <span>Avg Cart</span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  ${Math.round(customer.behaviors.avgCartValue)}
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                  <Clock size={14} />
                  <span>Best Time</span>
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {customer.preferences.bestOpenTime}
                </div>
              </div>
            </div>
          </div>

          <ChevronRight className="text-gray-400" size={24} />
        </div>

        {/* Mobile Metrics */}
        <div className="md:hidden grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
          <div>
            <div className="text-xs text-gray-500 mb-1">Open Rate</div>
            <div className="text-lg font-bold text-gray-900">
              {Math.round(customer.behaviors.avgOpenRate * 100)}%
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Avg Cart</div>
            <div className="text-lg font-bold text-gray-900">
              ${Math.round(customer.behaviors.avgCartValue)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

