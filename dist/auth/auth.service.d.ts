import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
export declare class AuthService {
    private _userRepo;
    private _jwtService;
    constructor(_userRepo: UserRepository, _jwtService: JwtService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<boolean>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
