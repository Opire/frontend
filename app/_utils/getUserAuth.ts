import { cookies } from 'next/headers';
import { Token } from '../_core/_vos/Token';

export async function getUserAuth() {
  const cookieStore = await cookies();
  const tokenInCookie = cookieStore.get('token');

  if (tokenInCookie) {
    return Token.getTokenPayload(tokenInCookie.value);
  }

  return null;
}
