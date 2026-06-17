import { db } from '@/lib/db';
import type { LMSUser } from '@prisma/client';

export type AuthUser = Pick<LMSUser, 'id' | 'email' | 'name' | 'role'>;

/**
 * Verify LMS authentication by reading the user id from the request.
 *
 * The Artemis LMS frontend stores the authenticated user object in
 * `localStorage` and sends the user id (and role hint) as the `userId`
 * query-string parameter on every authenticated request. There is no
 * signed token — this mirrors the original AI Studio implementation and
 * is suitable for the public demo / sandbox deployment.
 *
 * Returns the matching LMSUser record (stripped to the safe AuthUser
 * projection) or `null` if no valid user can be resolved.
 */
export async function verifyLMSAuth(request: Request): Promise<AuthUser | null> {
  try {
    const url = new URL(request.url);
    const userId =
      url.searchParams.get('userId') ||
      request.headers.get('x-lms-user-id') ||
      '';

    if (!userId) return null;

    const user = await db.lMSUser.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true },
    });

    return user ?? null;
  } catch (error) {
    console.error('verifyLMSAuth error:', error);
    return null;
  }
}

/**
 * Returns true when the authenticated user holds any of the requested roles.
 */
export function hasRole(user: AuthUser | null, roles: string[]): boolean {
  if (!user) return false;
  return roles.includes(user.role);
}

/**
 * Returns true when the authenticated user may access a resource owned by
 * `ownerId`. Admins always pass; everyone else may only access their own
 * resources.
 */
export function canAccessResource(
  user: AuthUser | null,
  ownerId: string | null | undefined,
): boolean {
  if (!user) return false;
  if (user.role === 'admin') return true;
  if (!ownerId) return false;
  return user.id === ownerId;
}
