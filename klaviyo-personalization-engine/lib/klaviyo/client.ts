import { ApiKeySession, ProfilesApi, MetricsApi, CampaignsApi } from 'klaviyo-api';

// Get API key from environment variables
const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;

if (!apiKey) {
  console.error('⚠️  KLAVIYO_PRIVATE_API_KEY is not set in environment variables!');
  console.error('Please create a .env.local file in the root directory with:');
  console.error('KLAVIYO_PRIVATE_API_KEY=your_api_key_here');
}

// Create session only if API key exists
const session = apiKey ? new ApiKeySession(apiKey) : null;

// Export APIs - they will be null if API key is missing
export const profilesApi = session ? new ProfilesApi(session) : null;
export const metricsApi = session ? new MetricsApi(session) : null;
export const campaignsApi = session ? new CampaignsApi(session) : null;

const klaviyoClient = { profilesApi, metricsApi, campaignsApi };
export default klaviyoClient;