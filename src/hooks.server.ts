import d from "dotenv";
d.config();
if (!process.env["SECRET_KEY"]) {
    setTimeout(()=>{process.exit(1);},0)
    throw new Error("A secret key needs to be provided in the .env file.");
}