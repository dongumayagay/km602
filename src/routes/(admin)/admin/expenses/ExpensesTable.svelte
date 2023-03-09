<script>
    import { db } from '$lib/firebase.js';
    import { collection, onSnapshot } from 'firebase/firestore';
    import { onMount } from 'svelte';
	import ExpensesItem from './ExpensesItem.svelte';


    let listOfExp = [];
    
    onMount(() => {
        const unsubscribe = onSnapshot(collection(db, 'expenses'), (querySnapshot) => {
        listOfExp = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        return () => unsubscribe();
    })

</script>

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
      {#each listOfExp as exp, i}
        <tr class="border-b border-gray-200 bg-base-100 hover:bg-gray-200">
            <td class="py-4 px-6 text-left font-bold text-sm">{i+1}</td>
            <ExpensesItem {exp}/>
        </tr>
      {/each}
    </tbody>
</table>