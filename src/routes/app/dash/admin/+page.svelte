<script lang="ts">
import { House,Users,Container,Settings } from "lucide-svelte";
import { validateAuth } from "$lib/client";import { onMount } from "svelte";onMount((async()=>{
    await validateAuth();
    let r = await fetch("/api/auth/getSettings",{method:"POST",body:JSON.stringify({token:localStorage["__jwt_auth"],username:localStorage["__jwt_user"]})})
    let rj = await r.json();
    if (!rj.hasAdmin) {
        document.location = "/app"
    }
    }));
</script>

<div class="absolute left-[36px] md:left-[24px] lg:left-[12px] !z-[0]">
<div class="dashboard">
  <h1 class="font-bold text-3xl my-3">Admin Dashboard</h1>
</div> 
</div>