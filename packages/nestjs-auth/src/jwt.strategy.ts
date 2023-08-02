import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    if (!process.env.CLERK_JWSK_URL || !process.env.CLERK_ISSUER) {
      throw new UnauthorizedException('Missing required environment variables');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.CLERK_JWSK_URL || '',
      }),
      issuer: process.env.CLERK_ISSUER,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: unknown) {
    return payload;
  }
}
