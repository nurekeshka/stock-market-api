import { ConfigurationModule } from '@libs/configuration';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export function setup(config: ConfigService): MongooseModuleFactoryOptions {
  return {
    uri: config.getOrThrow<string>('database.link'),
    appName: config.getOrThrow<string>('database.name'),
  };
}

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigService],
      useFactory: setup,
    }),
  ],
})
export class DatabaseModule {}
