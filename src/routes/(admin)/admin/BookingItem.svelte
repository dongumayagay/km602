<script>
	import { formatDateTime } from '$lib/utils';
	import { doc, updateDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase';

	export let booking;

	async function toggleFinish() {
		console.log(!booking.finish);
		const bookingDocRef = doc(db, 'bookings', booking.id);
		try {
			await updateDoc(bookingDocRef, {
				finish: !booking.finish
			});
		} catch (error) {
			console.log(error);
			alert(error);
		}
	}
</script>

<tr>
	<th>{booking.id}</th>
	<td>{booking.name}</td>
	<td>{booking.email}</td>
	<td>{booking.what}</td>
	<td>
		{formatDateTime(booking.date, booking.time)}
	</td>
	<td>
		<label class="swap">
			<input on:change={toggleFinish} bind:checked={booking.finish} type="checkbox" />
			<div class="swap-on">DONE</div>
			<div class="swap-off">NOT DONE</div>
		</label>
	</td>
</tr>
