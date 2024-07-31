/*
import * as auth from "$lib/auth.ts";
// @ts-expect-error shut up
import mac from "node-macaddress";
let secretKey = btoa(mac.one());
import jwt from "jsonwebtoken";
import { error } from '@sveltejs/kit';
import { db } from '$lib/db';
*/
import { text } from '@sveltejs/kit';
export async function GET({ request }) {
    const { url } = await request.json();
    const response = await fetch(url);
    if (!response.ok) {
        return text("Non-ok status code.",{"status":500})
    }
    const contentType = response.headers.get('Content-Type');
    if (!contentType || ![
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/webp',
        'image/gif',
        'image/ico'
    ].includes(contentType)) {
        return text("Not an image",{"status":400})
    }
    return new Response(response.body, { headers: { 'Content-Type': contentType } });
}
