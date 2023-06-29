
import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, AllExceptionsFilter } from './common/validationPipe';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  );

  app.use(cookieParser());

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const options = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Phone Type')
  .setDescription('The API description')
  .setVersion('1.0')
  .build();
  

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT);

  process.on('SIGINT', function() {
    app.close().then(() => process.exit(0)).catch((err) => err && process.exit(1));
  });
}
bootstrap();
