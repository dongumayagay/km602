<script>
	import Admin from './Admin.svelte';
	import Sign from './Sign.svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/firebase';

	let userSession;
	let loading = true;
	onAuthStateChanged(auth, (user) => {
		console.log(user);
		userSession = user;
		loading = false;
	});
</script>

<svelte:head>
	<title>Admin</title>
</svelte:head>

{#if loading}
	<h1>loading</h1>
{:else}
	{#if userSession === null}
		<Sign />
	{:else}
		<Admin />
	{/if}
{/if}
