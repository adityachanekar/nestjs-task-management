import { PassportStrategy } from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.respository';
import { JwtPayload } from './jwt-payload.interface';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET ||config.get('jwt.secret'),
        });
    }

    async validate( payload: JwtPayload ) {
        const { username } = payload;
        const user = await this.userRepository.findOne( { username } );

        if(!user){
            throw new UnauthorizedException();
        }

        return user;

    }
}