<script>
	import { db } from '$lib/firebase';
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

<!-- <form on:submit|preventDefault={submitHandler} class=" bg-red-400 p-4 flex flex-col gap-4">
	<h1>BOOK NOW</h1>
	<select required name="what">
		<option>Package 1</option>
		<option>Package 2</option>
		<option>Package 3</option>
	</select>
	<input required type="date" name="date" id="" />
	<input required type="time" name="time" id="" />
	<input required type="text" name="name" id="" placeholder="enter your full name" />
	<input required type="email" name="email" id="" placeholder="enter your email address" />
	<button>Book now</button>
</form> -->

<main class="p-6 bg-blue-50 h-screen">
	<h1 class="font-semibold text-2xl pb-8">Booking Form</h1>
	<div class="card bg-base-100 shadow-xl mx-auto py-4">
		<div class="card-body">
			<h2 class="card-title">Fill out your details</h2>
			<hr>
			<form on:submit|preventDefault={submitHandler} class="grid grid-cols-2 gap-4 p-4">
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
				<div class="card-actions justify-end col-span-2 pt-4">
					<button class="btn btn-warning">Book Now</button>
				</div>
			</form>	
			
		</div>
		
		
	</div>
</main>
