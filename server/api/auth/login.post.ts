import { SignJWT } from 'jose';
import { eq } from 'drizzle-orm';
import { db } from '@database';
import { users } from '@database/schema/users.schema';
import argon2 from 'argon2';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { username, password } = body;

    if (!username || !password) {
        throw createError({ statusCode: 400, statusMessage: 'Username and password are required' });
    }

    try {
        const user = await db.select()
            .from(users)
            .where(eq(users.username, username))
            .limit(1);

        if (user.length === 0 || !argon2.verify(user[0].password, password)) {
            throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
        }

        const token = await new SignJWT({ userId: user[0].id, role: user[0].roleId })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(new TextEncoder().encode(process.env.JWT_SECRET));

        return {
            status: 'success',
            statusCode: 200,
            user: {
                username: user[0].username,
                email: user[0].email,
                role: user[0].roleId
            },
            token: token,
            expires_in: 3600
        };

    } catch (error) {
        console.error('Error during authentication:', error);
        throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
    }
});