<script>
    import { db } from '$lib/firebase.js';
    import { collection, query, onSnapshot, updateDoc, doc } from 'firebase/firestore';
    import { createSearchStore, searchHandler } from '$lib/stores.js';
    import { onMount } from 'svelte'; 
	import ReportItem from "./ReportItem.svelte";


    let reports = [];

    let searchReport;
    let searchStore;
    let unsubscribe;
    onMount(() => {
        unsubscribe = onSnapshot(collection(db, 'reports'), (querySnapshot) => {
            reports = querySnapshot.docs.map((doc) => ( ({id: doc.id, ...doc.data() })));
            querySnapshot.forEach(async (snapshot) => {
            const data = snapshot.data();
            const revenue = data.revenue;
            const expenses = data.expenses;
            const profit = revenue - expenses;
            console.log('Profit:', profit);
            await updateDoc(doc(db, 'reports', snapshot.id), { profit: profit });
            });

            searchReport = reports.map((report) => ({
            ...report,
            searchTerms: `${report.date}`
            }))
            searchStore = createSearchStore(searchReport);

            unsubscribe = searchStore.subscribe((model) => searchHandler(model));
        });

        return () => unsubscribe();
        });




</script>


{#if $searchStore}
<div class="flex justify-between">
    <span class="font-semibold text-2xl mb-8">Reports</span>
    <input bind:value={$searchStore.search} type="search" placeholder="Search here" class="input input-bordered w-full max-w-xs" />
</div>

<table class="min-w-max w-full table-auto shadow-lg my-6">
    <thead class="">
        <tr class="text-gray-700 uppercase text-xs leading-normal" style="background-color: #f2f2f2;">
            <th class="rounded-tl-lg "></th>
            <th class="py-4 px-6 text-left">Date</th>
            <th class="py-4 px-6 text-left">Revenue</th>
            <th class="py-4 px-6 text-center">Expenses</th>
            <th class="py-4 px-6 text-center">Profit</th>
            <th class="rounded-tr-lg py-3 px-2 text-left"></th>
        </tr>
    </thead>
    <tbody class="text-base">
        {#each $searchStore.filtered as report, i}
        <tr class="border-b border-gray-200 bg-base-100 hover:bg-gray-200">
            
                <td class="py-4 px-6 text-left font-bold text-sm">{i+1}</td>
                <ReportItem {report} />
            
        </tr>
        {/each}
    </tbody>
</table>
{/if}