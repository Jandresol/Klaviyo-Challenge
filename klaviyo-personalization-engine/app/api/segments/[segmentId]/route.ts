// ===== FILE: app/api/segments/[segmentId]/route.ts =====
// API route to get segment details with customers

import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  ctx: { params: Promise<{ segmentId: string }> }
) {
  try {
    const { segmentId } = await ctx.params;

    if (!segmentId) {
      return NextResponse.json({ error: "Missing segmentId" }, { status: 400 });
    }

    const segmentIndex = parseInt(segmentId.split("-")[1] ?? "0", 10);

    const segmentNames = [
      "The Deal Hunters",
      "The Browsers",
      "The Loyalists",
      "The Dormant",
      "The Occasionals",
    ];

    const segmentDescriptions = [
      "Only buy on sale, highly engaged with promotional content",
      "High engagement but low purchase rate",
      "Regular customers who buy at full price",
      "Low engagement, needs re-activation",
      "Moderate engagement and purchase patterns",
    ];

    const characteristics = [
      [
        "Only buy on sale (avg 30% off)",
        "Browse weekends, buy Mondays",
        "Best subject: 'Last Chance' + urgency",
        "High price sensitivity",
      ],
      [
        "High engagement but low purchase rate",
        "Love product details and comparisons",
        "Best time: Evenings (8-10pm)",
        "Need nurturing content",
      ],
      [
        "Regular full-price buyers",
        "Respond to new arrivals",
        "High lifetime value",
        "Brand advocates",
      ],
      [
        "Low engagement overall",
        "Need personalized re-engagement",
        "Risk of churn",
        "Win-back opportunities",
      ],
      [
        "Moderate engagement",
        "Occasional purchases",
        "Opportunity for growth",
        "Seasonal buyers",
      ],
    ];

    // Generate mock customers
    const customerCount = 15 + Math.floor(Math.random() * 20);
    const customers = Array.from({ length: customerCount }, (_, i) => ({
      id: `customer-${segmentIndex}-${i}`,
      email: `customer${i}@example.com`,
      firstName: [
        "Sarah",
        "Michael",
        "Lisa",
        "David",
        "Emma",
        "James",
        "Olivia",
        "William",
      ][i % 8],
      lastName: [
        "Johnson",
        "Smith",
        "Williams",
        "Brown",
        "Jones",
        "Garcia",
        "Miller",
        "Davis",
      ][i % 8],
      healthScore: segmentIndex === 3 ? Math.random() * 5 : 5 + Math.random() * 5,
      behaviors: {
        avgOpenRate: segmentIndex === 3 ? Math.random() * 0.3 : 0.4 + Math.random() * 0.5,
        avgClickRate: Math.random() * 0.4,
        purchaseFrequency: segmentIndex === 2 ? 0.5 + Math.random() * 0.4 : Math.random() * 0.6,
        avgCartValue: 30 + Math.random() * 170,
      },
      preferences: {
        bestOpenTime: [
          "Monday 9am",
          "Tuesday 2pm",
          "Wednesday 8pm",
          "Thursday 10am",
          "Friday 6pm",
        ][i % 5],
        subjectLineStyle: ["urgency", "curiosity", "personal"][i % 3],
        contentFormat: ["image-heavy", "text-heavy"][i % 2],
        discountThreshold: segmentIndex === 0 ? 0.2 + Math.random() * 0.3 : Math.random() * 0.2,
      },
    }));

    const avgHealth =
      customers.reduce((sum, c) => sum + c.healthScore, 0) / customers.length;

    const avgOpenRate =
      customers.reduce((sum, c) => sum + c.behaviors.avgOpenRate, 0) /
      customers.length;

    const segment = {
      id: segmentId,
      name: segmentNames[segmentIndex % segmentNames.length],
      description: segmentDescriptions[segmentIndex % segmentDescriptions.length],
      customerCount: customers.length,
      characteristics: characteristics[segmentIndex % characteristics.length],
      healthScore: Number(avgHealth.toFixed(1)),
      avgEngagement: Math.round(avgOpenRate * 100),
      bestSubjectLine: "Urgency + Discount",
      bestSendTime: "Monday 9am",
      customers,
    };

    return NextResponse.json({ segment });
  } catch (error) {
    console.error("Error fetching segment details:", error);
    return NextResponse.json(
      { error: "Failed to fetch segment details" },
      { status: 500 }
    );
  }
}
