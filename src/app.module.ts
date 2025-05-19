import { ConfigurationModule } from '@libs/configuration';
import { DatabaseModule } from '@libs/database';
import { Module } from '@nestjs/common';
import { modules } from './modules';

@Module({
  imports: [DatabaseModule, ConfigurationModule, ...modules],
})
export class AppModule {}
