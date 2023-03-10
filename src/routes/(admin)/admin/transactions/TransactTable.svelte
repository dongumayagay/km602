<script>
    import { db } from '$lib/firebase';
	import { collection, query, onSnapshot, where, orderBy } from 'firebase/firestore';
	import { onMount } from 'svelte';
    import { createSearchStore, searchHandler } from '$lib/stores.js';
    import TransactItem from './TransactItem.svelte';
    
    let transactions = [];

    let searchTransact;
    let searchStore;
    let unsubscribe;
    onMount(() => {
        unsubscribe = onSnapshot(query(collection(db, 'transactions'), orderBy('createdAt', 'desc')), (querySnapshot) => {
        transactions = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));

        
        searchTransact = transactions.map((transact) => ({
            ...transact,
            searchTerms: `${transact.id} ${transact.name}`
        }))
        searchStore = createSearchStore(searchTransact);

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
            <th class="rounded-tl-lg"></th>
            <th class="py-4 px-6 text-left">Customer</th>
            <th class="py-4 px-6 text-left">Vehicle</th>
            <th class="py-4 px-6 text-center">Date & Time</th>
            <th class="rounded-tr-lg py-3 px-6 text-left">Amount</th>
            <th class="py-4 px-6 text-center">Status</th>
            <th class="rounded-tr-lg py-3 px-6 text-left"></th>
        </tr>
    </thead>
    <tbody class="text-base">
        {#each $searchStore.filtered as transaction, i}
        <tr class="border-b border-gray-200 bg-base-100 hover:bg-gray-200">
            <td class="py-4 px-6 text-left font-bold text-sm">{i+1}</td>
            <TransactItem {transaction}/>
        </tr>
        {/each}
    </tbody>
</table>
{/if}