<script>
    import { db } from '$lib/firebase';
	import { addDoc, collection, query, onSnapshot, doc, updateDoc} from 'firebase/firestore';
    import TransactItem from './TransactItem.svelte';
    
    let transactions = [];

    const q = query(collection(db, 'transactions'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      transactions = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
    });

</script>


<table class="min-w-max w-full table-auto shadow-lg my-6">
    <thead class="">
        <tr class="text-gray-700 uppercase text-xs leading-normal" style="background-color: #f2f2f2;">
            <th class="rounded-tl-lg"></th>
            <th class="py-4 px-6 text-left">ID</th>
            <th class="py-4 px-6 text-left">Customer</th>
            <th class="py-4 px-6 text-center">Date & Time</th>
            <th class="rounded-tr-lg py-3 px-6 text-left">Amount</th>
            <th class="py-4 px-6 text-center">Status</th>
            <th class="rounded-tr-lg py-3 px-6 text-left"></th>
        </tr>
    </thead>
    <tbody class="text-base">
        {#each transactions as transaction, i}
        <tr class="border-b border-gray-200 bg-base-100 hover:bg-gray-200">
            <td class="py-4 px-6 text-left font-bold text-sm">{i+1}</td>
            <TransactItem {transaction}/>
        </tr>
        {/each}
    </tbody>
  </table>