import http from 'node:http';

import express from '@/common/express';
import logger from '@/common/logger';
import mongodb from '@/common/mongodb';

const PORT = process.env.SERVER_PORT || 8080;
const server = http.createServer(express);

startServer();

async function startServer() {
  try {
    validateEnv();

    await new Promise((resolve, reject) => {
      mongodb.once('open', () => {
        logger.info('MongoDB connected successfully');
        resolve();
      });

      mongodb.once('error', (error) => {
        reject(new Error(`MongoDB connection error: ${error.message}`));
      });
    });

    await new Promise((resolve) => {
      server.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
        resolve();
      });
    });

    setupGracefulShutdown();
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

function validateEnv() {
  const required = ['MONGODB_HOST', 'MONGODB_PORT', 'MONGODB_DATABASE'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

function setupGracefulShutdown() {
  const signals = ['SIGTERM', 'SIGINT'];

  signals.forEach((signal) => {
    process.on(signal, async () => {
      try {
        await new Promise((resolve) => {
          server.close(resolve);
        });
        logger.info('HTTP server closed');

        await mongodb.close();
        logger.info('MongoDB connection closed');

        process.exit(0);
      } catch (error) {
        logger.error('Error during graceful shutdown:', error);
        process.exit(1);
      }
    });
  });
}
