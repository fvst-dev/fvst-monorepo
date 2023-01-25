import { JwtPayload, sign, verify } from "jsonwebtoken";

const ISSUER = "auth";
const EXPIRES_IN = "365d";
const SECRET = "secret";

export type Payload = {
  /**
   * session id
   */
  session: string;
};

export const verifyJwt = (token: string) => {
  return verify(token, SECRET, {
    complete: false,
    issuer: ISSUER,
  }) as JwtPayload & Payload;
};

export const signJwt = (subject: string, data: Payload) => {
  return sign(
    {
      ...data,
    },
    SECRET,
    { expiresIn: EXPIRES_IN, issuer: ISSUER, subject }
  );
};
