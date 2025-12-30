import { ApiKeySession, ProfilesApi, MetricsApi, CampaignsApi } from 'klaviyo-api';

const session = new ApiKeySession(
  process.env.KLAVIYO_PRIVATE_API_KEY!
);

export const profilesApi = new ProfilesApi(session);
export const metricsApi = new MetricsApi(session);
export const campaignsApi = new CampaignsApi(session);

export default { profilesApi, metricsApi, campaignsApi };