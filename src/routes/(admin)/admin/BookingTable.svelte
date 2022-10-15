<script>
	import { collection, query, onSnapshot } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { formatDateTime } from '$lib/utils';

	let bookings = [];

	const q = query(collection(db, 'bookings'));
	const unsubscribe = onSnapshot(q, (querySnapshot) => {
		bookings = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	});
</script>

<div class="overflow-x-auto">
	<table class="table w-full">
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>EMAIL</th>
				<th>PACKAGE</th>
				<th>DATETIME</th>
				<th>IS FINISH?</th>
				<!-- <th>TIME</th> -->
			</tr>
		</thead>
		<tbody>
			{#each bookings as booking}
				<tr>
					<th>{booking.id}</th>
					<td>{booking.name}</td>
					<td>{booking.email}</td>
					<td>{booking.what}</td>
					<td>
						{formatDateTime(booking.date, booking.time)}
					</td>
					<td>{booking.finish}</td>
					<!-- <td>{booking.time}</td> -->
				</tr>
			{:else}
				<h1>No carwash reservation yet</h1>
			{/each}
		</tbody>
	</table>
</div>
