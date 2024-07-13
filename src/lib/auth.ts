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
export function parseToken(token:string)  {
    let t = decodeToken(token);
    if (!atob(token).startsWith("MAGIC")) {
        return "Not properly formatted"
    }
    if (t.split(";").length != 4) {
        return "Not properly formatted"
    }
    let te = t.split(";")
    ;
    try {
        // @ts-expect-error
        if (isNaN(te[1]) || isNaN(te[2])) {throw new Error("Invalid number")}
        new Date(te[1]);new Date(te[2])
    }
     catch {return "Invalid creation/expiry date."}
    if (Number(te[1]) > Number(te[2])) {return "Invalid creation/expiry date."}
    if (Number(te[2]) < Date.now()) {return "Expired token"}
    return te
}

export async function signup(email: string, username: string, password: string) {
    if (!new RegExp(usrRegex).test(username)) {return "\x01"}
    if (!new RegExp(pswRegex).test(username)) {return "\x02"}
    if (await userExists(sha256hash(email),username)) {
        return "\x00"
    } else {
        await createUser(email,username,password)
    }
    return makeToken(username)

}
export async function login(email: string, username: string, password: string) {
    if (!new RegExp(usrRegex).test(username)) {return "\x01"}
    if (!new RegExp(pswRegex).test(username)) {return "\x02"}
    if (await userExists(sha256hash(email),username)) {
        return "\x00"
    } else {
        return makeToken(username)
    }
    
}