<script>
	import { booking_times } from '$lib/constants';
	import { collection, getDocs, query, where } from 'firebase/firestore';
	import { db } from '$lib/firebase';

	export let date;
	let available_times = [];

	const bookingCollectionReference = collection(db, 'bookings');
	async function getBookTimesInADate(date) {
		const q = query(bookingCollectionReference, where('date', '==', date));
		const querySnapshot = await getDocs(q);
		const already_booked_times = querySnapshot.docs.map((doc) => doc.data().time);
		available_times = booking_times.filter((item) => !already_booked_times.includes(item));
	}

	$: if (!!date) getBookTimesInADate(date);
</script>

<div class="form-control">
	<label for="#" class="label font-medium">
		<span class="label-text">Time <span class="text-red-500 font-extrabold">*</span></span>
	</label>
	<select required name="time" class="select w-full max-w-md select-bordered">
		<option disabled selected value="">Pick your time</option>
		{#each available_times as value}
			<option {value}>{value}</option>
		{/each}
	</select>
</div>
