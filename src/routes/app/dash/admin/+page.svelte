<script lang="ts">
import { validateAuth } from "$lib/client";import { onMount } from "svelte";onMount((async()=>{
    await validateAuth();
    let r = await fetch("/api/auth/isUserAdmin",{method:"POST",body:localStorage["__jwt_user"]})
    if (await r.text() != "true") {
        document.location = "/app"
    }
    }));
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
