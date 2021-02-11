import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private _userRepo: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //req will have the token inside the authorization header with the form of 'Bearer <token>'
            secretOrKey: 'topSecret123'
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user = await this._userRepo.findOne({username})

        if (!user) {
            throw new UnauthorizedException()
        }

        return user;
    }
}