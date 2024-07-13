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
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <!-- <form method="dialog">-->
        <a href="?" class="btn btn-primary !px-6">Signup</a>
        <a href="/auth/login" class="btn !px-6">Login</a>
      <!-- </form>-->
    </div>
  </div>
</dialog>