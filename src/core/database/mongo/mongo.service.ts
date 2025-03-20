/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class MongoService implements OnModuleInit, OnModuleDestroy {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    // console.log('Connected to MongoDB');
  }

  async onModuleDestroy() {
    await this.connection.close();
    // console.log('Disconnected from MongoDB');
  }

  getConnection(): Connection {
    return this.connection;
  }
}
