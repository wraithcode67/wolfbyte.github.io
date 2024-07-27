import { db } from '$lib/db';



export async function getRunners() {
    const runners = await db.runner.findMany();
    if (runners.length == 0) {return []}
    return runners.map((runner) => runner.url);
}

export function mkAuthHeader(url:string) {
    if (!url.includes("@")) {return ["",url]}
    let [username,password,...unused] = url.split("://")[1].split("@")[0].split(":")
    return [btoa(`${username}:${password}`),url.replace(`${username}:${password}@`, "")]
}

export async function getARunner() {
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
export async function pullContainer(url:string) {
    let r = await getRunners();
    for (let runner of r) {
         let ah = mkAuthHeader(runner)
         let res = await fetch(`${ah[1]}/containers/pull`,{
            "method": "POST",
            "headers":{
                "authentication": ah[0]
            }, "body": JSON.stringify({
                "url": url
            })
        })
    }
}

export async function seedContainer(data: { imageUrl: string, friendlyName: string, ram: number, cores: number }) {
    const { imageUrl, friendlyName, ram, cores } = data;
    await db.container.create({
      data: {
        imageUrl,
        friendlyName,
        ram,
        cores,
      },
    });
    await pullContainer(imageUrl);
}
