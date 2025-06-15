import { Config } from '@backstage/config';
import { Logger } from 'winston';
import { PluginDatabaseManager } from '@backstage/backend-common';

export type PluginEnvironment = {
  logger: Logger;
  database: PluginDatabaseManager;
  config: Config;
};