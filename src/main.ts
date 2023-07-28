import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { components, paths, security } from 'doc/doc';

class Main {
  private port: number;
  constructor() {
    this.port = new ConfigService().get('PORT');
  }
  async bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('Home Library Service')
      .setDescription('Home music library service')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    document.components = components;
    document.security = security;
    document.paths = paths;
    SwaggerModule.setup('api', app, document);

    app.enableCors();
    await app.listen(this.port);
  }
}
new Main().bootstrap();
