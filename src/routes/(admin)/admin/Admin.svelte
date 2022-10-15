<script>
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase';
</script>

<button on:click={() => signOut(auth)}> LOGOUT </button>
