import jwt from 'jsonwebtoken';
import { UserAuthDTO } from '../_dtos/UserAuthDTO';

export class Token {

    public static getTokenPayload(value: string): UserAuthDTO {
        const tokenDecoded = jwt.decode(value, {
            complete: true,
            json: true,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as { [key: string]: any; } | null;

        const payload: UserAuthDTO | undefined = tokenDecoded?.payload;

        if (!payload || !payload.userId) {
            throw new Error('Invalid token');
        }

        return payload
    }

}
