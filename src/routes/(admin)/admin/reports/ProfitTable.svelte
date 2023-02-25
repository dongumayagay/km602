<script>
    import { db } from '$lib/firebase.js';
    import { collection, query, onSnapshot, where } from 'firebase/firestore';
    import { onMount } from 'svelte'; 

    let needed = [];
    let reports = [];

    onMount(() => {
        const unsubscribe = onSnapshot(collection(db, 'profit_reports'), (querySnapshot) => {
        reports = querySnapshot.docs.map((doc) => ( {...doc.data() }));
        });
        
        return () => unsubscribe();
    })

    // const bookingCollectionReference = ;
	// 	const q = query(collection(db, 'report'), where('date', '==', date));
	// 	const querySnapshot =  getDocs(q);
	// 	const already_booked_times = querySnapshot.docs.map((doc) => doc.data().time);
	// 	available_times = booking_times.filter((item) => !already_booked_times.includes(item));
    // console.log(reports);
    // const q = query(collection(db, 'report'), where('date', '==', date));
		// const querySnapshot = await getDocs(q);
		// const already_booked_times = querySnapshot.docs.map((doc) => doc.data().time);
		// available_times = booking_times.filter((item) => !already_booked_times.includes(item));
</script>

<table class="min-w-max w-full table-auto shadow-lg my-6">
    <thead class="">
        <tr class="text-gray-700 uppercase text-xs leading-normal" style="background-color: #f2f2f2;">
            <th class="rounded-tl-lg font-semibold"></th>
            <th class="py-3 px-2 text-left">Date</th>
            <th class="py-3 px-2 text-left">Total Profit for the Day</th>
            <th class="py-4 px-6 rounded-tr-lg text-left">Download</th>
        </tr>
    </thead>
    <tbody>
        {#each reports as report, i}
        <tr class="border-b border-gray-200 bg-base-100 hover:bg-gray-200">
            <td class="py-4 px-6 text-left text-sm font-semibold">{i+1}</td>
            <td class="py-4 px-2 text-left text-sm">{report.date}</td>
            <td class="py-4 px-12 text-left text-sm">{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(
                report.profit
            )}</td>
            <td class="py-4 px-6 text-left text-sm">Click to download report</td>
        </tr>
        {/each}
    </tbody>
</table>