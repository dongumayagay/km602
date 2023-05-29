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
	import { sendEmail } from '$lib/utils'; 

	let booking = {
		name: "",
		email: "",
		vehicle: "",
		what: "",
		date: "",
		time: "",
		createdAt: null,
		price: 0,
		finish: "pending",
		seen: false,
	}

	let isVehicleSet = false;
	let isDateSet = false;

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
			price: booking.price,
		};
		localStorage.setItem('savepref', JSON.stringify(savepref));
		

		try {
			let htmlStr = `Dear ${booking.name},<br><br>Thank you for booking a carwash with us. Your booking details are as follows:<br><br><b>Date: ${booking.date} </b><br><b>Time: ${booking.time}</b><br><b>Location: Purok 7, Brgy. Ariman, Gubat, Sorsogon</b><br><br>We have received your request and we will do our best to accommodate your preferred time and date. However, please note that your booking is subject to availability. We will confirm your booking within the next 24 hours.<br><br>Please wait for our confirmation email before coming to the carwash. If you do not receive a confirmation from us, please contact us as soon as possible to avoid any inconvenience.<br><br>Thank you for choosing our carwash service. We look forward to seeing you soon.<br><br>Best regards,<br><br><b>Km602 Carwash</b>`;
			alert('Booked successfully. Please check your email');
			await addDoc(collection(db, 'bookings'), booking);
			const result = await sendEmail({
				to: booking.email,
				subject: 'Carwash Booking Confirmation',
				html: htmlStr
        	});
			console.log(JSON.stringify(result));
			location = location;
		} catch (error) {
			console.log(error);
			alert(error);
		}
	}
</script>

<div class="lg:col-start-2 lg:col-span-4 lg:p-8">
	<p class="font-semibold text-black">Fill out your details</p>
	<hr class="my-2" />
	<form on:submit|preventDefault={submitHandler} class="lg:grid lg:grid-cols-2 gap-4 py-4">
		<InputName bind:name={booking.name}/>
		<InputEmail bind:email={booking.email}/>
		<InputVehicle bind:vehicleType={booking.vehicle} bind:isVehicleSet={isVehicleSet}/>
		<InputService bind:what={booking.what} bind:price={booking.price} vehicleType={booking.vehicle} bind:isVehicleSet={isVehicleSet}/>
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
