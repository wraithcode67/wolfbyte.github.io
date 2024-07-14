<script lang="ts">
	import { onMount } from "svelte";
  import { pswRegex, usrRegex,login} from "$lib/auth.ts"
    onMount(()=>{
        setInterval(()=>{
        // @ts-expect-error
        authModal.showModal();
        },100)
        async function signupEvent() {
    // @ts-expect-error
    let jwt = await signup(document.querySelector('.eml').value,document.querySelector('.usr').value,document.querySelector('.psw').value);
    if (jwt.length == 1) {
      let error = "";
      if (jwt == "\x00") {error = "Account already exists"}
      if (jwt == "\x01" || jwt == "\x02") {error = "Username or password does not meet the requirements"}
      alert(error)
    } else {
      localStorage["__auth_jwt"] = jwt;
      document.location = "/app"
    }

  }
    });
    
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
        <a href="?" class="btn btn-primary !px-6" onclick="loginEvent()">Login</a>
        <a href="/app/auth/signup" class="btn !px-6">Signup</a>
      <!-- </form>-->
    </div>
  </div>
</dialog>