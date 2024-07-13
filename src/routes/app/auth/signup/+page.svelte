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
    <h3 class="text-lg font-bold">Hello!</h3>
    
        <label for="email">Email:</label>
        <input name="email" type="email" required placeholder="wedontsendyouspam@rare1k.dev" class="mb-2 input v bg-base-300  input-bordered !border-none w-full max-w-xs" />
        <br> 
        <label for="username">Username:</label>
        <div class="tooltip" data-tip="Must be 2-16 characters, be alphanumeric. Underscores are allowed.">
        <input name="username" type="username" required pattern={usrRegex} placeholder="johndoe123" class="mb-2 input v bg-base-300 input-bordered !border-none w-full max-w-xs" />
        </div>
        <br>
        <label for="password">Password:</label>
        <div class="tooltip" data-tip="Must be atleast 10 characters, and have atleast one uppercase letter and atleast one number">
        <input name="password" required pattern={pswRegex} type="password" placeholder="Shh! It's a secret!" class="v input bg-base-300  input-bordered !border-none w-full max-w-xs" />
        </div>
  
    <div class="modal-action">
      <!-- <form method="dialog">-->
        <a href="?" class="btn btn-primary !px-6">Signup</a>
        <a href="/app/auth/login" class="btn !px-6">Login</a>
      <!-- </form>-->
    </div>
  </div>
</dialog>