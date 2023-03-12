<script>
    import { db } from '$lib/firebase.js';
    import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
	import EmployeeItem from './EmployeeItem.svelte';
    import { onMount } from 'svelte';
    import { createSearchStore, searchHandler } from '$lib/stores.js';
	import EmployeeReport from './EmployeeReport.svelte';

    let listOfEmp = [];

    let searchEmp;
    let searchStore;
    let unsubscribe;

    // for pagination
    let pageSize = 10;
    let currentPage = 0;
    let data;
    let pageData;

    onMount(() => {
        unsubscribe = onSnapshot(query(collection(db, 'employee'), orderBy('total', 'desc')), (querySnapshot) => {
        listOfEmp = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log(listOfEmp);
                
        searchEmp = listOfEmp.map((emp) => ({
            ...emp,
            searchTerms: `${emp.id} ${emp.name}`
        }))
        searchStore = createSearchStore(searchEmp);

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
<div class="flex-row lg:flex lg:justify-between">
    <EmployeeReport/>
    <input bind:value={$searchStore.search} type="search" placeholder="Search here..." class="input input-bordered lg:mt-0 mt-6 w-full max-w-xs" />
</div>
  <!-- <pre>{JSON.stringify($searchStore.filtered)}</pre> -->

<!-- <pre>{JSON.stringify($searchStore.filtered)}</pre> -->
<!-- <EmployeeReport {listOfEmp} /> -->


<table class="min-w-max w-full table-auto shadow-lg my-6">
    <thead class="">
        <tr class="text-gray-700 uppercase text-xs leading-normal" style="background-color: #f2f2f2;">
            <th class="rounded-tl-lg "></th>
            <th class="py-4 px-6 text-left">Name</th>
            <th class="py-4 px-6 text-left">Pay</th>
            <th class="py-4 px-6 text-center">Tip</th>
            <th class="py-4 px-6 text-center">Total</th>
            <th class="rounded-tr-lg py-3 px-2 text-left"></th>
        </tr>
    </thead>
    <tbody class="text-base">
      {#each pageData as emp, i}
        <tr class="border-b border-gray-200 bg-base-100 hover:bg-gray-200">
            <td class="py-4 px-6 text-left font-bold text-sm">{i + 1 + currentPage * pageSize}</td>
            <EmployeeItem {emp} />
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
