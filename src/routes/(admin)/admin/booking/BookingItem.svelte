<script>
	import { formatDateTime } from '$lib/utils';
	import { doc, updateDoc, where, query, collection, getDocs } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import InputWorkers from '../transactions/InputWorkers.svelte';

	export let booking;
	let amount;
    let change = 0;
    let tip = 0;
	let selected;
	let transactModal = false;
	let selectWorkerModal = false;
	let view = {};
	


	// coconfirm booking status
	async function confirmBooking(id, date, time){

		const q = query(collection(db, 'bookings'), where('date', '==', date), where('time', '==', time), where('finish', '==', 'confirm'));
		const querySnapshot = await getDocs(q);
		// const bookings_on_date = querySnapshot.docs.map((doc) =>({...doc.data(), id: doc.id}));
		console.log(querySnapshot.size);

		if(querySnapshot.size < 5){
			await updateDoc(doc(db, 'bookings', id),{
				finish: 'confirm',
			});
		}else{
			alert(date + ' at ' + time + ' time slot has already filled');
		}
	}


	//pinass yung booking.price para mapass sa confirmworker
	let process_worker_pay;
	function processWorker(id, price){
		selectWorkerModal = true;
		
		process_worker_pay ={id: id, price: price};
	}


	// issave yung mga nagwork sa booking
	async function confirmWorker(id){
		let selected_workers = [];
		try{

			const q = query(collection(db, 'employee'), where('name', 'in', selected));
			const querySnapshot = await getDocs(q);
			selected_workers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			console.log(selected);


			selectWorkerModal = false;
			await updateDoc(doc(db, 'bookings', id),{
				finish: 'on process',
				workers: selected_workers,
			});
			
			
		} catch(error){
			console.log(error);
		}
		
	}



	// ppass mga data sa view para maview sa transact modal
	function processTransact(id, name, what, vehicle, price, workers){
		transactModal = true;
		view = {id:id, name:name, what: what, vehicle: vehicle, price:price, workers:workers};
		console.log(view.workers.map(worker => worker.name).join(', '));
	}


	// process salary emp print receipt
	async function print(id, workers) {
		try {
			const divisionOfPay = Number(parseFloat((view.price/2)/workers.length).toFixed(2));
			const divisionOfTip = Number(parseFloat(tip/workers.length).toFixed(2));
			let sumOfpay = 0;
			let totalPay = 0;
			let sumOfTip = 0;
			
			workers.forEach(async (worker)=>{
				sumOfpay = divisionOfPay + worker.pay;
				sumOfTip = divisionOfTip + worker.tip;
				totalPay = sumOfTip + sumOfpay;
				console.log(totalPay, sumOfpay, sumOfTip);

				await updateDoc(doc(db, 'employee', worker.id), {
					pay: sumOfpay,
					tip: sumOfTip,
					total: totalPay
				});
			})

			transactModal = false;
			await updateDoc(doc(db, 'bookings', id),{
				finish: 'done'
			});
			
			amount='';
			change=0;
		} catch (error) {
			console.log(error);
			alert(error);
		}
	}

</script>

<td class="px-3 py-3">{booking.name}</td>
<td class="px-3 py-3">{booking.vehicle}</td>
<td class="px-4 py-3">{booking.what}</td>
<td class="px-3 py-3 text-center">
	{formatDateTime(booking.date, booking.time)}
</td>

<td class="px-4 py-3 text-center">
	<span class="py-1 px-3 rounded-full text-xs font-bold 
	{booking.finish==='pending'? 'bg-red-100 text-red-700' 
	: booking.finish === 'confirm' ? 'bg-blue-100 text-blue-700'
	: booking.finish === 'on process' ? 'bg-orange-100 text-orange-700'
	: 'bg-green-100 text-green-700'
	}
	">{booking.finish}</span>
</td>
<td class="px-3 py-3">
	<div  class="flex items-center space-x-4 text-sm">
	<div class="dropdown dropdown-end">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<label for='' tabindex="0" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="currentColor" class="w-5 h-5">
			<path d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
		</svg>
		</label>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
			{#if booking.finish === 'on process'}
				<li><button on:click={processTransact(booking.id, booking.name, booking.what, booking.vehicle, booking.price, booking.workers)}
					>Process Transaction</button></li>
			{:else if booking.finish === 'confirm'}
				<li><button on:click={processWorker(booking.id, booking.price)}
					>Process Transaction</button></li>
			{:else if booking.finish === 'pending'}
				<li><button on:click={confirmBooking(booking.id, booking.date, booking.time)}
					>Confirm</button></li>
			{/if}
		</ul>
	</div>
	</div>
</td>



<input type="checkbox" class="modal-toggle" bind:checked={transactModal}/>
{#if transactModal}
<div class="modal">
  <div class="modal-box  w-11/12 max-w-xl">
    <h3 class="font-bold text-lg">Transaction Summary</h3>
    <hr class="my-2" />
	<!-- <InputWorkers bind:selected/>	 -->
    <div class="grid grid-cols-2 mt-2 mb-2">
      <div class="font-semibold">
          <p class="my-2">Transaction ID:</p>
          <p class="my-2">Customer Name:</p>
          <p class="my-2">Vehicle Type:</p>
          <p class="my-2">Service Type:</p>
		  <p class="my-2">Workers:</p>
          <p class="my-2">Total Amount:</p>
          <p class="mt-16 mb-2">Amount:</p>
          <p class="my-2">Tip:</p>
          <p class="my-2">Change:</p>
      </div>
      <div>
          <p class="my-2">{view.id}</p>
          <p class="my-2">{view.name}</p>
          <p class="my-2">{view.vehicle}</p>
          <p class="my-2">{view.what}</p>
		  <p class="my-2">
			{view.workers.map(worker => worker.name).join(', ')}
		</p>
          <p class="my-2">{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(
			view.price
		)}</p>
          <input type="text" placeholder="Enter amount here" class="input input-bordered input-sm w-36 mt-12 mb-1" on:change={()=>change= amount-view.price} bind:value={amount}/>
          <input type="text" placeholder="Enter tip here" class="input input-bordered input-sm w-36 mb-1" on:change={()=>change= (amount-view.price)-tip} bind:value={tip}/>
          <input type="text" disabled value="₱ {change}" class="input input-bordered input-sm w-36 " />
      </div>
  </div>


    <div class="modal-action">
      <button on:click={()=>transactModal=false} class="btn btn-ghost rounded-full">cancel</button>
      <button on:click={print(view.id, view.workers)}
	  class="btn btn-ghost bg-yellow-400 text-white rounded-full hover:bg-yellow-300 px-8">print</button>
    </div>
  </div>
</div>
{/if}



<!-- on process modal (selecting employee)-->
<input type="checkbox" class="modal-toggle" bind:checked={selectWorkerModal}/>
{#if selectWorkerModal}
<div class="modal">
	<div class="modal-box  w-11/12 max-w-xl">
	  <h3 class="font-bold text-lg">Please Select Worker</h3>
	  <hr class="my-2" />
	  <InputWorkers bind:selected/>	
		<div class="modal-action">
			<button on:click={()=>selectWorkerModal=false} class="btn btn-ghost rounded-full">cancel</button>
			<button on:click={confirmWorker(process_worker_pay.id, process_worker_pay.price)}
			class="btn btn-ghost bg-yellow-400 text-white rounded-full hover:bg-yellow-300 px-8">done</button>
	  	</div>
	</div>
</div>
{/if}