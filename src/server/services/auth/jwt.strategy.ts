import { Injectable } from '@nestjs/common';
import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserLite } from '../../../shared/types/user-lite';
import { JWT_SECRET } from '../../environment';
import { JwtPayload } from '../../types/jwt-payload';

// this is (hopefully) a temporary workaround cuz `extends PassportStrategy(Strategy)` doesn't work with HMR
abstract class PassportJwtStrategy extends Strategy {
  constructor(...args: any[]) {
    const callback = async (...params: any[]) => {
      const done = params[params.length - 1];
      try {
        done(null, await this.validate(...params));
      } catch (err) {
        done(err, null);
      }
    };

    // @ts-ignore
    super(...args, (...params: any[]) => callback(...params));
    passport.use('jwt', this as any);
  }

  abstract validate(...args: any[]): any;
}

@Injectable()
export class JwtStrategy extends PassportJwtStrategy {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<UserLite> {
    return payload.user;
  }
}
