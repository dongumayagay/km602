<script>
    import { db } from '$lib/firebase.js';
    import { collection, onSnapshot } from 'firebase/firestore';
    import { onMount } from 'svelte';
    import { createSearchStore, searchHandler } from '$lib/stores.js';
	import ExpensesItem from './ExpensesItem.svelte';


    let listOfExp = [];
    

    let searchExp;
    let searchStore;
    let unsubscribe;
    onMount(() => {
        unsubscribe = onSnapshot(collection(db, 'expenses'), (querySnapshot) => {
        listOfExp = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        searchExp = listOfExp.map((exp) => ({
				...exp,
				searchTerms: `${exp.categories} ${exp.date} ${exp.description}`
			}))
			searchStore = createSearchStore(searchExp);

			unsubscribe = searchStore.subscribe((model) => searchHandler(model));

        });
        return () => unsubscribe();
    })

</script>


{#if $searchStore}
<div class="flex justify-end">
    <input bind:value={$searchStore.search} type="search" placeholder="Search here" class="input input-bordered w-full max-w-xs" />
</div>
<table class="min-w-max w-full table-auto shadow-lg my-6">
    <thead class="">
        <tr class="text-gray-700 uppercase text-xs leading-normal" style="background-color: #f2f2f2;">
            <th class="rounded-tl-lg "></th>
            <th class="py-4 px-6 text-left">Date</th>
            <th class="py-4 px-6 text-left">Description</th>
            <th class="py-4 px-6 text-left">Category</th>
            <th class="py-4 px-6 text-left">Total</th>
            <th class="rounded-tr-lg py-3 px-2 text-left"></th>
        </tr>
    </thead>
    <tbody class="text-base">
      {#each $searchStore.filtered as exp, i}
        <tr class="border-b border-gray-200 bg-base-100 hover:bg-gray-200">
            <td class="py-4 px-6 text-left font-bold text-sm">{i+1}</td>
            <ExpensesItem {exp}/>
        </tr>
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