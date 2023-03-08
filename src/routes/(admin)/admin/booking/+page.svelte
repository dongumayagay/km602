<script>
	import BookingTable from './BookingTable.svelte';
</script>

<svelte:head>
	<title>Booking | km602</title>
</svelte:head>

<div class="flex justify-between">
    <span class="font-semibold text-2xl mb-8">Bookings</span>
    <input type="text" placeholder="Search here" class="input input-bordered w-full max-w-xs" />
</div>


<BookingTable />
