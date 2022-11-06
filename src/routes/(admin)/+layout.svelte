<script>
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores';
	import Loading from '$lib/components/Loading.svelte';

	let loading = true;

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, async (userObj) => {
			$user = userObj;
			if (!userObj) await goto('/admin/signin');
			loading = false;
		});
		return () => unsubscribe();
	});
</script>

{#if loading}
	<Loading />
{:else}
	<slot />
{/if}
