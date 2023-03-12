<script>
	import { db } from '$lib/firebase.js';
	import { collection, onSnapshot, query, where } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import Charts from './reports/Charts.svelte';

	let daysOpen = 0;
	let empnumber = 0;
	let avecars = 0;
	let aveprofit = 0;
	let aveexpense = 0;

	//get the ave profit and expenses
	let sumProfit = 0;
	let sumExpense = 0;
	onMount(() => {
		const unsubscribe = onSnapshot(collection(db, 'reports'), (querySnapshot) => {
			const number = querySnapshot.size;
			daysOpen = number;
			//compute
			querySnapshot.forEach((snapshot) => {
				const data = snapshot.data();
				const profit = data.profit;
				const expense = data.expenses;
				sumProfit += profit;
				sumExpense += expense;
				aveprofit = sumProfit / daysOpen;
				aveexpense = sumExpense / daysOpen;
			});
		});

		return () => unsubscribe();
	});

	//get total emp
	onMount(() => {
		const unsubscribe = onSnapshot(collection(db, 'employee'), (querySnapshot) => {
			const number = querySnapshot.size;
			empnumber = number;
		});

		return () => unsubscribe();
	});

	//get the car washed per day
	onMount(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, 'transactions'), where('status', '==', 'done')),
			(querySnapshot) => {
				const number = querySnapshot.size;
				console.log(number / daysOpen);
				avecars = number / daysOpen;
			}
		);

		return () => unsubscribe();
	});
</script>

<svelte:head>
	<title>Dashboard | km602</title>
</svelte:head>

<span class="font-semibold text-2xl mb-8">Dashboard</span>

<div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
	<div class="flex items-center p-4 bg-white rounded-lg shadow-md">
		<div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full">
			<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
				<path
					d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
				/>
			</svg>
		</div>

		<div>
			<p class="mb-2 text-sm font-medium text-gray-600">Total workers</p>

			<p class="text-lg font-semibold text-gray-700">{empnumber}</p>
		</div>
	</div>

	<div class="flex items-center p-4 bg-white rounded-lg shadow-md">
		<div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
				<path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
				<path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
				<path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
			  </svg>
			  
			  
		</div>

		<div>
			<p class="mb-2 text-sm font-medium text-gray-600">Daily car wash average</p>

			<p class="text-lg font-semibold text-gray-700">{avecars.toFixed(2)}</p>
		</div>
	</div>

	<div class="flex items-center p-4 bg-white rounded-lg shadow-md">
		<div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
			<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
				<path
					d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
				/>
			</svg>
		</div>

		<div>
			<p class="mb-2 text-sm font-medium text-gray-600">Ave profit per day</p>

			<p class="text-lg font-semibold text-gray-700">₱ {aveprofit.toFixed(2)}</p>
		</div>
	</div>

	<div class="flex items-center p-4 bg-white rounded-lg shadow-md">
		<div class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20" fill="currentColor" class="w-5 h-5">
				<path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
				<path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clip-rule="evenodd" />
				<path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
			  </svg>
			  
		</div>

		<div>
			<p class="mb-2 text-sm font-medium text-gray-600">Ave expenses per day</p>

			<p class="text-lg font-semibold text-gray-700">₱ {aveexpense.toFixed(2)}</p>
		</div>
	</div>
</div>

<Charts />
