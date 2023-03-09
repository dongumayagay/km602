<script>
    import { db } from '$lib/firebase.js';
    import { collection, query, onSnapshot, updateDoc, doc } from 'firebase/firestore';
    import { onMount } from 'svelte'; 
	import ReportItem from "./ReportItem.svelte";


    let reports = [];


    onMount(() => {
        const unsubscribe = onSnapshot(collection(db, 'reports'), (querySnapshot) => {
            reports = querySnapshot.docs.map((doc) => ( ({id: doc.id, ...doc.data() })));
            querySnapshot.forEach(async (snapshot) => {
            const data = snapshot.data();
            const revenue = data.revenue;
            const expenses = data.expenses;
            const profit = revenue - expenses;
            console.log('Profit:', profit);
            await updateDoc(doc(db, 'reports', snapshot.id), { profit: profit });
            });
        });

        return () => unsubscribe();
        });




</script>



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
        {#each reports as report, i}
        <tr class="border-b border-gray-200 bg-base-100 hover:bg-gray-200">
            
                <td class="py-4 px-6 text-left font-bold text-sm">{i+1}</td>
                <ReportItem {report} />
            
        </tr>
        {/each}
    </tbody>
</table>