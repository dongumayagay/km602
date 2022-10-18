<script>
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores';

	let loading = true;

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, async (userObj) => {
			if (!userObj) await goto('/admin/signin');
			$user = userObj;
			loading = false;
		});
		return () => unsubscribe();
	});
</script>

{#if loading}
	loading
{:else}
	<slot />
{/if}
