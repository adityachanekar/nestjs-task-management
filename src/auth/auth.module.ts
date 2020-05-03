import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.respository';
import {JwtModule} from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import{ PassportModule } from '@nestjs/passport';
@Module({
  imports:[
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: 'topSecret69',
      signOptions: {
        expiresIn: 3600,
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
