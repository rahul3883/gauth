import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error', 'debug', 'verbose'],
  });
  const configService = app.get(ConfigService);
  await configService.complete();
  await app.listen(configService.port);
}
bootstrap();
