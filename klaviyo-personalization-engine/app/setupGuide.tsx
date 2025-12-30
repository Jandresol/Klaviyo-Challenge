'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Check, Copy, ExternalLink } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  id: string;
  onCopy: (text: string, id: string) => void;
  copiedStates: Record<string, boolean>;
}

const CodeBlock = ({ code, id, onCopy, copiedStates }: CodeBlockProps) => (
  <div className="relative bg-gray-900 rounded-lg p-4 mt-2 mb-3">
    <button
      onClick={() => onCopy(code, id)}
      className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 transition-colors"
    >
      {copiedStates[id] ? <Check size={16} /> : <Copy size={16} />}
    </button>
    <pre className="text-sm text-gray-100 overflow-x-auto pr-12">
      <code>{code}</code>
    </pre>
  </div>
);

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  stepNumber: string;
  expandedSections: Record<string, boolean>;
  onToggle: (section: string) => void;
}

const Section = ({ id, title, children, stepNumber, expandedSections, onToggle }: SectionProps) => (
  <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
    <button
      onClick={() => onToggle(id)}
      className="w-full px-6 py-4 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-colors flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          {stepNumber}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {expandedSections[id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
    </button>
    {expandedSections[id] && (
      <div className="px-6 py-5 bg-white border-t border-gray-100">
        {children}
      </div>
    )}
  </div>
);

const SetupGuide = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    step5: false
  });

  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🎯 Klaviyo Hyper-Personalization Engine
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Winter Hackathon 2026 - Setup Guide
          </p>
          <p className="text-gray-500">
            AI-powered email personalization with automated segmentation & testing
          </p>
        </div>

        {/* Quick Overview */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">📋 Project Overview</h2>
          <p className="text-blue-800 mb-3">
            This project automatically discovers customer segments, learns individual preferences, 
            personalizes email content, and continuously improves through A/B testing.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-3 rounded">
              <div className="font-semibold text-gray-900">⏱️ Time Estimate</div>
              <div className="text-gray-600">10-20 hours</div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="font-semibold text-gray-900">🛠️ Tech Stack</div>
              <div className="text-gray-600">Next.js + Klaviyo API</div>
            </div>
          </div>
        </div>

        {/* Setup Steps */}
        <Section id="step1" title="Initialize Next.js Project" stepNumber="1" expandedSections={expandedSections} onToggle={toggleSection}>
          <p className="text-gray-700 mb-4">
            Create a new Next.js application with TypeScript and Tailwind CSS.
          </p>
          
          <CodeBlock
            id="create-nextjs"
            code="npx create-next-app@latest klaviyo-personalization-engine"
            onCopy={copyToClipboard}
            copiedStates={copiedStates}
          />
          
          <p className="text-gray-700 mb-2">When prompted, select:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
            <li>✅ TypeScript</li>
            <li>✅ ESLint</li>
            <li>✅ Tailwind CSS</li>
            <li>✅ App Router</li>
            <li>❌ src/ directory (optional)</li>
          </ul>

          <CodeBlock
            id="cd-project"
            code="cd klaviyo-personalization-engine"
            onCopy={copyToClipboard}
            copiedStates={copiedStates}
          />
        </Section>

        <Section id="step2" title="Install Dependencies" stepNumber="2" expandedSections={expandedSections} onToggle={toggleSection}>
          <p className="text-gray-700 mb-4">
            Install Klaviyo SDK and other required packages.
          </p>
          
          <CodeBlock
            id="install-deps"
            code={`npm install klaviyo-api axios
npm install -D @types/node`}
            onCopy={copyToClipboard}
            copiedStates={copiedStates}
          />

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4 rounded-r">
            <p className="text-yellow-800 text-sm">
              <strong>Note:</strong> The Klaviyo API SDK provides full TypeScript support and 
              handles authentication automatically.
            </p>
          </div>
        </Section>

        <Section id="step3" title="Configure Environment Variables" stepNumber="3" expandedSections={expandedSections} onToggle={toggleSection}>
          <p className="text-gray-700 mb-4">
            Set up your Klaviyo API credentials. You&apos;ll need a Private API Key.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-blue-900 mb-2">Getting Your API Key:</h4>
            <ol className="list-decimal pl-6 text-blue-800 space-y-2">
              <li>Go to <a href="https://www.klaviyo.com/settings/account/api-keys" target="_blank" rel="noopener noreferrer" className="underline inline-flex items-center gap-1">Klaviyo Settings → API Keys <ExternalLink size={14} /></a></li>
              <li>Click &quot;Create Private API Key&quot;</li>
              <li>Give it a name (e.g., &quot;Hackathon Project&quot;)</li>
              <li>Select scopes: Profiles (Read), Lists (Read), Campaigns (Read), Metrics (Read)</li>
              <li>Copy your API key</li>
            </ol>
          </div>

          <p className="text-gray-700 mb-2">Create <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> in your project root:</p>
          
          <CodeBlock
            id="env-file"
            code={`KLAVIYO_PRIVATE_API_KEY=your_private_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000`}
            onCopy={copyToClipboard}
            copiedStates={copiedStates}
          />

          <p className="text-gray-700 mt-3 text-sm">
            Add <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> to your <code className="bg-gray-100 px-2 py-1 rounded">.gitignore</code> (should already be there).
          </p>
        </Section>

        <Section id="step4" title="Create Project Structure" stepNumber="4" expandedSections={expandedSections} onToggle={toggleSection}>
          <p className="text-gray-700 mb-4">
            Set up the recommended folder structure for your application.
          </p>

          <CodeBlock
            id="mkdir-structure"
            code={`mkdir -p lib/klaviyo
mkdir -p app/api/segments
mkdir -p app/api/customers
mkdir -p app/api/personalize
mkdir -p app/dashboard
mkdir -p components/segments
mkdir -p components/customers
mkdir -p types`}
            onCopy={copyToClipboard}
            copiedStates={copiedStates}
          />

          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <h4 className="font-semibold text-gray-900 mb-3">📁 Project Structure:</h4>
            <pre className="text-sm text-gray-700 font-mono">
{`klaviyo-personalization-engine/
├── app/
│   ├── api/
│   │   ├── segments/route.ts      # Auto-discover segments
│   │   ├── customers/route.ts     # Customer profiles
│   │   └── personalize/route.ts   # Generate personalized content
│   ├── dashboard/
│   │   ├── page.tsx               # Main dashboard
│   │   └── [customerId]/page.tsx  # Individual customer view
│   └── page.tsx                   # Landing page
├── components/
│   ├── segments/
│   │   ├── SegmentCard.tsx        # Display segment info
│   │   └── SegmentList.tsx        # List all segments
│   └── customers/
│       ├── CustomerProfile.tsx    # Customer detail view
│       └── PersonalizationEngine.tsx
├── lib/
│   ├── klaviyo/
│   │   ├── client.ts              # Klaviyo API client
│   │   ├── segments.ts            # Segmentation logic
│   │   └── personalization.ts     # Personalization algorithms
│   └── utils.ts
├── types/
│   └── index.ts                   # TypeScript definitions
└── .env.local`}
            </pre>
          </div>
        </Section>

        <Section id="step5" title="Initialize Klaviyo Client" stepNumber="5" expandedSections={expandedSections} onToggle={toggleSection}>
          <p className="text-gray-700 mb-4">
            Create the Klaviyo API client that you&apos;ll use throughout your app.
          </p>

          <p className="text-gray-700 mb-2">Create <code className="bg-gray-100 px-2 py-1 rounded">lib/klaviyo/client.ts</code>:</p>
          
          <CodeBlock
            id="klaviyo-client"
            code={`import { ApiKeySession, ProfilesApi, MetricsApi, CampaignsApi } from 'klaviyo-api';

const session = new ApiKeySession(
  process.env.KLAVIYO_PRIVATE_API_KEY!
);

export const profilesApi = new ProfilesApi(session);
export const metricsApi = new MetricsApi(session);
export const campaignsApi = new CampaignsApi(session);

export default { profilesApi, metricsApi, campaignsApi };`}
            onCopy={copyToClipboard}
            copiedStates={copiedStates}
          />

          <p className="text-gray-700 mb-2 mt-4">Create <code className="bg-gray-100 px-2 py-1 rounded">types/index.ts</code>:</p>
          
          <CodeBlock
            id="types-file"
            code={`export interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  customerCount: number;
  characteristics: string[];
  healthScore: number;
  avgEngagement: number;
  bestSubjectLine: string;
  bestSendTime: string;
}

export interface CustomerProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  segment?: string;
  healthScore: number;
  preferences: {
    bestOpenTime: string;
    subjectLineStyle: string;
    contentFormat: string;
    discountThreshold: number;
  };
  behaviors: {
    avgOpenRate: number;
    avgClickRate: number;
    purchaseFrequency: number;
    avgCartValue: number;
  };
}

export interface PersonalizationRecommendation {
  customerId: string;
  subjectLine: string;
  sendTime: string;
  products: string[];
  confidence: number;
  expectedOpenRate: number;
  expectedConversion: number;
}`}
            onCopy={copyToClipboard}
            copiedStates={copiedStates}
          />
        </Section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">🚀 Next Steps</h2>
          <div className="space-y-2 text-gray-700">
            <p>✅ Your project is now initialized!</p>
            <p className="font-semibold mt-4">Continue with:</p>
            <ol className="list-decimal pl-6 space-y-2 mt-2">
              <li>Build the segmentation algorithm (clustering customers by behavior)</li>
              <li>Create API routes to fetch and analyze Klaviyo data</li>
              <li>Design the dashboard UI showing auto-discovered segments</li>
              <li>Implement the personalization engine</li>
              <li>Add A/B testing results visualization</li>
            </ol>
          </div>
          
          <div className="mt-6 pt-6 border-t border-green-200">
            <h3 className="font-semibold text-gray-900 mb-2">📚 Helpful Resources:</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://developers.klaviyo.com/en/docs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                  Klaviyo Developer Documentation <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a href="https://github.com/klaviyo/klaviyo-api-node" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                  Klaviyo Node.js SDK <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a href="https://developers.klaviyo.com/en/reference/api_overview" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                  API Reference <ExternalLink size={14} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg mt-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">💡 Pro Tips for the Hackathon</h3>
          <ul className="space-y-2 text-purple-800">
            <li>• Start with mock data if you don&apos;t have a Klaviyo account with real data</li>
            <li>• Focus on 2-3 core features that demonstrate the concept well</li>
            <li>• Make the UI visually appealing - first impressions matter</li>
            <li>• Document your algorithm/approach in the README</li>
            <li>• Record a demo video showing the key features</li>
            <li>• Deploy to Vercel for easy sharing (it&apos;s free!)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SetupGuide;