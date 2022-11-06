<script>
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Dashboard from './Dashboard.svelte';
	import Transactions from './Transactions.svelte';
	import Booking from './Booking.svelte';
	import Customer from './Customer.svelte';
	import Employee from './Employee.svelte';
	import Reports from './Reports.svelte';
	import Settings from './Settings.svelte';
	import { page } from '$lib/stores';
</script>


<!-- <main> -->
	<div class="flex">
		<Sidebar />

		<div class="min-h-screen w-full bg-blue-50">
			<div class="w-full navbar bg-base-100">
				<div class="flex-none lg:hidden">
					<div class="btn btn-square btn-ghost drawer-button lg:hidden">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
					</div>
				</div>
				<div class="flex-1 px-2 mx-2 text-blue-500 font-medium text-base"><span class="text-yellow-400 pr-2">km602</span>Carwash</div>
			</div>
			<div class="card-body overflow-auto">
				{#if $page === 'dashboard'}
				<Dashboard />
				{:else if $page === 'transactions'}
				<Transactions />
				{:else if $page === 'booking'}
				<Booking />
				{:else if $page === 'customer'}
				<Customer />
				{:else if $page === 'report'}
				<Reports />
				{:else if $page === 'employee'}
				<Employee />
				{:else if $page === 'settings'}
				<Settings />
				{/if}
			</div>
		</div>
	</div>
<!-- </main> -->
