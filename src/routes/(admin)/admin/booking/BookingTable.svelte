<script>
	import { collection, query, onSnapshot, where, orderBy } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import BookingItem from './BookingItem.svelte';
    import { createSearchStore, searchHandler } from '$lib/stores.js';
	import { onMount } from 'svelte';

	let bookings = [];

	let searchBooking;
    let searchStore;
    let unsubscribe;
	const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));

	onMount(()=>{

		unsubscribe = onSnapshot(q, (querySnapshot) => {
			bookings = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

			searchBooking = bookings.map((book) => ({
				...book,
				searchTerms: `${book.name} ${book.email}`
			}))
			searchStore = createSearchStore(searchBooking);

			unsubscribe = searchStore.subscribe((model) => searchHandler(model));
		});

		return () => unsubscribe();

	})

</script>


{#if $searchStore}
<div class="lg:flex lg:justify-between md:flex md:justify-between lg:flex-row md:flex-row flex-col">
    <span class="font-semibold text-2xl mb-8">Bookings</span>
    <input bind:value={$searchStore.search} type="search" placeholder="Search here" class="input input-bordered mt-6 md:mt-0 lg:mt-0 w-full max-w-xs" />
</div>

<table class="min-w-max w-full table-auto shadow-lg my-6">
	<thead>
		<tr class="text-gray-700 uppercase text-xs leading-normal" style="background-color: #f2f2f2;">
            <th class="rounded-tl-lg"></th>
            <th class="py-4 px-4 text-left">Customer</th>
			<th class="py-4 px-4 text-center">Email</th>
            <th class="py-4 px-4 text-left">Vehicle</th>
            <th class="py-3 px-4 text-left">Wash Type</th>
			<th class="py-4 px-4 text-center">Date & Time</th>
            <th class="py-4 px-4 text-center">Status</th>
            <th class="rounded-tr-lg py-3 px-4 text-left"></th>
        </tr>
	</thead>
	<!-- <tbody>
		<tr>
			{#each bookings as booking}
				<th></th>
				<BookingItem {booking} />
			{:else}
				<h1>No carwash reservation yet</h1>
			{/each}
		</tr>
	</tbody> -->
	<tbody class="text-sm">
        {#each $searchStore.filtered as booking, i}
			{#if booking.finish == 'confirm'  || booking.finish == 'pending'}
				<tr class="border-b border-gray-200 bg-base-100 hover:bg-gray-200">
					<td class="py-4 px-6 text-left font-bold text-sm">{i+1}</td>
					<BookingItem {booking} />
				</tr>
			{/if}
		{/each}
    </tbody>
</table>

{#if $searchStore.filtered.length === 0  }
	<center>
		<p class="text-center font-semibold">No data shown</p>
		<img alt="no_data" src="/img/no_data.svg" class="w-1/4 my-4">
	</center>
{/if}

{/if}