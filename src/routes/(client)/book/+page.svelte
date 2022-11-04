<script>
	import { db } from '$lib/firebase';
    import Footer from '$lib/components/Footer.svelte';
	import { collection, addDoc } from 'firebase/firestore';

	async function submitHandler(event) {
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		console.log(data);

		const bookingsCollectionReference = collection(db, 'bookings');
		try {
			const docRef = await addDoc(bookingsCollectionReference, {
				...data,
				finish: false
			});
			event.target.reset();
			console.log(docRef);
			alert('success');
		} catch (error) {
			console.log(error);
			alert(error);
		}
	}
</script>

<svelte:head>
	<title>Book | km602</title>
</svelte:head>

<main class="bg-blue-50">
	<div class="min-h-screen lg:px-16 px-4 text-sky-700">
		<p class="text-2xl py-16 text-center"><span class="font-bold">Booking </span> Carwash <span class="font-bold"> Reservation </span>Form</p>
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
						<select required name="vehicle" class="select w-full max-w-lg select-bordered">
							<option disabled selected>Type of Vehicle</option>
							<option>Motor</option>
							<option>Tricycle</option>
							<option>Sedan</option>
							<option>Van</option>
							<option>Jeep</option>
						</select>
					</div>

					<div class="form-control">
						<label for="#" class="label font-medium">
							<span class="label-text">Type of Service<span class="text-red-500 font-extrabold">*</span></span>
						</label>
						<select required name="what" class="select w-full max-w-lg select-bordered">
							<option disabled selected>Pick your service</option>
							<option>Full</option>
							<option>Inner Only</option>
							<option>Outer with wax</option>
							<option>Outer with no wax</option>
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
						<input required name="time" type="time" placeholder="time" class="input input-bordered max-w-lg" />
					</div>
					<div class="pt-4">
						<button class="btn btn-ghost bg-info hover:bg-info/75 text-white px-8 capitalize rounded-full text-base">Proceed</button>
					</div>
				</form>	
			</div>
			<div class="bg-white border-gray-300 text-black font-semibold grid content-between rounded-lg p-8 my-16 lg:m-0 drop-shadow-xl">
				
				
				<div>
					<p class=" text-black text-center mb-6">Total reservation summary</p>
					<p class="label label-text p-0 mb-2">
						<span>Date:</span>
						<span>Status:</span>
					</p>
					<p class="text-sm py-1">Customer's Name:</p>
					<p class="text-sm py-1">Vehicle Type:</p>
					<p class="text-sm py-1">Date of Reservation:</p>
					<p class="text-sm py-1">Time of Reservation:</p>					
					<p class="label p-0 mt-6  label-text">
						<span>Description</span>
						<span>Price</span>
					</p>
					<p class="label p-0 my-1">
						<span class="text-sm py-1">Type of wash</span>
						<span class="text-sm py-1">PHP</span>
					</p>
					<p class="label p-0 my-1">
						<span class="text-sm py-1">Type of wash</span>
						<span class="text-sm py-1">PHP</span>
					</p>
					<hr class="my-2">
					<p class="text-right text-sm">Total Amount: PHP</p>
				</div>
				
				<div class="mt-5 lg:mt-0">
					<button class="btn btn-ghost text-white capitalize text-base bg-yellow-400 hover:bg-yellow-300 btn-block rounded-full">confirm</button>
				</div>
			</div>
		</div>
		
	</div>

	<div class="h-40"></div>
</main>

<Footer />
