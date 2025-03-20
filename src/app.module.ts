import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './core/database/mongo/mongo.module';
import databaseConfig from './config/database.config';
import envConfig from './config/env.config';
// import { AuthModule } from './api/v1/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig, databaseConfig],
      isGlobal: true,
    }),
    MongoModule,
    //  AuthModule
  ],
})
export class AppModule {}
