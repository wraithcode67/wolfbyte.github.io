<script lang="ts">
	import { onMount } from "svelte";
  import { pswRegex, usrRegex } from "$lib/auth.ts"
    onMount(()=>{
        setInterval(()=>{
        // @ts-expect-error
        authModal.showModal();
        },100)
    })
</script>
<dialog id="authModal" class="modal backdrop-blur modal-bottom md:modal-middle">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Welcome back!</h3>
    <p class="py-4">
        <label for="username">Username:</label>
        <input name="username" pattern={usrRegex} required type="username" placeholder="johndoe123" class="mb-2 v input bg-base-300 input-bordered !border-none w-full max-w-xs" />
        <br>

        <label for="password">Password:</label>
        <input name="password" pattern={pswRegex} required type="password" placeholder="Shh! It's a secret!" class="v input bg-base-300 input-bordered !border-none w-full max-w-xs" />
     
    </p>
    <div class="modal-action">
      <!-- <form method="dialog">-->
        <a href="?" class="btn btn-primary !px-6">Login</a>
        <a href="/app/auth/signup" class="btn !px-6">Signup</a>
      <!-- </form>-->
    </div>
  </div>
</dialog>