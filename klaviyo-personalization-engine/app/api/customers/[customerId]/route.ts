// ===== FILE: app/api/customers/[customerId]/route.ts =====
// API route to get individual customer details

import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { customerId: string } }
) {
  try {
    const customerId = params.customerId;
    
    // Parse segment and customer index from ID
    const parts = customerId.split('-');
    const segmentIndex = parseInt(parts[1] || '0');
    const customerIndex = parseInt(parts[2] || '0');

    const segments = ["Deal Hunters", "Browsers", "Loyalists", "Dormant", "Occasionals"];
    const firstNames = ['Sarah', 'Michael', 'Lisa', 'David', 'Emma', 'James', 'Olivia', 'William'];
    const lastNames = ['Johnson', 'Smith', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];

    const customer = {
      id: customerId,
      email: `customer${customerIndex}@example.com`,
      firstName: firstNames[customerIndex % firstNames.length],
      lastName: lastNames[customerIndex % lastNames.length],
      segment: segments[segmentIndex % segments.length],
      healthScore: segmentIndex === 3 ? 3 + Math.random() * 3 : 6 + Math.random() * 4,
      joinedDate: '2023-03-15',
      lastPurchaseDate: '2024-12-10',
      totalPurchases: 5 + Math.floor(Math.random() * 20),
      lifetimeValue: 500 + Math.floor(Math.random() * 2500),
      behaviors: {
        avgOpenRate: segmentIndex === 3 ? Math.random() * 0.3 : 0.5 + Math.random() * 0.4,
        avgClickRate: 0.2 + Math.random() * 0.3,
        purchaseFrequency: segmentIndex === 2 ? 0.6 + Math.random() * 0.3 : 0.2 + Math.random() * 0.5,
        avgCartValue: 40 + Math.random() * 160,
        lastOpenedDate: '2024-12-26',
        lastClickedDate: '2024-12-23'
      },
      preferences: {
        bestOpenTime: 'Monday 6:30am',
        subjectLineStyle: ['urgency', 'curiosity', 'personal'][segmentIndex % 3],
        contentFormat: ['image-heavy', 'text-heavy'][customerIndex % 2],
        discountThreshold: segmentIndex === 0 ? 0.25 + Math.random() * 0.2 : Math.random() * 0.2
      },
      contentPreferences: {
        works: [
          'Short subject lines with urgency',
          'Big product images with clear pricing',
          'Countdown timers',
          'Personalized product recommendations'
        ],
        ignores: [
          'Long paragraphs of text',
          'Lifestyle content without products',
          '"New arrivals" (unless on sale)',
          'Generic mass emails'
        ]
      },
      nextBestAction: {
        recommendation: 'Send flash sale email Monday 6:30am',
        confidence: 85 + Math.floor(Math.random() * 10),
        expectedOpenRate: 70 + Math.floor(Math.random() * 15),
        expectedConversion: 30 + Math.floor(Math.random() * 15)
      }
    };

    return NextResponse.json({ customer });
  } catch (error) {
    console.error('Error fetching customer details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customer details' },
      { status: 500 }
    );
  }
}