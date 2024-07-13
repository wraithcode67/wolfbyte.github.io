<script lang="ts">
	import { onMount } from "svelte";

    onMount(()=>{
        setInterval(()=>{
        // @ts-expect-error
        authModal.showModal();
        },100)
    })
</script>
<dialog id="authModal" class="modal backdrop-blur modal-bottom md:modal-middle">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Hello!</h3>
    <p class="py-4">
        <label for="email">Email:</label>
        <input name="email" type="email" placeholder="wedontsendyouspam@rare1k.dev" class="input input-bordered !border-none w-full max-w-xs" />
        <label for="username">Username:</label>
        <input name="username" type="username" placeholder="johndoe123" class="input input-bordered !border-none w-full max-w-xs" />
        <label for="password">Password:</label>
        <input name="password" type="password" placeholder="Shh! It's a secret!" class="input input-bordered !border-none w-full max-w-xs" />
    </p>
    <div class="modal-action">
      <!-- <form method="dialog">-->
        <a href="?" class="btn btn-primary !px-6">Signup</a>
        <a href="/auth/login" class="btn !px-6">Login</a>
      <!-- </form>-->
    </div>
  </div>
</dialog>