import dotenv from 'dotenv';

dotenv.config(); // Load .env

export const config: {
  port: string | number;
  mongoUri: string;
  jwtSecret: string;
  jwtEXP: string;
} = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET ?? 'default_jwt_secret',
  jwtEXP: process.env.JWT_EXPIRES_IN ?? '1d',
};
