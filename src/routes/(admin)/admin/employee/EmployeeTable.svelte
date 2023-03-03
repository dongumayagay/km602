<script>
    import { db } from '$lib/firebase.js';
    import { collection, onSnapshot } from 'firebase/firestore';
	import EmployeeItem from './EmployeeItem.svelte';
    import { onMount } from 'svelte';

    let listOfEmp = [];
    
    onMount(() => {
        const unsubscribe = onSnapshot(collection(db, 'employee'), (querySnapshot) => {
        listOfEmp = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        return () => unsubscribe();
    })
</script>


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
      {#each listOfEmp as emp, i}
        <tr class="border-b border-gray-200 bg-base-100 hover:bg-gray-200">
            <td class="py-4 px-6 text-left font-bold text-sm">{i+1}</td>
            <EmployeeItem {emp} />
        </tr>
      {/each}
    </tbody>
</table>
