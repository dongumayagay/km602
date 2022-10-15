<script>
	import Admin from './Admin.svelte';
	import Sign from './Sign.svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/firebase';

	let userSession;
	let show = false;
	onAuthStateChanged(auth, (user) => {
		userSession = user;
		show = true;
	});
</script>

{#if show}
	{#if userSession}
		<Admin />
	{:else}
		<Sign />
	{/if}
{:else}
	<h1>loading</h1>
{/if}
