import { text } from '@sveltejs/kit';
import * as auth from "$lib/auth.ts";
import { db } from '$lib/db';
export async function POST({ request, cookies }) {
    const username = await request.text(); 
    if (!await auth.userExists(undefined,username)) {
      return text("false")
  }
  
  let user = await db.user.findFirst({
      where: {
          OR: [
              { username: username }
          ]
      }
  });
  if (!user) {
      return text("false")
  }
  
  const settings = await db.settings.findFirst({
    where: {
      user: {
        id: user.id
      }
    }
  });
  console.log(settings)
  return text(String(settings?.hasAdmin || false)) 
}