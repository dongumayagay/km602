<script>
	import { formatDate, date, time } from '$lib/utils';
	import { db } from '$lib/firebase';
    import Footer from '$lib/components/Footer.svelte';
	import { collection, addDoc } from 'firebase/firestore';

	let data;
	let car = 'Type of Vehicle';
	let wash = 'Pick your service';
	let Booktime = [`8:00 am`,  `9:00 am`, `10:00 am`, `11:00 am`, `1:00 pm`, `2:00 pm`, `3:00 pm`, `4:00 pm`, `5:00 pm`, `6:00 pm`];
	let cars = [`Jeepney`, `Tricycle`, `SUV`, `Sedan`, `Van`, `Motorcycle`];
	let motor = [
      {wash: `Full wash`, price: 60},
      {wash: `Pressure wash only`, price: 30},
    ];
    let tric = [
      {wash: `Full wash`, price: 100},
      {wash: `Pressure wash only`, price: 50},
    ];
    let jeep = [
      {wash: `Full wash`, price: 250},
      {wash: `Pressure wash only`, price: 125},
    ];
    let sedan = [
      {wash: `Full wash`, price: 150},
      {wash: `Inner only`, price: 75},
      {wash: `Outer only`, price: 75}
    ];
    let suv = [
      {wash: `Full wash`, price: 200},
      {wash: `Inner only`, price: 100},
      {wash: `Outer only`, price: 100}
    ];
    let van = [
      {wash: `Full wash`, price: 230},
      {wash: `Inner only`, price: 115},
      {wash: `Outer only`, price: 115}
    ];


	async function submitHandler(event) {
		const formData = new FormData(event.target);
		data = Object.fromEntries(formData);
		console.log(data);

		// const bookingsCollectionReference = collection(db, 'bookings');
		// try {
		// 	const docRef = await addDoc(bookingsCollectionReference, {
		// 		...data,
		// 		finish: false
		// 	});
		// 	event.target.reset();
		// 	console.log(docRef);
		// 	alert('success');
		// } catch (error) {
		// 	console.log(error);
		// 	alert(error);
		// }
	}
</script>

<svelte:head>
	<title>Book | km602</title>
</svelte:head>

<main class="bg-blue-50">
	<div class="min-h-screen lg:px-16 px-4 text-sky-700">
		<p class="text-2xl py-16"><span class="font-bold">Booking </span> Carwash <span class="font-bold"> Reservation </span>Form</p>
		<div class="lg:grid lg:grid-cols-3 gap-8">
			<div class="col-span-2 bg-white rounded-lg p-8 drop-shadow-xl">
				<p class="font-semibold text-black">Fill out your details</p>
				<hr class="my-2">
				<form on:submit|preventDefault={submitHandler} class="lg:grid lg:grid-cols-2 gap-4 py-4">
					<div class="form-control">
						<label for="#" class="label">
							<span class="label-text font-medium">Full Name <span class="text-red-500 font-extrabold">*</span></span>
						</label>
						<input required name="name" type="text" placeholder="your full name" class="input input-bordered max-w-lg" />
					</div>
		
					<div class="form-control">
						<label for="#" class="label">
							<span class="label-text font-medium">Email<span class="text-red-500 font-extrabold">*</span></span>
						</label>
						<input required name="email" type="email" placeholder="email" class="input input-bordered max-w-lg" />
					</div>
		
					<div class="form-control">
						<label for="#" class="label font-medium">
							<span class="label-text">Vehicle Type<span class="text-red-500 font-extrabold">*</span></span>
						</label>
						<select required name="vehicle" class="select w-full max-w-lg select-bordered" bind:value={car}>
							<option disabled selected>Type of Vehicle</option>
							{#each cars as value}<option>{value}</option>{/each}
						</select>
					</div>

					<div class="form-control">
						<label for="#" class="label font-medium">
							<span class="label-text">Type of Service<span class="text-red-500 font-extrabold">*</span></span>
						</label>
						<select required class="select w-full max-w-lg select-bordered" bind:value={wash}>
							<option disabled selected>Pick your service</option>
							{#if car === `Sedan`}
								{#each sedan as value}<option {value}>{value.wash}</option>{/each}
							{:else if car === `SUV`}
								{#each suv as value}<option {value}>{value.wash}</option>{/each}
							{:else if car === `Van`}
								{#each van as value}<option {value}>{value.wash}</option>{/each}
							{:else if car === `Motorcycle`}
								{#each motor as value}<option {value}>{value.wash}</option>{/each}
							{:else if car === `Tricycle`}
								{#each tric as value}<option {value}>{value.wash}</option>{/each}
							{:else if car === `Jeepney`}
								{#each jeep as value}<option {value}>{value.wash}</option>{/each}
							{/if}
						</select>
					</div>
		
					<div class="form-control">
						<label for="#" class="label font-medium">
							<span class="label-text">Date <span class="text-red-500 font-extrabold">*</span></span>
						</label>
						<input required name="date" type="date" placeholder="date" class="input input-bordered max-w-lg" />
					</div>
		
					<div class="form-control">
						<label for="#" class="label font-medium">
							<span class="label-text">Time <span class="text-red-500 font-extrabold">*</span></span>
						</label>
						<select required name="time" class="select w-full max-w-lg select-bordered">
							<option disabled selected>Pick your time</option>
							{#each Booktime as value}<option>{value}</option>{/each}
						</select>
					</div>
					<input required name="status" value="Reserved" type="text" class="input input-bordered max-w-lg hidden" />
					<input required name="dateNow" value={date} type="text" class="input input-bordered max-w-lg hidden" />
					<input required name="timeNow" value={time} type="text" class="input input-bordered max-w-lg hidden" />
					<input required name="wash" value={wash.wash} type="text" class="input input-bordered max-w-lg hidden" />
					<input required name="price" value={wash.price} type="text" class="input input-bordered max-w-lg hidden" />
					<div class="pt-4">
						<button class="btn btn-ghost bg-info hover:bg-info/75 text-white px-8 capitalize rounded-full text-base">Proceed</button>
					</div>
				</form>	
			</div>

			<!-- summary -->
			<div class="bg-white border-gray-300 text-black font-semibold grid content-between rounded-lg p-8 my-16 lg:m-0 drop-shadow-xl">
				<div>
					<p class=" text-black text-center mb-6">Total reservation summary</p>
					<p class="label label-text p-0 mb-2">
						<span>Date: {!data? `` : data.dateNow}</span>
						<span>Status: <span class=" text-red-500">{!data? `` : data.status}</span></span>
					</p>
					<p class="text-sm py-1">Customer's Name: <span class="font-normal">{!data? `` : data.name}</span></p>
					<p class="text-sm py-1">Vehicle Type: <span class="font-normal">{!data? `` : data.vehicle}</span></p>
					<p class="text-sm py-1">Date of Reservation: <span class="font-normal">{!data? `` : formatDate(data.date)}</span></p>
					<p class="text-sm py-1">Time of Reservation: <span class="font-normal">{!data? `` : data.time}</span></p>					
					<p class="label p-0 mt-6  label-text">
						<span>Description</span>
						<span>Price</span>
					</p>
					<p class="label p-0 my-1">
						<span class="text-sm py-1 font-normal">{!data? `` : data.wash}</span>
						<span class="text-sm py-1 font-normal">₱ {!data? `0.00` : data.price}</span>
					</p>
					<hr class="my-2">
					<p class="text-right text-sm">Total Amount: <span class="text-sm text-red-500 py-1 ml-5">₱ {!data? `0.00` : data.price}</span></p>
				</div>
				
				<div class="mt-5 lg:mt-0">
					<button disabled={!data? true:false} class="btn btn-ghost text-white capitalize text-base bg-yellow-400 hover:bg-yellow-300 btn-block rounded-full">confirm</button>
				</div>
			</div>
		</div>
		
	</div>

	<div class="h-40"></div>
</main>

<Footer />
