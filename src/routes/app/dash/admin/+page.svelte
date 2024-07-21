<script lang="ts">
import { UserX,Crown,Gem,UserCog,Trash2 } from "lucide-svelte";
import { validateAuth } from "$lib/client";import { onMount } from "svelte";
onMount((async()=>{
    await validateAuth();
    let r = await fetch("/api/auth/getSettings",{method:"POST",body:JSON.stringify({token:localStorage["__jwt_auth"],username:localStorage["__jwt_user"]})})
    let rj = await r.json();
    if (!rj.hasAdmin) {
        document.location = "/app"
    }
    console.log("hi")
}));
</script>
<div class="dashboard ml-2 flex flex-col">
  <h1 class="font-bold text-3xl my-3">Admin Dashboard</h1>
  <h2 class="font-bold text-accent text-2xl my-3 ">Instance Settings</h2>
  <div class="p-3 bg-base-200 rounded-xl w-fit max-w-fit">
    <span class="flex flex-row items-center align-middle mb-5 w-fit max-w-fit">
      Allow Signups: <input type="checkbox" class="toggle toggle-success ml-4" checked>
    </span>
    <span class="catwayRunners">
      <b class="text-lg">Catway Runners</b>
      <div class="p-6 bg-base-300 rounded-xl">
        <pre class="runnersList">No Runners found.</pre>
        <br>
        <span class="flex flex-row items-center align-middle gap-3">
          <button class="btn btn-sm btn-success">Add</button> <button class="btn btn-sm btn-error">Delete</button>
        </span>
      </div>
    </span>
  </div>
  <h2 class="font-bold text-accent text-2xl my-3">User Management</h2>
  <div class="p-3 bg-base-200 rounded-xl min-h-[240px] max-h-[480px] min-w-[50%] max-w-[640px]">
    <button class="btn btn-sm btn-success mb-2">Add</button>
    <div class="uCard template">
      <span class="badges flex flex-row gap-1">
        <span title="This user is an admin." class="adminIcon"><Crown class="text-warning m-0 p-0" size="20"/></span>
        <span title="This user has Catway Purrmium." class="premiumIcon"><Gem class="text-primary m-0 p-0" size="20" /></span>
      </span>
      template
      <span class="flex flex-row gap-4 ml-16 items-center align-middle">
      <button class="btn btn-sm btn-circle hover:bg-error hover:text-error-content btn-ghost" title="Delete this user"> <UserX /> </button>
      <button class="btn btn-sm btn-circle hover:bg-primary hover:text-primary-content btn-ghost" title="Manage this user's roles"> <UserCog  /> </button>
    </span>
    </div>
  </div>
  <h2 class="font-bold text-accent text-2xl my-3">Session Management</h2>
  <div class="p-6 bg-base-200 rounded-xl min-h-[240px] max-h-[480px] min-w-[50%] max-w-[640px]">
    <div class="pl-3  flex flex-row align-middle items-center gap-4 template">
      <b>Name</b><b>Owned By</b>
    </div>
    <div class="sCard template">
      <b>template</b> <span>template</span> <span class="flex flex-row gap-4 ml-16 items-center align-middle">
        <button class="btn btn-sm btn-circle hover:bg-error hover:text-error-content btn-ghost" title="Delete this session"> <Trash2 /> </button>
      </span>
    </div>
  </div>
</div> 
