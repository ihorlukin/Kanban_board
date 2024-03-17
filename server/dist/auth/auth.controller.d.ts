import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';
import { Tokens } from './types';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signupLocal(dto: RegisterDto): Promise<Tokens>;
    signinLocal(dto: LoginDto): Promise<Tokens>;
    logout(userId: string): Promise<boolean>;
    refreshTokens(userId: string, refreshToken: string): Promise<Tokens>;
}
