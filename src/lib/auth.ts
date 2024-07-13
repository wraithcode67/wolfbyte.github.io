import { db } from "./db.ts"

import crypto from 'crypto';
export const pswRegex = "^(?=.*[A-Z])(?=.*\\d).{10,}$"
export const usrRegex = "^[a-zA-Z0-9_]{1,16}$"

function CaesarCipher(str:string, num:number) {
    str = str.toLowerCase();

    var result = '';
    var charcode = 0;

    for (var i = 0; i < str.length; i++) {
        charcode = (str.charCodeAt(i)) + num;
        result += String.fromCharCode(charcode);
    }
    return result;

}

function sha256hash(s: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(s);
    return hash.digest('hex');
}

function sha512hash(s: string): string {
    const hash = crypto.createHash('sha512');
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
                password: sha512hash(password),
            },
        });
        return user;
    } catch (error:any) {
        throw new Error(`Failed to create user: ${error.message}`);
    }
}
export function makeToken(username:string) {
    return `${btoa("MAGIC"+CaesarCipher(`${username};${Date.now()};${Date.now() + (1000*60*60*24)};${Math.floor(Math.random()*32767)}`,44))}`;
}
export function decodeToken(token:string) {
    return `${CaesarCipher(atob(token).slice(5),-44)}`
}