<script>
	import { formatDate } from '$lib/utils';
	let data;
</script>

<!-- summary  -->
<div
	class="bg-white border-gray-300 text-black font-semibold grid content-between rounded-lg p-8 my-16 lg:m-0 drop-shadow-xl"
>
	<div>
		<p class=" text-black text-center mb-6">Total reservation summary</p>
		<p class="label label-text p-0 mb-2">
			<span>Date: {!data ? `` : data.dateNow}</span>
			<span>Status: <span class=" text-red-500">{!data ? `` : data.status}</span></span>
		</p>
		<p class="text-sm py-1">
			Customer's Name: <span class="font-normal">{!data ? `` : data.name}</span>
		</p>
		<p class="text-sm py-1">
			Vehicle Type: <span class="font-normal">{!data ? `` : data.vehicle}</span>
		</p>
		<p class="text-sm py-1">
			Date of Reservation: <span class="font-normal">{!data ? `` : formatDate(data.date)}</span>
		</p>
		<p class="text-sm py-1">
			Time of Reservation: <span class="font-normal">{!data ? `` : data.time}</span>
		</p>
		<p class="label p-0 mt-6  label-text">
			<span>Description</span>
			<span>Price</span>
		</p>
		<p class="label p-0 my-1">
			<span class="text-sm py-1 font-normal">{!data ? `` : data.wash}</span>
			<span class="text-sm py-1 font-normal">₱ {!data ? `0.00` : data.price}</span>
		</p>
		<hr class="my-2" />
		<p class="text-right text-sm">
			Total Amount: <span class="text-sm text-red-500 py-1 ml-5"
				>₱ {!data ? `0.00` : data.price}</span
			>
		</p>
	</div>

	<div class="mt-5 lg:mt-0">
		<button
			disabled={!data ? true : false}
			class="btn btn-ghost text-white capitalize text-base bg-yellow-400 hover:bg-yellow-300 btn-block rounded-full"
			>confirm</button
		>
	</div>
</div>
