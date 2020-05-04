import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.respository';
import {JwtModule} from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import{ PassportModule } from '@nestjs/passport';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
  imports:[
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || config.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },

    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [
    JwtStrategy,
    PassportModule,
  ]
})
export class AuthModule {}
