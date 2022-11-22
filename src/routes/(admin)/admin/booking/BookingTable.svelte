<script>
	import { collection, query, onSnapshot } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import BookingItem from './BookingItem.svelte';

	let bookings = [];

	const q = query(collection(db, 'bookings'));
	const unsubscribe = onSnapshot(q, (querySnapshot) => {
		bookings = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	});
</script>

<table class="min-w-max w-full table-auto shadow-lg my-6">
	<thead>
		<!-- <tr>
			<th>ID</th>
			<th>Name</th>
			<th>EMAIL</th>
			<th>PACKAGE</th>
			<th>DATETIME</th>
			<th>IS FINISH?</th>
		</tr> -->
		<tr class="text-gray-700 uppercase text-xs leading-normal" style="background-color: #f2f2f2;">
            <th class="rounded-tl-lg"></th>
            <th class="py-4 px-4 text-left">Customer</th>
            <th class="py-4 px-4 text-left">Email</th>
            <th class="py-4 px-4 text-center">Date & Time</th>
            <th class="py-3 px-4 text-left">wash Type</th>
            <th class="py-4 px-4 text-left">Amount</th>
            <th class="rounded-tr-lg py-3 px-4 text-left"></th>
        </tr>
	</thead>
	<!-- <tbody>
		<tr>
			{#each bookings as booking}
				<th></th>
				<BookingItem {booking} />
			{:else}
				<h1>No carwash reservation yet</h1>
			{/each}
		</tr>
	</tbody> -->
	<tbody class="text-sm">
        {#each bookings as booking, i}
			<tr class="border-b border-gray-200 bg-base-100 hover:bg-gray-200">
				<td class="py-4 px-6 text-left font-bold text-sm">{i+1}</td>
				<BookingItem {booking} />
			</tr>
        {/each}
    </tbody>
</table>
