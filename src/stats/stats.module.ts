import { Module } from '@nestjs/common';

import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stats } from 'src/common/schemas/stats/stats.schema';
import { StatsSchema } from 'src/common/schemas/stats/stats.schema';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ENVIROMENT_VARIABLES } from 'src/common/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stats.name, schema: StatsSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(ENVIROMENT_VARIABLES.JWT_KEY),
      }),
    }),
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
