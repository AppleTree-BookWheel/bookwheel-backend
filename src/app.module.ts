import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { ClsModule } from 'nestjs-cls';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { PrismaService } from '../prisma/prisma.service';
import { SurveyModule } from './api/survey/survey.module';
import { UserModule } from './api/user/user.module';
import { LoginTokenModule } from './api/login-token/login-token.module';
import { AuthModule } from './api/auth/auth.module';
import { BookModule } from './api/book/book.module';
import { BookHighlightModule } from './api/book-highlight/book-highlight.module';
import { PartyModule } from './api/party/party.module';
import { BookReviewModule } from './api/book-review/book-review.module';
import { RecommendModule } from './api/recommend/recommend.module';
import { MessageModule } from './api/message/message.module';
import { FriendModule } from './api/friend/friend.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RedisModule,
    SurveyModule,
    ClsModule.forRoot({
      plugins: [
        new ClsPluginTransactional({
          imports: [PrismaModule],
          adapter: new TransactionalAdapterPrisma({
            prismaInjectionToken: PrismaService,
            sqlFlavor: 'postgresql',
          }),
        }),
      ],
    }),
    UserModule,
    LoginTokenModule,
    AuthModule,
    BookModule,
    BookHighlightModule,
    PartyModule,
    BookReviewModule,
    RecommendModule,
    MessageModule,
    FriendModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
