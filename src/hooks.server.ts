import d from "dotenv";
import { db } from "$lib/db";
d.config();
if (!(await db.serverSettings.findFirst())) {
    console.log("Initializing server settings...")
    await db.serverSettings.create({
        data: {
          signups: true,
          runners: {
            create: []
          }
        }
    }
)
}