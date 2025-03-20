import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bootstrap } from './bootstrap';
import * as notReallyCluster from 'node:cluster';
import * as os from 'node:os';

async function startServer() {
  const app = await NestFactory.create(AppModule);
  await bootstrap(app);
}

// TODO: fix this
const cluster = notReallyCluster as unknown as notReallyCluster.Cluster;

const maxWorkers = Number(process.env.NODE_CLUSTER_MAX_WORKERS ?? '1');
const numCPUs = os.cpus().length;
const numWorkers = Math.min(maxWorkers, numCPUs);

if (numWorkers === 1) {
  console.log('Only one worker requested, not using cluster mode');
}

if (numWorkers > 1 && cluster.isPrimary) {
  console.log(
    `Requested max workers: ${maxWorkers}, ${numCPUs} available, using ${numWorkers} workers`,
  );
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    console.error(`Worker ${worker.process.pid} exited with code ${code}`);
    console.log('Fork new worker!');
    cluster.fork();
  });
} else {
  void startServer();
  console.log(`Worker ${process.pid} started`);
}
