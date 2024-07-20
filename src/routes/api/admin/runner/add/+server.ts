import { text,json } from '@sveltejs/kit';
// @ts-expect-error
import mac from "node-macaddress";
let secretKey = btoa(mac.one());
import { db } from '$lib/db';
import jwt, { type JwtPayload } from "jsonwebtoken";
export async function POST({ request, cookies }) {
    let { token, runnerUrl } = await request.json();
    if (token && jwt.decode(token)) {
        let d: string | JwtPayload = jwt.verify(token,secretKey,undefined)
        if (!d || typeof d == "string" ) {return json({"error":"Invalid JWT token"},{"status":400})}
        if (!d.exp || Date.now() > d.exp * 1000) {return json({"error":"Invalid JWT token"},{"status":400})}
        let jwtAdmin = (await db.settings.findFirst({where: {user: {username: d.username }}}))?.hasAdmin
        if (!jwtAdmin) {
            return json({"error":"You do not have permission to do this."},{"status":403})
        }
    }
    try {
        let [username,password,...url] = runnerUrl.split("://")[1].split("@")
        let h = btoa(`${username}:${password}`)
        let r = await fetch(url, {headers:{"Authorization":`Basic ${h}`}})
        if (!r.ok) {throw new Error()}
     } catch {
        return json({"error":"Bad Catway Runner"},{"status":400})
     }
     (await db.serverSettings.findFirst())
}