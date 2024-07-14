<script lang="ts">
if (!localStorage["__auth_jwt"]) {
    document.location = "/app/auth/login"
} else {
    document.location = "/app/dash"
}
</script>