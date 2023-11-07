import { NextRequest, NextResponse } from 'next/server';
import { serverCustomFetch } from '../../../../_utils/serverCustomFetch';
import { cookies } from 'next/headers';
import { API_ROUTES } from '../../../../../constants';


export const GET = async (req: NextRequest, { params }: any) => {
    const res = await serverCustomFetch(`${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.AUTH.GITLAB(params.code)}`, { method: 'GET' });

    res.headers.getSetCookie().forEach((cookie: string) => {
        const [key, value] = cookie.split('=')
        if (key === 'token') {
            const tokenValue = value.split(';')[0];
            const cookieStore = cookies();
            cookieStore.set('token', tokenValue, { httpOnly: true });
        }
    })

    return NextResponse.json({}, { status: 200 })

}