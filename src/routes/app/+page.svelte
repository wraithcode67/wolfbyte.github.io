<script lang="ts">
if (!localStorage["__jwt_auth"]) {
    document.location = "/app/auth/login"
} else {
    document.location = "/app/dash"
}
</script>