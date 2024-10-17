import { Server } from 'http';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';
import { RedisClient } from './shared/redis';

async function bootstrap() {
  await RedisClient.connect();

  const server: Server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    errorLogger.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    console.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

bootstrap();
