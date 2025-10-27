import { redirect } from 'next/navigation';
import { getUserAuth } from './getUserAuth';

export async function redirectToHomeIfNotLogged() {
  const userAuth = await getUserAuth();

  if (!userAuth) {
    redirect('/');
  }
}
