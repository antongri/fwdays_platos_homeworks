import { createApiRef } from '@backstage/core-plugin-api';

export interface SystemInfo {
  version: string;
  uptime: number;
  memory: {
    total: number;
    free: number;
  };
}

export const systemInfoApiRef = createApiRef<SystemInfoClient>({
  id: 'plugin.systeminfo.service',
});

export class SystemInfoClient {
  async getSystemInfo(): Promise<SystemInfo> {
    const response = await fetch('/api/system-info');
    return response.json();
  }
}