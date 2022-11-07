<script>
	import BookingForm from './BookingForm.svelte';
	import BookingSummary from './BookingSummary.svelte';
</script>

<svelte:head>
	<title>Book | km602</title>
</svelte:head>

<main class="bg-blue-50">
	<div class="min-h-screen lg:px-16 px-4 text-sky-700">
		<p class="text-2xl py-16">
			<span class="font-bold">Booking </span> Carwash
			<span class="font-bold"> Reservation </span>Form
		</p>
		<div class="lg:grid lg:grid-cols-3 gap-8">
			<BookingForm />
			<!-- <BookingSummary /> -->
		</div>
	</div>

	<div class="h-40" />
</main>
