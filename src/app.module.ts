import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './ormconfig';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminModule } from './components/admin/admin.module';
import { UsersModule } from './components/users/users.module';
import { AuthModule } from './components/auth/auth.module';
import { ProfilesModule } from './components/profiles/profiles.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import * as path from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { MailerModule, HandlebarsAdapter } from '@nest-modules/mailer';
import config from './config';
import { LangMiddleware } from './common/middlewares/langMiddleware.middleware';
import { LogMiddleware } from './common/middlewares/logMiddleware.middleware';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    TypeOrmModule.forRoot(ormconfig),
    ScheduleModule.forRoot(),
    UsersModule,
    ProfilesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MulterModule.register({
      dest: './files/upload',
    }),
    MailerModule.forRootAsync({
      useFactory: async() => ({
        transport: {
          host: config.MAIL_HOST,
          secure: false,
          auth: {
            user: config.MAIL_USER,
            pass: config.MAIL_PASSWORD,
          },
        },
        defaults: {
          from: `"HAPO CRM" <${config.MAIL_USER}>`,
        },
        template: {
          dir: join(__dirname, 'components/mail/templates/'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      })
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LangMiddleware(), LogMiddleware())
      .forRoutes("*")
  }
}
