import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
export declare class AuthController {
    private _authService;
    constructor(_authService: AuthService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<boolean>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    test(user: User): void;
}
