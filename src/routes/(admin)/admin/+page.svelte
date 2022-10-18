<script>
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import BookingTable from './BookingTable.svelte';
</script>

<button on:click={() => signOut(auth)}> LOGOUT </button>
<BookingTable />
