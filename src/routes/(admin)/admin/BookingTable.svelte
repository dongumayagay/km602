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

<table class="table table-auto min-w-max w-full overflow-x-auto">
	<thead>
		<tr>
			<th>ID</th>
			<th>Name</th>
			<th>EMAIL</th>
			<th>PACKAGE</th>
			<th>DATETIME</th>
			<th>IS FINISH?</th>
		</tr>
	</thead>
	<tbody>
		{#each bookings as booking}
			<BookingItem {booking} />
		{:else}
			<h1>No carwash reservation yet</h1>
		{/each}
	</tbody>
</table>