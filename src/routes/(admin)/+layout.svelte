<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { userStore } from '$lib/stores';
	import Loading from './Loading.svelte';
	import Sidebar from './Sidebar.svelte';
	
	export let show = false;

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
				<label class="btn btn-ghost swap swap-rotate lg:hidden">
					<input type="checkbox" bind:checked={show}/>
					<svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
					<svg class="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
				</label>
			</div>
			<div class="card-body h-[90vh] overflow-auto">
				<slot />
			</div>
		  <!-- <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label> -->
		</div> 
		<div class="lg:static {show?'absolute':'static'}">
		  <Sidebar bind:show={show}/>
		</div>
	</div>
{/if}
