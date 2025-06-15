import { createPlugin, createApiFactory, createComponentExtension } from '@backstage/core-plugin-api';
import { systemInfoApiRef, SystemInfoClient } from './api';

export const systemInfoPlugin = createPlugin({
  id: 'system-info',
  apis: [
    createApiFactory({
      api: systemInfoApiRef,
      deps: {},
      factory: () => new SystemInfoClient(),
    }),
  ],
});

export const SystemInfoPage = systemInfoPlugin.provide(
  createComponentExtension({
    name: 'SystemInfoPage',
    component: {
      lazy: () => import('./components/SystemInfoPage').then(m => m.SystemInfoPage),
    },
  }),
);