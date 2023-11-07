import { NextRequest } from 'next/server';
import { serverCustomFetch } from '../../../_utils/serverCustomFetch';
import { API_ROUTES } from '../../../../constants';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const POST = async (req: NextRequest) => {
    await serverCustomFetch(`${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.AUTH.LOGOUT()}`, { method: 'POST' });
    const cookieStore = cookies()
    cookieStore.delete('token');
    redirect('/');
}