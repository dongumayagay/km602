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
	<div class="drawer drawer-mobile">
		<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content bg-blue-50">
		  <!-- Page content here -->
			<div class="w-full navbar bg-base-100">
				<div class="flex-1 px-2 mx-2 text-blue-500 font-medium text-base">
					<span class="text-yellow-400 pr-2">km602</span>Carwash
				</div>
			</div>
			<div class="card-body h-[628px] overflow-auto">
				<slot />
			</div>
		  <!-- <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label> -->
		</div> 
		<div class="lg:drawer-side">
		  <Sidebar />
		</div>
	</div>
{/if}
