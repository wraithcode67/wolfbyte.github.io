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

<div class="drawer drawer-open fixed top-16 max-h-[calc(100vh-64px)] sm:w-screen !z-[100]">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side  max-h-[calc(100vh-64px)] -left-[90%] sm:w-screen  sm:-left-[90%] md:-left-[95%] lg:-left-[97%]  hover:ease-out ease-in hover:left-0 duration-300 !relative">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 text-base-content max-h-[calc(100vh-64px)] w-80 p-4">
        <!-- Sidebar content here -->
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
      </ul>
    </div>
  </div>
<div class="absolute left-[36px] md:left-[24px] lg:left-[12px] !z-[0]">
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</div>