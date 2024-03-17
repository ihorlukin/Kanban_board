import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';
import { Tokens } from './types';
export declare class AuthService {
    private prisma;
    private jwtService;
    private config;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService);
    signupLocal(dto: RegisterDto): Promise<Tokens>;
    signinLocal(dto: LoginDto): Promise<Tokens>;
    logout(userId: string): Promise<boolean>;
    refreshTokens(userId: string, rt: string): Promise<Tokens>;
    updateRtHash(userId: string, rt: string): Promise<void>;
    getTokens(userId: string, email: string): Promise<Tokens>;
}
