import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { components, paths, security } from 'doc/doc';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

class Main {
  private port: number;
  constructor() {
    this.port = new ConfigService().get('PORT');
  }
  async bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    // app.useGlobalInterceptors(
    //   new ClassSerializerInterceptor(app.get(Reflector)),
    // );

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
