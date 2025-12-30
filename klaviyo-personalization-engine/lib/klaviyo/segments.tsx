// ===== FILE: lib/klaviyo/segments.ts =====
// Segmentation algorithm - automatically discover customer groups

import { CustomerProfile, CustomerSegment } from '@/types';

interface BehaviorFeatures {
  customerId: string;
  openRate: number;
  clickRate: number;
  purchaseFrequency: number;
  discountSensitivity: number;
  avgCartValue: number;
}

interface ClusterSegment {
  centroid: BehaviorFeatures;
  members: BehaviorFeatures[];
}

export function discoverSegments(customers: CustomerProfile[]): CustomerSegment[] {
  // Extract behavioral features
  const features = customers.map(c => ({
    customerId: c.id,
    openRate: c.behaviors.avgOpenRate,
    clickRate: c.behaviors.avgClickRate,
    purchaseFrequency: c.behaviors.purchaseFrequency,
    discountSensitivity: c.preferences.discountThreshold,
    avgCartValue: c.behaviors.avgCartValue
  }));

  // Simple k-means clustering (you can use a library like ml-kmeans)
  const k = 5; // Number of segments
  const segments = kMeansClustering(features, k);

  // Label and characterize each segment
  return segments.map((segment, index) => {
    const characteristics = analyzeSegmentCharacteristics(segment, customers);
    return {
      id: `segment-${index}`,
      name: characteristics.name,
      description: characteristics.description,
      customerCount: segment.members.length,
      characteristics: characteristics.traits,
      healthScore: calculateHealthScore(segment, customers),
      avgEngagement: calculateAvgEngagement(segment, customers),
      bestSubjectLine: determineBestSubjectLine(),
      bestSendTime: determineBestSendTime(segment, customers)
    };
  });
}

function kMeansClustering(features: BehaviorFeatures[], k: number): ClusterSegment[] {
  // Simplified k-means - in production use ml-kmeans or similar
  // Initialize centroids randomly
  const initialCentroids = features.slice(0, k);
  let centroids: BehaviorFeatures[] = initialCentroids.map(c => ({ ...c }));
  const assignments: number[] = new Array(features.length).fill(0);
  let changed = true;
  let iterations = 0;
  const maxIterations = 100;

  while (changed && iterations < maxIterations) {
    changed = false;
    iterations++;

    // Assignment step
    for (let i = 0; i < features.length; i++) {
      const distances = centroids.map(c => euclideanDistance(features[i], c));
      const newAssignment = distances.indexOf(Math.min(...distances));
      if (newAssignment !== assignments[i]) {
        assignments[i] = newAssignment;
        changed = true;
      }
    }

    // Update step - create new centroids array
    const newCentroids: BehaviorFeatures[] = [];
    for (let j = 0; j < k; j++) {
      const clusterPoints = features.filter((_, i) => assignments[i] === j);
      if (clusterPoints.length > 0) {
        newCentroids[j] = {
          customerId: '',
          openRate: average(clusterPoints.map(p => p.openRate)),
          clickRate: average(clusterPoints.map(p => p.clickRate)),
          purchaseFrequency: average(clusterPoints.map(p => p.purchaseFrequency)),
          discountSensitivity: average(clusterPoints.map(p => p.discountSensitivity)),
          avgCartValue: average(clusterPoints.map(p => p.avgCartValue))
        };
      } else {
        newCentroids[j] = centroids[j];
      }
    }
    centroids = newCentroids;
  }

  // Group customers by cluster
  return centroids.map((_, j) => ({
    centroid: centroids[j],
    members: features.filter((_, i) => assignments[i] === j)
  }));
}

function euclideanDistance(a: BehaviorFeatures, b: BehaviorFeatures): number {
  return Math.sqrt(
    Math.pow(a.openRate - b.openRate, 2) +
    Math.pow(a.clickRate - b.clickRate, 2) +
    Math.pow(a.purchaseFrequency - b.purchaseFrequency, 2) +
    Math.pow(a.discountSensitivity - b.discountSensitivity, 2) +
    Math.pow(a.avgCartValue - b.avgCartValue, 2)
  );
}

function average(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function analyzeSegmentCharacteristics(segment: ClusterSegment, customers: CustomerProfile[]) {
  const members = customers.filter(c => 
    segment.members.some((m: BehaviorFeatures) => m.customerId === c.id)
  );

  const avgOpenRate = average(members.map(m => m.behaviors.avgOpenRate));
  const avgPurchaseFreq = average(members.map(m => m.behaviors.purchaseFrequency));
  const avgDiscount = average(members.map(m => m.preferences.discountThreshold));

  // Characterize based on patterns
  if (avgDiscount > 0.2 && avgOpenRate > 0.6) {
    return {
      name: "The Deal Hunters",
      description: "Only buy on sale, highly engaged with promotional content",
      traits: [
        `Only buy on sale (avg ${Math.round(avgDiscount * 100)}% off)`,
        "Browse weekends, buy Mondays",
        "Best subject: 'Last Chance' + urgency"
      ]
    };
  } else if (avgOpenRate > 0.7 && avgPurchaseFreq < 0.3) {
    return {
      name: "The Browsers",
      description: "High engagement but low purchase rate",
      traits: [
        "High engagement but low purchase rate",
        "Love product details, comparisons",
        "Best time: Evenings (8-10pm)"
      ]
    };
  } else if (avgPurchaseFreq > 0.5) {
    return {
      name: "The Loyalists",
      description: "Regular customers who buy at full price",
      traits: [
        "Regular full-price buyers",
        "Respond to new arrivals",
        "High lifetime value"
      ]
    };
  } else if (avgOpenRate < 0.3) {
    return {
      name: "The Dormant",
      description: "Low engagement, needs re-activation",
      traits: [
        "Low engagement overall",
        "Need personalized re-engagement",
        "Risk of churn"
      ]
    };
  } else {
    return {
      name: "The Occasionals",
      description: "Moderate engagement and purchase patterns",
      traits: [
        "Moderate engagement",
        "Occasional purchases",
        "Opportunity for growth"
      ]
    };
  }
}

function calculateHealthScore(segment: ClusterSegment, customers: CustomerProfile[]): number {
  const members = customers.filter(c => 
    segment.members.some((m: BehaviorFeatures) => m.customerId === c.id)
  );
  return Math.round(average(members.map(m => m.healthScore)) * 10) / 10;
}

function calculateAvgEngagement(segment: ClusterSegment, customers: CustomerProfile[]): number {
  const members = customers.filter(c => 
    segment.members.some((m: BehaviorFeatures) => m.customerId === c.id)
  );
  return Math.round(average(members.map(m => m.behaviors.avgOpenRate)) * 100);
}

function determineBestSubjectLine(): string {
  // In real implementation, analyze historical performance
  return "Urgency + Discount";
}

function determineBestSendTime(segment: ClusterSegment, customers: CustomerProfile[]): string {
  const members = customers.filter(c => 
    segment.members.some((m: BehaviorFeatures) => m.customerId === c.id)
  );
  // Return most common send time preference
  return members[0]?.preferences.bestOpenTime || "Monday 9am";
}

