<script>
	import { booking_times } from '$lib/constants';
	import { collection, doc, getDocs, query, where } from 'firebase/firestore';
	import { db } from '$lib/firebase';

	export let date;
	let available_times = [];
	export let time;

	const bookingCollectionReference = collection(db, 'bookings');
	async function getBookTimesInADate(date) {
		const q = query(bookingCollectionReference, where('date', '==', date));
		const querySnapshot = await getDocs(q);
		const bookings_on_date = querySnapshot.docs.map((doc) =>({...doc.data(), id: doc.id}));
		console.log(bookings_on_date);
		
		let tempobj ={};
		bookings_on_date.forEach((booking)=>{
			if (booking.finish === 'confirm'){
				if(tempobj[booking.time]){
					tempobj[booking.time] += 1;
				}else{
					tempobj[booking.time] = 1;
				}
			}
		})

		console.log(tempobj);
		let already_booked_times = [];
		for (let key in tempobj) {
			console.log('key', key, 'value', tempobj[key]);
			if(tempobj[key] == 5){
				already_booked_times.push(key);
			}
		}
		console.log(already_booked_times);
		available_times = booking_times.filter((item) => !already_booked_times.includes(item));
		
		// console.log(available_times);
		// const already_booked_times = querySnapshot.docs.map((doc) =>({...doc.data(), id: doc.id}));
		// console.log(already_booked_times);
		// available_times = booking_times.filter((item) => !already_booked_times.includes(item));
	}

	$: if (!!date) getBookTimesInADate(date);
</script>

<div class="form-control">
	<label for="#" class="label font-medium">
		<span class="label-text">Time <span class="text-red-500 font-extrabold">*</span></span>
	</label>
	<select bind:value={time} required name="time" class="select w-full max-w-md select-bordered">
		<option disabled selected value="">Pick your time</option>
		{#each available_times as value}
			<option {value}>{value}</option>
		{/each}
	</select>
</div>
