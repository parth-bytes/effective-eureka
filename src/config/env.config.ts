import { config } from 'dotenv';
config();

export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5010,
  environment: process.env.NODE_ENV || 'development',
});
