<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { userStore } from '$lib/stores';
	import Loading from './Loading.svelte';
	import Sidebar from './Sidebar.svelte';

	$: if ($userStore === null && browser) goto('/admin/signin');
</script>

{#if $userStore === undefined}
	<Loading />
{:else if $userStore !== undefined && $userStore !== null}
	<div class="flex min-h-screen">
		<Sidebar />
		<div class="min-h-screen w-full bg-blue-50">
			<div class="w-full navbar bg-base-100">
				<div class="flex-none lg:hidden">
					<div class="btn btn-square btn-ghost drawer-button lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline-block w-6 h-6 stroke-current"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/></svg
						>
					</div>
				</div>
				<div class="flex-1 px-2 mx-2 text-blue-500 font-medium text-base">
					<span class="text-yellow-400 pr-2">km602</span>Carwash
				</div>
			</div>
			<div class="card-body">
				<slot />
			</div>
		</div>
	</div>
{/if}
