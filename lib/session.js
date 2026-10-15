
import { SignJWT, jwtVerify } from 'jose';

export const COOKIE_NAME = 'eg_session';
export const SESSION_SECONDS = 60 * 60 * 24 * 7;

function secretKey() {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET belum dikonfigurasi dengan benar');
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(email) {
  return new SignJWT({
    email: email.toLowerCase().trim(),
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_SECONDS}s`)
    .sign(secretKey());
}

export async function verifySessionToken(token) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (typeof payload.email !== 'string') return null;
    return payload;
  } catch {
    return null;
  }
}
