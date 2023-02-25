<script>
    import { db } from '$lib/firebase.js';
    import { collection, query, onSnapshot } from 'firebase/firestore';
    import { onMount } from 'svelte'; 
	import HistoryItem from './HistoryItem.svelte';


    let transactHistory = [];

    onMount(() => {
        const unsubscribe = onSnapshot(collection(db, 'report'), (querySnapshot) => {
        transactHistory = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
        });
        return () => unsubscribe();
    })
</script>

<table class="min-w-max w-full table-auto shadow-lg my-6">
    <thead class="">
        <tr class="text-gray-700 uppercase text-xs leading-normal" style="background-color: #f2f2f2;">
            <th class="rounded-tl-lg">Date & Time</th>
            <th class="py-4 px-6 text-left">ID</th>
            <th class="py-4 px-6 text-left">Customer</th>
            <th class="px-6 text-left">Where</th>
            <th class="rounded-tr-lg py-3 px-6 text-left"></th>
        </tr>
    </thead>
    <tbody>
        {#each transactHistory as history}
        <tr class="border-b border-gray-200 bg-base-100 hover:bg-gray-200">
            <HistoryItem {history}/>
        </tr>
        {/each}
    </tbody>
</table>