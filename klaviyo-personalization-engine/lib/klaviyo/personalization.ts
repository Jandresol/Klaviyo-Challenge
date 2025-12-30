// ===== FILE: lib/klaviyo/personalization.ts =====
// Personalization engine - generate custom content per customer

import { CustomerProfile, PersonalizationRecommendation } from '@/types';

export function generatePersonalizedRecommendation(
  customer: CustomerProfile
): PersonalizationRecommendation {
  const subjectLine = generateSubjectLine(customer);
  const sendTime = customer.preferences.bestOpenTime;
  const products = selectProducts(customer);
  const confidence = calculateConfidence(customer);
  const expectedOpenRate = predictOpenRate(customer);
  const expectedConversion = predictConversion(customer);

  return {
    customerId: customer.id,
    subjectLine,
    sendTime,
    products,
    confidence,
    expectedOpenRate,
    expectedConversion
  };
}

function generateSubjectLine(customer: CustomerProfile): string {
  const style = customer.preferences.subjectLineStyle;
  const name = customer.firstName || '';
  const discount = Math.round(customer.preferences.discountThreshold * 100);

  const templates = {
    urgency: [
      `${name}, ${discount}% off ends tonight`,
      `Last chance: Your favorites on sale`,
      `Flash sale just for you 🔥`
    ],
    curiosity: [
      `${name}, you won't believe this...`,
      `Something special inside`,
      `Your personalized picks are here`
    ],
    personal: [
      `${name}, we picked these for you`,
      `Recommended just for ${name}`,
      `Your wishlist items are on sale`
    ]
  };

  const options = templates[style as keyof typeof templates] || templates.urgency;
  return options[Math.floor(Math.random() * options.length)];
}

function selectProducts(customer: CustomerProfile): string[] {
  // In real implementation, use browsing history and ML recommendations
  return ['Product A', 'Product B', 'Product C'];
}

function calculateConfidence(customer: CustomerProfile): number {
  // Based on data quality and historical accuracy
  const dataQuality = customer.behaviors.avgOpenRate > 0 ? 0.8 : 0.4;
  const historyLength = 0.9; // Would be based on actual history
  return Math.round((dataQuality + historyLength) / 2 * 100);
}

function predictOpenRate(customer: CustomerProfile): number {
  // Simple prediction based on historical performance
  const base = customer.behaviors.avgOpenRate;
  const boost = customer.healthScore > 7 ? 0.1 : 0;
  return Math.min(Math.round((base + boost) * 100), 95);
}

function predictConversion(customer: CustomerProfile): number {
  // Based on click-to-purchase ratio
  const base = customer.behaviors.avgClickRate * 0.5;
  return Math.round(base * 100);
}

