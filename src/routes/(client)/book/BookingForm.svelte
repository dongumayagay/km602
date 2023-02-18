<script>
	import InputDate from './InputDate.svelte';
	import InputEmail from './InputEmail.svelte';
	import InputName from './InputName.svelte';
	import InputService from './InputService.svelte';
	import InputTime from './InputTime.svelte';
	import InputVehicle from './InputVehicle.svelte';
	import { db } from '$lib/firebase';
	import { addDoc, collection } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let booking = {
		name: "",
		email: "",
		vehicle: "",
		what: "",
		date: "",
		time: "",
		createdAt: null,
		price: 0,
		finish: false,
	}

	onMount(()=>{
		const savepref = localStorage.getItem('savepref');

		if(savepref === null){
			return
		}

		booking = {...booking, ...JSON.parse(savepref)}

	})

	async function submitHandler() {
		booking.createdAt = new Date();

		console.log(booking);

		const savepref = {
			name: booking.name,
			email: booking.email,
			vehicle: booking.vehicle,
			what: booking.what,
		};
		localStorage.setItem('savepref', JSON.stringify(savepref));
		

		try {
			await addDoc(collection(db, 'bookings'), booking);
			alert('booked successfully');
			location = location;
		} catch (error) {
			console.log(error);
			alert(error);
		}
	}
</script>

<div class="lg:col-start-2 lg:col-span-4 bg-white rounded-lg p-8 drop-shadow-xl">
	<p class="font-semibold text-black">Fill out your details</p>
	<hr class="my-2" />
	<form on:submit|preventDefault={submitHandler} class="lg:grid lg:grid-cols-2 gap-4 py-4">
		<InputName bind:name={booking.name}/>
		<InputEmail bind:email={booking.email}/>
		<InputVehicle bind:vehicleType={booking.vehicle} />
		<InputService bind:what={booking.what} bind:price={booking.price} vehicleType={booking.vehicle} />
		<InputDate bind:date={booking.date} />
		<InputTime bind:time={booking.time} date={booking.date} />
		<div class="pt-4">
			<button
				class="btn btn-ghost bg-info hover:bg-info/75 text-white px-8 capitalize rounded-full text-base"
				>Proceed
				{#if booking.price}
					<span class="ml-2"
						>- {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(
							booking.price
						)}</span
					>
				{/if}
			</button>
		</div>
	</form>
</div>
