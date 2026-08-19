import crypto from 'crypto';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || 'monsi-engineering-super-secret-jwt-key-2026';

export interface AuthPayload {
  id: string;
  email: string;
  role: 'USER' | 'CLIENT' | 'ADMIN';
  firstName?: string;
  lastName?: string;
  exp?: number;
}

// Helper to base64url encode string
function base64url(input: string | Buffer): string {
  const base64 = (typeof input === 'string' ? Buffer.from(input, 'utf8') : input).toString('base64');
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

// Helper to base64url decode string
function base64urlDecode(input: string): string {
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf8');
}

// Generate token with 7-day expiration
export function signToken(payload: Omit<AuthPayload, 'exp'>, expiresInDays = 7): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + expiresInDays * 24 * 60 * 60;
  const fullPayload: AuthPayload = { ...payload, exp };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(fullPayload));

  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest();

  const encodedSignature = base64url(signature);

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

// Verify token
export function verifyToken(token: string): AuthPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, encodedSignature] = parts;

    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest();

    const expectedEncodedSignature = base64url(expectedSignature);

    if (encodedSignature !== expectedEncodedSignature) {
      return null;
    }

    const payload: AuthPayload = JSON.parse(base64urlDecode(encodedPayload));

    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

// Extract session from request (Authorization Bearer header or auth-token cookie)
export function getSessionFromRequest(request: NextRequest | Request): AuthPayload | null {
  let token: string | null = null;

  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  }

  if (!token && 'cookies' in request && typeof (request as any).cookies?.get === 'function') {
    const cookieToken = (request as NextRequest).cookies.get('auth-token')?.value;
    if (cookieToken) token = cookieToken;
  }

  if (!token) {
    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      const match = cookieHeader.match(/auth-token=([^;]+)/);
      if (match) token = match[1];
    }
  }

  if (!token) return null;

  return verifyToken(token);
}
