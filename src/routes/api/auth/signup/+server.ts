import { json,text } from '@sveltejs/kit';
import * as auth from "$lib/auth.ts";
// @ts-expect-error shut up
import mac from "node-macaddress";
let secretKey = btoa(mac.one());
import jwt from "jsonwebtoken";

import { error } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';

const limiter = new RateLimiter({
  IP: [5, 'h'], // 5 account signups per hour
});


export async function POST({ request, cookies }) {
    // @ts-expect-error
    if (await limiter.isLimited(event)) throw error(429);
    const { email,username,password } = await request.json();
    if ((password.length != 128 || !/^[0-9a-f]+$/.test(password)) || (email.length != 64 || !/^[0-9a-f]+$/.test(email))) {
        return text("ERR: Invalid hash",{status:400})
    }
    if (await auth.userExists(email,username)) {
        return text("ERR: User already exists with either the same email or username",{status:400})
    }
    if (!new RegExp(auth.usrRegex).test(username)) { return text("ERR: Username does not meet requirements",{status:400}) }
    if (!new RegExp(auth.pswRegex).test(username)) { return text("ERR: Password does not meet requirements",{status:400}) }
    await auth.createUser(email,username,password);
    const token = jwt.sign({ username,password,"MAGIC":Date.now() }, secretKey, { expiresIn: '6h' });
    return text(token);
}
