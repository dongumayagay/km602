<script>
	import BookingForm from './BookingForm.svelte';
</script>

<svelte:head>
	<title>Book | km602</title>
</svelte:head>

<main class="bg-blue-50">
	<div class="min-h-screen lg:px-16 px-4 text-sky-700">
		<p class="text-2xl py-16">
			<span class="font-bold">Booking </span> Carwash
			<span class="font-bold"> Transaction </span>
		</p>


		<div class="lg:col-start-2 lg:col-span-4 bg-white rounded-lg p-4 mb-2 drop-shadow-lg"> 
			<div class="alert mb-2 lg:mb-0">
				<div>
				  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
				  <div>
					<h3 class="font-bold">Please Read First!</h3>
					<div class="text-sm">We would like to inform you that our service hours are from 8:00 am to 6:00 pm with 1-hour intervals. Please note that if the timeslot from 8:00 am to 6:00 pm is no longer available, it means that the timeslot is fully booked.</div>
				  </div>
				</div>
			</div>

				<BookingForm />

		</div>

	</div>

	<div class="h-40" />
</main>
