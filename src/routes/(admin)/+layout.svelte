<script>
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let loading = true;
	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (!user) await goto('/admin/signin');
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
