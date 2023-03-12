<script>
    import { db } from '$lib/firebase.js';
    import { collection, query, onSnapshot, updateDoc, doc, orderBy } from 'firebase/firestore';
    import { createSearchStore, searchHandler } from '$lib/stores.js';
    import { onMount } from 'svelte'; 
	import ReportItem from "./ReportItem.svelte";


    let reports = [];

    let searchReport;
    let searchStore;
    let unsubscribe;


    // for pagination
    let pageSize = 10;
    let currentPage = 0;
    let data;
    let pageData;
    onMount(() => {
        unsubscribe = onSnapshot(query(collection(db, 'reports'), orderBy('date', 'desc')), (querySnapshot) => {
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
    });




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
    <span class="font-semibold text-2xl mb-8">Reports</span>
    <input bind:value={$searchStore.search} type="search" placeholder="Search here" class="input mt-6 lg:mt-0 md:mt-0 input-bordered w-full max-w-xs" />
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
        {#each pageData as report, i}
        <tr class="border-b border-gray-200 bg-base-100 hover:bg-gray-200">
            
                <td class="py-4 px-6 text-left font-bold text-sm">{i + 1 + currentPage * pageSize}</td>
                <ReportItem {report} />
            
        </tr>
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