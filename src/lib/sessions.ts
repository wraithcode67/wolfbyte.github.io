import { db } from '$lib/db';



async function getRunners() {
    const runners = await db.runner.findMany();
    if (runners.length == 0) {return []}
    return runners.map((runner) => runner.url);
}

function mkAuthHeader(url:string) {
    if (!url.includes("@")) {return ["",url]}
    let [username,password,...unused] = url.split("://")[1].split("@")[0].split(":")
    return [btoa(`${username}:${password}`),url.replace(`${username}:${password}@`, "")]
}

async function getARunner() {
    let runners = await getRunners();
    if (runners.length == 0) {
        console.error("No runners!");
        return ""; // error handle later
    } 
    let randRunner = runners[Math.floor(Math.random() * runners.length)];
    let ah = mkAuthHeader(randRunner)
    let res = await fetch(ah[1],{
        "headers":{
            "authentication": ah[0]
        }
    })
    if (!res.ok) {
        // Either:
        // - URL is down
        // - Bad authentication credentials
        if (runners.length == 1) {
            console.error("Only Catway runner is not operational! Panicking!!");
            process.exit(1); // might implement better error handling later.
        } 
    } else {
        return randRunner
    }
}
