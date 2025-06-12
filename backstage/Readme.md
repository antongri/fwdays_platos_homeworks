# Homework: Creating a Backstage Plugin

## **Objective**
In this assignment, you will:
1. Install and configure **Backstage** locally
2. Create a custom plugin that displays system information
3. Integrate the plugin into your Backstage instance
4. Add a custom API endpoint

---

## **Part 1: Installation & Configuration**

### **Step 1: Install Required Tools**
Ensure you have the following installed:
- **Node.js (v18+)**
- **Yarn**
- **Docker** (for running PostgreSQL)

#### **1. Install Backstage CLI**
```sh
npm install -g @backstage/cli
```

#### **2. Create a New Backstage Instance**
```sh
npx create-backstage-app@latest my-backstage
cd my-backstage
```

#### **3. Start Backstage**
```sh
yarn install
yarn dev
```

---

## **Part 2: Create a Custom Plugin**

### **Step 1: Create Plugin Directory**
```sh
cd packages
mkdir system-info-plugin
cd system-info-plugin
```

### **Step 2: Initialize Plugin**
```sh
yarn init -y
yarn add @backstage/core-components @backstage/core-plugin-api
```

### **Step 3: Create Plugin Files**
Create `src/plugin.ts`:
```typescript
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
```

Create `src/api.ts`:
```typescript
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
```

---

## **Part 3: Create Backend API**

### **Step 1: Create API Handler**
Create `src/backend/plugins/systemInfo.ts`:
```typescript
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
```

---

## **Part 4: Integration**

### **Step 1: Register Plugin**
Add to `app-config.yaml`:
```yaml
app:
  title: My Backstage
  baseUrl: http://localhost:3000

backend:
  baseUrl: http://localhost:7007
  listen:
    port: 7007

plugins:
  system-info:
    enabled: true
```

### **Step 2: Add to Sidebar**
Modify `packages/app/src/components/Root/Root.tsx`:
```typescript
import { SystemInfoPage } from '@internal/system-info-plugin';

// Add to sidebar items
{
  icon: <InfoIcon />,
  text: 'System Info',
  route: '/system-info',
}
```

---

## **Part 5: Testing**
1. Start your Backstage instance
2. Navigate to http://localhost:3000/system-info
3. Verify that the system information is displayed
4. Test the API endpoint at http://localhost:7007/api/system-info/health
