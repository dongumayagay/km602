<script>
	import InputDate from './InputDate.svelte';
	import InputEmail from './InputEmail.svelte';
	import InputName from './InputName.svelte';
	import InputService from './InputService.svelte';
	import InputTime from './InputTime.svelte';
	import InputVehicle from './InputVehicle.svelte';
	import { db } from '$lib/firebase';
	import { addDoc, collection } from 'firebase/firestore';

	let vehicleType = '';
	let price = '';

	async function submitHandler(event) {
		const form = event.target;
		const formData = new FormData(form);
		const booking = Object.fromEntries(formData);
		booking.price = Number(price);
		booking.createdAt = new Date();

		try {
			await addDoc(collection(db, 'bookings'), booking);
			form.reset();
			alert('booked successfully');
		} catch (error) {
			console.log(error);
			alert(error);
		}
	}
</script>

<div class="col-span-2 bg-white rounded-lg p-8 drop-shadow-xl">
	<p class="font-semibold text-black">Fill out your details</p>
	<hr class="my-2" />
	<form on:submit|preventDefault={submitHandler} class="lg:grid lg:grid-cols-2 gap-4 py-4">
		<InputName />
		<InputEmail />
		<InputVehicle bind:vehicleType />
		<InputService bind:vehicleType bind:price />
		<InputDate />
		<InputTime />
		<div class="pt-4">
			<button
				class="btn btn-ghost bg-info hover:bg-info/75 text-white px-8 capitalize rounded-full text-base"
				>Proceed
				{#if price}
					<span
						>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(
							price
						)}</span
					>
				{/if}
			</button>
		</div>
	</form>
</div>
