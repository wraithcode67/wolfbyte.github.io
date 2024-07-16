<script lang="ts">
import { validateAuth } from "$lib/client";import { onMount } from "svelte";onMount((async()=>{
    await validateAuth();
    let r = await fetch("/api/auth/getSettings",{method:"POST",body:JSON.stringify({token:localStorage["__jwt_auth"],username:localStorage["__jwt_user"]})})
    let rj = await r.json();
    if (!rj.hasAdmin) {
        document.location = "/app"
    }
    }));
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
