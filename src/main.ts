import { CommonService } from '@libs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  CommonService.setup(app);
  await app.listen(process.env.PORT ?? 8080);
}

void bootstrap();
