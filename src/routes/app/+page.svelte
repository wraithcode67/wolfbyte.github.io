<script lang="ts">
	import { redirect } from "@sveltejs/kit";

if (!localStorage["__auth_jwt"]) {
    throw redirect(301,"/app/auth/login")
} else {
    throw redirect(301,"/app/dash")
}
</script>