export interface CustomerSegment {
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
  }