// ===== FILE: app/dashboard/customers/[customerId]/page.tsx =====
// Individual customer profile with personalization insights

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Mail,
  TrendingUp,
  Clock,
  DollarSign,
  Target,
  Activity,
  Sparkles,
  CheckCircle,
  XCircle,
  Calendar,
  ShoppingCart,
  Eye,
  MousePointer
} from 'lucide-react';

interface CustomerProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  segment: string;
  healthScore: number;
  joinedDate: string;
  lastPurchaseDate: string;
  totalPurchases: number;
  lifetimeValue: number;
  behaviors: {
    avgOpenRate: number;
    avgClickRate: number;
    purchaseFrequency: number;
    avgCartValue: number;
    lastOpenedDate: string;
    lastClickedDate: string;
  };
  preferences: {
    bestOpenTime: string;
    subjectLineStyle: string;
    contentFormat: string;
    discountThreshold: number;
  };
  contentPreferences: {
    works: string[];
    ignores: string[];
  };
  nextBestAction: {
    recommendation: string;
    confidence: number;
    expectedOpenRate: number;
    expectedConversion: number;
  };
}

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params.customerId as string;
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/customers/${customerId}`)
      .then(res => res.json())
      .then(data => {
        setCustomer(data.customer);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, [customerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading customer profile...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-medium">Customer not found</p>
        </div>
      </div>
    );
  }

  const displayName = customer.firstName && customer.lastName
    ? `${customer.firstName} ${customer.lastName}`
    : customer.firstName || customer.email.split('@')[0];

  const getHealthColor = (score: number) => {
    if (score >= 7) return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' };
    if (score >= 5) return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' };
    return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' };
  };

  const healthColor = getHealthColor(customer.healthScore);

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
            <div className="flex items-center gap-4 flex-1">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
                <p className="text-sm text-gray-500">{customer.email}</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center gap-2">
              <Mail size={18} />
              Send Personalized Email
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Profile Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className={`${healthColor.bg} border-2 ${healthColor.border} rounded-xl p-6 text-center`}>
            <Activity size={32} className={`mx-auto mb-2 ${healthColor.text}`} />
            <div className={`text-4xl font-bold mb-1 ${healthColor.text}`}>
              {customer.healthScore.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600 font-medium">Health Score</div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center shadow-lg">
            <ShoppingCart size={32} className="mx-auto mb-2 text-purple-600" />
            <div className="text-4xl font-bold text-gray-900 mb-1">
              {customer.totalPurchases}
            </div>
            <div className="text-sm text-gray-600 font-medium">Total Purchases</div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center shadow-lg">
            <DollarSign size={32} className="mx-auto mb-2 text-green-600" />
            <div className="text-4xl font-bold text-gray-900 mb-1">
              ${customer.lifetimeValue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 font-medium">Lifetime Value</div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center shadow-lg">
            <Target size={32} className="mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {customer.segment}
            </div>
            <div className="text-sm text-gray-600 font-medium">Segment</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Behavioral Patterns */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="text-blue-600" size={24} />
                Behavioral Patterns
              </h2>
              <div className="space-y-4">
                <MetricRow
                  icon={<Eye size={18} className="text-green-600" />}
                  label="Avg Open Rate"
                  value={`${Math.round(customer.behaviors.avgOpenRate * 100)}%`}
                  bar={customer.behaviors.avgOpenRate}
                  barColor="bg-green-500"
                />
                <MetricRow
                  icon={<MousePointer size={18} className="text-blue-600" />}
                  label="Avg Click Rate"
                  value={`${Math.round(customer.behaviors.avgClickRate * 100)}%`}
                  bar={customer.behaviors.avgClickRate}
                  barColor="bg-blue-500"
                />
                <MetricRow
                  icon={<ShoppingCart size={18} className="text-purple-600" />}
                  label="Purchase Frequency"
                  value={`${Math.round(customer.behaviors.purchaseFrequency * 100)}%`}
                  bar={customer.behaviors.purchaseFrequency}
                  barColor="bg-purple-500"
                />
                <MetricRow
                  icon={<DollarSign size={18} className="text-yellow-600" />}
                  label="Avg Cart Value"
                  value={`$${Math.round(customer.behaviors.avgCartValue)}`}
                  bar={customer.behaviors.avgCartValue / 200}
                  barColor="bg-yellow-500"
                />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Opened Email:</span>
                  <span className="font-semibold text-gray-900">{customer.behaviors.lastOpenedDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Clicked:</span>
                  <span className="font-semibold text-gray-900">{customer.behaviors.lastClickedDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Purchase:</span>
                  <span className="font-semibold text-gray-900">{customer.lastPurchaseDate}</span>
                </div>
              </div>
            </div>

            {/* Personalization Profile */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="text-purple-600" size={24} />
                Personalization Profile
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Clock size={16} />
                    <span>Best Open Time</span>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                    <span className="text-lg font-bold text-blue-900">
                      {customer.preferences.bestOpenTime}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Mail size={16} />
                    <span>Subject Line Style</span>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-3">
                    <span className="text-lg font-bold text-purple-900 capitalize">
                      {customer.preferences.subjectLineStyle}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Target size={16} />
                    <span>Content Format</span>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                    <span className="text-lg font-bold text-green-900 capitalize">
                      {customer.preferences.contentFormat}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <DollarSign size={16} />
                    <span>Discount Threshold</span>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-3">
                    <span className="text-lg font-bold text-orange-900">
                      {Math.round(customer.preferences.discountThreshold * 100)}% off triggers purchase
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Content Preferences */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                📧 Content Preferences
              </h2>
              <p className="text-sm text-gray-600 mb-4">Learned from A/B tests</p>

              <div className="mb-6">
                <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                  <CheckCircle size={18} />
                  What Works
                </h3>
                <div className="space-y-2">
                  {customer.contentPreferences.works.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 bg-green-50 rounded-lg p-3 border border-green-200">
                      <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                  <XCircle size={18} />
                  What to Avoid
                </h3>
                <div className="space-y-2">
                  {customer.contentPreferences.ignores.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 bg-red-50 rounded-lg p-3 border border-red-200">
                      <XCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Best Action */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles size={24} />
                Next Best Action
              </h2>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
                <div className="text-sm text-blue-100 mb-2">Recommendation</div>
                <div className="text-lg font-semibold">
                  {customer.nextBestAction.recommendation}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold mb-1">
                    {customer.nextBestAction.confidence}%
                  </div>
                  <div className="text-xs text-blue-100">Confidence</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold mb-1">
                    {customer.nextBestAction.expectedOpenRate}%
                  </div>
                  <div className="text-xs text-blue-100">Exp. Open</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold mb-1">
                    {customer.nextBestAction.expectedConversion}%
                  </div>
                  <div className="text-xs text-blue-100">Exp. Conv.</div>
                </div>
              </div>

              <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                <Mail size={18} />
                Generate Personalized Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricRow({ 
  icon, 
  label, 
  value, 
  bar, 
  barColor 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  bar: number;
  barColor: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          {icon}
          <span>{label}</span>
        </div>
        <span className="font-bold text-gray-900">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${barColor} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(bar * 100, 100)}%` }}
        ></div>
      </div>
    </div>
  );
}

