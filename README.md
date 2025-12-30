// ===== FILE: README.md =====
# Klaviyo Hyper-Personalization Engine

AI-powered email personalization with automated segmentation and continuous learning.

## Features

- 🎯 **Auto-Discovered Segments**: Automatically groups customers by behavior patterns
- 🧠 **Individual Preference Learning**: Tracks what works for each customer
- 📧 **Personalized Content Generation**: Creates custom emails per recipient
- 🧪 **Automated A/B Testing**: Continuously learns and improves
- 💡 **Smart Recommendations**: Suggests optimal campaigns

## Setup

1. Clone and install:
\`\`\`bash
npm install
\`\`\`

2. Configure environment:
\`\`\`bash
cp .env.example .env.local
# Add your KLAVIYO_PRIVATE_API_KEY
\`\`\`

3. Run development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open http://localhost:3000

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Klaviyo API SDK

## Project Structure

- `/app` - Next.js pages and API routes
- `/lib/klaviyo` - Klaviyo integration and algorithms
- `/components` - React components
- `/types` - TypeScript definitions

## Algorithm Overview

The segmentation uses k-means clustering on behavioral features:
- Open rate
- Click rate
- Purchase frequency
- Discount sensitivity
- Average cart value

Each segment is then characterized and personalization rules are learned from historical performance.

## License

MIT