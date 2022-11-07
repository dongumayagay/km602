<script>
	import InputDate from './InputDate.svelte';
	import InputEmail from './InputEmail.svelte';
	import InputName from './InputName.svelte';
	import InputService from './InputService.svelte';
	import InputTime from './InputTime.svelte';
	import InputVehicle from './InputVehicle.svelte';

	let vehicleType = '';
	let price = '';

	function submitHandler(event) {
		const formData = new FormData(event.target);
		const booking = Object.fromEntries(formData);
		booking.price = Number(price);
		console.log(booking);
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

		<!-- <input
			required
			name="status"
			value="Reserved"
			type="text"
			class="input input-bordered max-w-lg hidden"
		/> -->
		<!-- <input required name="dateNow" type="text" class="input input-bordered max-w-lg hidden" /> -->
		<!-- value={date} -->
		<!-- <input required name="timeNow" type="text" class="input input-bordered max-w-lg hidden" /> -->
		<!-- value={time} -->
		<!-- <input required name="wash" type="text" class="input input-bordered max-w-lg hidden" /> -->
		<!-- value={wash.wash} -->
		<!-- <input required name="price" type="text" class="input input-bordered max-w-lg hidden" /> -->
		<!-- value={wash.price} -->
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
