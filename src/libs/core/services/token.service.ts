import { User } from "../entites/user.entity";
import { sign, verify, decode } from 'jsonwebtoken';

export class TokenService {
    sign(user: any) {
        return sign(
            {
                id: user.id,
                isStaff: user.isStaff,
                isActive: user.isActive,
                isSuperuser: user.isSuperuser,
            },
            this.getSecretKey({
                id: user.id,
                isStaff: user.isStaff,
                isActive: user.isActive,
                isSuperuser: user.isSuperuser,
            }),
            {
                expiresIn: process.env.JWT_EXPIRATION_DELTA
            }
        )
    }
    verify(token: string) {
        const data: any = decode(
            token
        );
        return verify(token, this.getSecretKey(data));
    }
    decode(token: string) {
        return decode(
            token
        )
    }
    getSecretKey(data: any) {
        return process.env.SECRET_KEY +
            '$' + data.id +
            '$' + data.isStaff +
            '$' + data.isActive +
            '$' + data.isSuperuser;
    }
}