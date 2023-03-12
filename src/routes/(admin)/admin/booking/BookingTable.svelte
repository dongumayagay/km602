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

	// for pagination
	let pageSize = 10;
    let currentPage = 0;
    let data;
    let pageData;

	onMount(()=>{

		unsubscribe = onSnapshot(q, (querySnapshot) => {
			bookings = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

			searchBooking = bookings.map((book) => ({
				...book,
				searchTerms: `${book.name} ${book.email}`
			}))
			searchStore = createSearchStore(searchBooking);

			unsubscribe = searchStore.subscribe((model) => searchHandler(model));


			//pass search store to data
			unsubscribe = searchStore.subscribe(searchStore => {
				if (searchStore.filtered && searchStore.filtered.length) {
					// currentPage = 0;
					data = searchStore.filtered;
				}else{
					data = [];
				}
			})
			


		});

		return () => unsubscribe();

	})


	$: if (data) {
        pageData = data.slice(currentPage * pageSize, currentPage * pageSize + pageSize);
    }

	
    function totalPages(){
        return Math.ceil($searchStore.filtered.length / pageSize);
    }

    function nextPage() {
        if (currentPage < totalPages() - 1) {
            currentPage++;
            pageData = data.slice(currentPage * pageSize, currentPage * pageSize + pageSize);
        }
    }

    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
            pageData = data.slice(currentPage * pageSize, currentPage * pageSize + pageSize);
        }
    }

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

	<tbody class="text-sm">
        {#each pageData as booking, i}
			{#if booking.finish == 'confirm'  || booking.finish == 'pending'}
				<tr class="border-b border-gray-200 bg-base-100 hover:bg-gray-200">
					<td class="py-4 px-6 text-left font-bold text-sm">{i + 1 + currentPage * pageSize}</td>
					<BookingItem {booking} />
				</tr>
			{/if}
		{/each}
    </tbody>
</table>

{#if $searchStore.filtered.length === 0  }
	<center>
		<p class="text-center font-semibold">No data to display</p>
		<img alt="no_data" src="/img/no_data.svg" class="w-1/4 my-4">
	</center>

{:else}


	<div class="flex flex-1 items-center justify-between">
		<div>
		<p class="text-sm text-gray-700">
			Showing
			<span class="font-medium">{currentPage+1}</span>
			to
			<span class="font-medium">{pageSize}</span>
			of
			<span class="font-medium">{$searchStore.filtered.length}</span>
			results
		</p>
		</div>
		<div class="flex gap-2">
			<button on:click={prevPage} class=" rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
			<button on:click={nextPage} class=" rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
		</div>
	</div>

{/if}

{/if}