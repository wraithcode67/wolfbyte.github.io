import { text } from '@sveltejs/kit';
// @ts-expect-error
import mac from "node-macaddress";
let secretKey = btoa(mac.one());
import jwt from "jsonwebtoken";
export async function POST({ request, cookies }) {

    const token = await request.text(); // Get the JWT token from the request body
  
    if (!token) {
      return text('false');
    }
  
    try {
        if (token && jwt.decode(token)) {
            // @ts-expect-error
            const expiry = jwt.decode(token).exp;
            if (!expiry) {return text("false")}
            const now = new Date();
            return text(String(now.getTime() > expiry * 1000));
          }
          return text(String(false));
    } catch (error) {
      return text('false');
    }
    return text('true');
  }