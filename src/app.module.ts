import { ConfigurationModule } from '@libs/configuration';
import { DatabaseModule } from '@libs/database';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, ConfigurationModule],
})
export class AppModule {}
