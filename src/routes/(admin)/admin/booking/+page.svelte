<script>
	import BookingTable from './BookingTable.svelte';
</script>

<div class="flex justify-between">
    <span class="font-semibold text-2xl mb-8">Bookings</span>
    <input type="text" placeholder="Search here" class="input input-bordered w-full max-w-xs" />
</div>


<BookingTable />
