import { db } from "./db.ts"
import argon2 from 'argon2';
import crypto from 'crypto';

function sha256hash(s: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(s);
    return hash.digest('hex');
}

export async function userExists(email: string | undefined = undefined, username: string | undefined = undefined): Promise<boolean> {
    const hashedEmail = email ? sha256hash(email) : undefined;
    const u = await db.user.findFirst({
        where: {
            OR: [
                { email: hashedEmail },
                { username: username }
            ]
        }
    });
    return u !== null;
}

export async function createUser(email: string, username: string, password: string) {
    try {
        const user = await db.user.create({
            data: {
                email: sha256hash(email),
                username: username,
                password: await argon2.hash(password, { type: argon2.argon2id }),
            },
        });
        return user;
    } catch (error:any) {
        throw new Error(`Failed to create user: ${error.message}`);
    }
}
