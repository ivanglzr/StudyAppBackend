import { Module } from '@nestjs/common';

import { RouterModule } from '@nestjs/core';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SubjectModule } from './subject/subject.module';

import { ENVIROMENT_VARIABLES } from './common/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>(ENVIROMENT_VARIABLES.MONGODB_URI),
      }),
    }),

    //? Router modules
    UserModule,
    AuthModule,
    SubjectModule,

    RouterModule.register([
      {
        path: '',
        module: UserModule,
      },
      {
        path: '',
        module: AuthModule,
      },
    ]),
  ],
})
export class AppModule {}
