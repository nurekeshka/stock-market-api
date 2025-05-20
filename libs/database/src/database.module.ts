import { ConfigurationModule, env } from '@libs/configuration';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { createServer } from './in-memory.server';

export async function setup(
  config: ConfigService,
): Promise<MongooseModuleFactoryOptions> {
  switch (env) {
    case 'dev':
    case 'production': {
      return {
        uri: config.getOrThrow<string>('database.link'),
        appName: config.getOrThrow<string>('database.name'),
      };
    }

    case 'test': {
      const server = await createServer();
      return { uri: server.getUri() };
    }
  }
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
