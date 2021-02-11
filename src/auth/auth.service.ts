import { Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private _userRepo: UserRepository,
        private _jwtService: JwtService,
    ) {}

    signUp(authCredentialsDto: AuthCredentialsDto): Promise<boolean> {
        return this._userRepo.signUp(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const username = await this._userRepo.validateUserPassword(authCredentialsDto);
        if (!username) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const payload: JwtPayload = { username };
        const accessToken = await this._jwtService.sign(payload);
        
        return { accessToken } 
    }
}
