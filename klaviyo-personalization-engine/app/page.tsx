// app/page.tsx
// Landing page for the Klaviyo Hyper-Personalization Engine

import Link from 'next/link';
import { ArrowRight, Target, Brain, Zap, TrendingUp, Users, Mail } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Zap size={16} />
            Klaviyo Winter Hackathon 2026
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Hyper-Personalization
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Engine
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AI-powered email marketing that automatically discovers customer segments, 
            learns individual preferences, and continuously optimizes campaigns.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              View Dashboard
              <ArrowRight size={20} />
            </Link>
            
            <button className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-gray-200">
              Watch Demo
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <FeatureCard
            icon={<Users className="text-blue-600" size={32} />}
            title="Auto-Discovered Segments"
            description="Machine learning automatically groups customers by behavior patterns—no manual segmentation needed."
          />
          
          <FeatureCard
            icon={<Brain className="text-purple-600" size={32} />}
            title="Individual Learning"
            description="Tracks what works for each customer: best send times, subject lines, content preferences, and more."
          />
          
          <FeatureCard
            icon={<Mail className="text-green-600" size={32} />}
            title="Smart Personalization"
            description="Generates personalized content per recipient based on their unique preferences and behaviors."
          />
          
          <FeatureCard
            icon={<Zap className="text-yellow-600" size={32} />}
            title="Automated A/B Testing"
            description="Continuously tests variations and learns what performs best for each segment."
          />
          
          <FeatureCard
            icon={<TrendingUp className="text-red-600" size={32} />}
            title="Profile Health Monitoring"
            description="Real-time engagement tracking with actionable insights on at-risk customers."
          />
          
          <FeatureCard
            icon={<Target className="text-indigo-600" size={32} />}
            title="Smart Recommendations"
            description="AI-powered suggestions for optimal campaigns, timing, and content strategies."
          />
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          
          <div className="space-y-6">
            <Step
              number="1"
              title="Analyze Behavior"
              description="System analyzes purchase patterns, engagement metrics, and response data from your Klaviyo account."
            />
            
            <Step
              number="2"
              title="Discover Segments"
              description="Machine learning automatically groups customers into segments like 'Deal Hunters', 'Loyalists', and 'Browsers'."
            />
            
            <Step
              number="3"
              title="Learn Preferences"
              description="For each customer, track their best send times, subject line preferences, content format, and discount thresholds."
            />
            
            <Step
              number="4"
              title="Personalize Content"
              description="Generate custom emails tailored to each recipient's preferences—different subject lines, products, and send times."
            />
            
            <Step
              number="5"
              title="Test & Optimize"
              description="Continuously A/B test variations and apply learnings to future campaigns for constant improvement."
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">
            The Power of Hyper-Personalization
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-bold mb-2">2.5x</div>
              <div className="text-blue-100">Higher Open Rates</div>
            </div>
            
            <div>
              <div className="text-5xl font-bold mb-2">3.2x</div>
              <div className="text-blue-100">Better Conversions</div>
            </div>
            
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Automated</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl shadow-xl p-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Ready to See It in Action?
          </h2>
          <p className="text-gray-600 mb-8">
            Explore the dashboard to see auto-discovered segments, individual customer 
            profiles, and personalized campaign recommendations.
          </p>
          
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            Launch Dashboard
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>Built for Klaviyo Winter Hackathon 2026</p>
          <p className="mt-2">Powered by Klaviyo API • Next.js • Machine Learning</p>
        </div>
      </div>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// Step Component
function Step({ 
  number, 
  title, 
  description 
}: { 
  number: string; 
  title: string; 
  description: string;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}