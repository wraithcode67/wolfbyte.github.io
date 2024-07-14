<script lang="js">
  // @ts-nocheck
	import { afterUpdate, onMount } from "svelte";
  import { pswRegex, usrRegex,signup,login } from "$lib/auth.ts"
	import { browser } from "$app/environment";
  console.log(browser)
onMount(()=>{
  if (browser) {
    setInterval(()=>{
      // @ts-expect-error
      authModal.showModal();
    }, 100)
  }
})
    
</script>
<button class="btn" onclick="authModal.showModal();">Show Login Modal</button>
<dialog id="authModal" class="modal backdrop-blur modal-bottom md:modal-middle">
  
  <div class="modal-box">
    <h3 class="text-lg font-bold">Hello!</h3>
    
        <label for="email">Email:</label>
        <input name="email" type="email" required placeholder="wedontsendyouspam@rare1k.dev" class="mb-2 input v bg-base-300 eml input-bordered !border-none w-full max-w-xs" />
        <br> 
        <label for="username">Username:</label>
        <div class="tooltip" data-tip="Must be 2-16 characters, be alphanumeric. Underscores are allowed.">
        <input name="username" type="username" required pattern={usrRegex} placeholder="johndoe123" class="mb-2 input v usr bg-base-300 input-bordered !border-none w-full max-w-xs" />
        </div>
        <br>
        <label for="password">Password:</label>
        <div class="tooltip" data-tip="Must be atleast 10 characters, and have atleast one uppercase letter and atleast one number">
        <input name="password" required pattern={pswRegex} type="password" placeholder="Shh! It's a secret!" class="v psw input bg-base-300  input-bordered !border-none w-full max-w-xs" />
        </div>
  
    <div class="modal-action">
      <!-- <form method="dialog">-->
        <a href="?" class="btn btn-primary !px-6" on:click={signupEvent()}>Signup</a>
        <a href="/app/auth/login" class="btn !px-6">Login</a>
      <!-- </form>-->
    </div>
  </div>
</dialog>