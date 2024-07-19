<script lang="ts">
import { UserX,Crown,Gem,UserCog } from "lucide-svelte";
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
  <h2 class="font-bold text-accent text-2xl my-3 ">Instance Settings</h2>
  <div class="p-3 bg-base-200 rounded-xl">
    <span class="flex flex-row items-center align-middle mb-5">
      Allow Signups: <input type="checkbox" class="toggle toggle-success ml-4" checked>
    </span>
    <span class="flex flex-col items-center align-middle catwayRunners">
      <b class="text-lg">Catway Runners</b>
      <div class="p-6 bg-base-300 rounded-xl">
        <pre>No Runners found.</pre>
        <br>
        <span class="flex flex-row items-center align-middle gap-3">
          <button class="btn btn-sm btn-success">Add</button> <button class="btn btn-sm btn-error">Delete</button>
        </span>
      </div>
    </span>
  </div>
  <h2 class="font-bold text-accent text-2xl my-3">User Management</h2>
  <div class="p-3 bg-base-200 rounded-xl min-h-[240px] max-h-[480px] min-w-[50%]">
    <div class="p-3 bg-base-300 rounded-md flex flex-row align-middle items-center gap-4 template">
      <span title="This user is an admin." class="adminIcon"><Crown /></span>
      <span title="This user has Catway Purrmium." class="premiumIcon"><Gem /></span>
      template
      <span class="flex flex-row gap-4 ml-16 items-center align-middle">
      <button class="btn btn-sm btn-circle hover:bg-error hover:text-error-content btn-ghost" title="Delete this user"> <UserX /> </button>
      <button class="btn btn-sm btn-circle hover:bg-primary hover:text-primary-content btn-ghost" title="Manage this user's roles"> <UserCog  /> </button>
    </span>
    </div>
  </div>
  <h2 class="font-bold text-accent text-2xl my-3">Session Management</h2>
  <div class="p-6 bg-base-200 rounded-xl min-h-[240px] max-h-[480px] min-w-[50%]"></div>
</div> 
</div>