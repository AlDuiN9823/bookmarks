import argon2 from 'argon2';
import { db } from '@database';
import { users } from '@database/schema/users.schema';
import { userSchema } from '@/server/schemas/user.schema';
import { or, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { error, value } = userSchema.validate(body, { abortEarly: false });

    if (error) {
        setResponseStatus(event, 400)
        return {
            statusCode: 400,
            message: error.details.map(detail => detail.message)
        };
    }

    const existingUser = await db.select().from(users).where(
        or(
            eq(users.username, value.username),
            eq(users.email, value.email)
        )
    ).limit(1);

    if (existingUser.length > 0) {
        setResponseStatus(event, 409)
        return {
            status: 'error',
            statusCode: 409,
            message: 'Username or email already exists'
        };
    }

    const hashedPassword = await argon2.hash(value.password);

    try {
        await db.insert(users).values({
            username: value.username,
            password: hashedPassword,
            email: value.email
        });

        setResponseStatus(event, 201)
        return {
            status: 'success',
            statusCode: 201, // 201 Created
            message: 'User registered successfully'
        };
    } catch (error) {
        setResponseStatus(event, 500)
        console.error('Error registering user:', error);
        return { 
            status: 'error',
            statusCode: 500,
            message: 'Internal server error'
        };
    }
});