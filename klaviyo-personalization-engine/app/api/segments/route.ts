// ===== FILE: app/api/segments/route.ts =====
// API route to get auto-discovered segments

import { NextResponse } from 'next/server';
import { profilesApi } from '@/lib/klaviyo/client';
import { discoverSegments } from '@/lib/klaviyo/segments';
import { CustomerProfile } from '@/types';

interface KlaviyoProfile {
  id: string;
  attributes: {
    email: string;
    first_name?: string;
    last_name?: string;
  };
}

interface KlaviyoProfilesResponse {
  body: {
    data: KlaviyoProfile[];
  };
}

export async function GET() {
  try {
    // Check if API key is configured
    if (!profilesApi) {
      return NextResponse.json(
        { 
          segments: [],
          error: 'Klaviyo API key is not configured. Please set KLAVIYO_PRIVATE_API_KEY in your .env.local file.'
        },
        { status: 500 }
      );
    }

    // Fetch profiles from Klaviyo
    const response = await profilesApi.getProfiles() as KlaviyoProfilesResponse;
    
    // Check if response has data
    if (!response?.body?.data || !Array.isArray(response.body.data)) {
      return NextResponse.json({ segments: [] });
    }
    
    // Transform to CustomerProfile format
    const customers: CustomerProfile[] = response.body.data.map((profile: KlaviyoProfile) => ({
      id: profile.id,
      email: profile.attributes.email,
      firstName: profile.attributes.first_name,
      lastName: profile.attributes.last_name,
      healthScore: Math.random() * 10, // Calculate from actual metrics
      preferences: {
        bestOpenTime: "Monday 9am",
        subjectLineStyle: "urgency",
        contentFormat: "image-heavy",
        discountThreshold: Math.random() * 0.5
      },
      behaviors: {
        avgOpenRate: Math.random(),
        avgClickRate: Math.random() * 0.5,
        purchaseFrequency: Math.random() * 0.8,
        avgCartValue: Math.random() * 200
      }
    }));

    // If no customers, return empty segments
    if (customers.length === 0) {
      return NextResponse.json({ segments: [] });
    }

    // Discover segments
    const segments = discoverSegments(customers);

    return NextResponse.json({ segments: segments || [] });
  } catch (error) {
    console.error('Error fetching segments:', error);
    return NextResponse.json(
      { segments: [], error: 'Failed to fetch segments' },
      { status: 500 }
    );
  }
}

