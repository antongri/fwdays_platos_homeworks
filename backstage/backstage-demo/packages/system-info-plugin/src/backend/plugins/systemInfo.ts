import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const router = Router();

  router.get('/health', (_, response) => {
    response.json({
      version: process.version,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    });
  });

  return router;
}