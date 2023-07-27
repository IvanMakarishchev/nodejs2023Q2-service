import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

class Main {
  private port: number;
  constructor() {
    this.port = new ConfigService().get('PORT');
  }
  async bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(this.port);
  }
}
new Main().bootstrap();
