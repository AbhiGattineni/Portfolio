/**
 * Verification endpoint to check if storage is configured correctly
 * GET /api/verify-storage
 * Useful for debugging production setup
 */

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const verification = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'unknown',
    storage: {
      type: 'Unknown',
      configured: false,
      details: {}
    },
    environmentVariables: {
      upstashRedis: {
        url: !!process.env.UPSTASH_REDIS_REST_URL,
        token: !!process.env.UPSTASH_REDIS_REST_TOKEN,
        configured: !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
      },
      vercelKV: {
        url: !!process.env.KV_REST_API_URL,
        token: !!process.env.KV_REST_API_TOKEN,
        configured: !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
      }
    },
    packages: {
      upstashRedis: false,
      vercelKV: false
    },
    recommendations: []
  };

  // Check which packages are available
  try {
    require.resolve('@upstash/redis');
    verification.packages.upstashRedis = true;
  } catch (e) {
    verification.recommendations.push('Install @upstash/redis: npm install @upstash/redis');
  }

  try {
    require.resolve('@vercel/kv');
    verification.packages.vercelKV = true;
  } catch (e) {
    // Not critical - only needed for legacy KV
  }

  // Determine storage type
  if (verification.environmentVariables.upstashRedis.configured) {
    verification.storage.type = 'Upstash Redis';
    verification.storage.configured = true;
    verification.storage.details = {
      method: 'Upstash Redis (Recommended)',
      persistent: true,
      status: 'Configured'
    };
  } else if (verification.environmentVariables.vercelKV.configured) {
    verification.storage.type = 'Vercel KV (Legacy)';
    verification.storage.configured = true;
    verification.storage.details = {
      method: 'Vercel KV (Deprecated)',
      persistent: true,
      status: 'Configured',
      note: 'Consider migrating to Upstash Redis'
    };
    verification.recommendations.push('Vercel KV is deprecated. Migrate to Upstash Redis.');
  } else {
    verification.storage.type = 'File System';
    verification.storage.configured = false;
    verification.storage.details = {
      method: 'File System (Fallback)',
      persistent: false,
      status: 'Not persistent - data lost on redeploy',
      note: 'Set up Upstash Redis for production persistence'
    };
    verification.recommendations.push('Set up Upstash Redis for persistent storage in production');
  }

  // Add setup instructions if not configured
  if (!verification.storage.configured) {
    verification.recommendations.push('Go to Vercel Dashboard → Integrations → Add Upstash Redis');
    verification.recommendations.push('Or manually add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables');
  }

  // Test actual storage if configured
  if (verification.storage.configured) {
    try {
      const { getQuestionStats } = await import('../../utils/questionLogger');
      const stats = await getQuestionStats();
      verification.storage.details.stats = stats;
      verification.storage.details.connectionTest = 'Success';
    } catch (error) {
      verification.storage.details.connectionTest = 'Failed';
      verification.storage.details.error = error.message;
      verification.recommendations.push('Storage configured but connection test failed. Check credentials.');
    }
  }

  const statusCode = verification.storage.configured ? 200 : 200; // Always 200, but show warnings

  return res.status(statusCode).json({
    success: verification.storage.configured,
    message: verification.storage.configured 
      ? 'Storage is properly configured!' 
      : 'Storage not configured - using file-based fallback',
    verification
  });
}

