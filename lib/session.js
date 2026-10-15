import { SignJWT, jwtVerify } from 'jose';

export const COOKIE_NAME = 'eg_session';
export const SESSION_SECONDS = 60 * 60 * 24 * 7; // 7 hari

function secretKey() {
  return new TextEncoder().encode(process.env.SESSION_SECRET || '');
}

export async function createSessionToken(email) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_SECONDS}s`)
    .sign(secretKey());
}

export async function verifySessionToken(token) {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload;
  } catch {
    return null;
  }
    }
