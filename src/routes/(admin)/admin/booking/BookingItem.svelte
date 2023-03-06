<script>
	import { formatDateTime, date, time } from '$lib/utils';
	import { doc, updateDoc, where, query, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import InputWorkers from '../transactions/InputWorkers.svelte';
	import { sendEmail } from '$lib/utils'; 

	export let booking;
	let amount;
    let change = 0;
    let tip = 0;
	let selected;
	let transactModal = false;
	let selectWorkerModal = false;
	let view = {};
	


	// coconfirm booking status
	async function confirmBooking(id, date, time, name, email){

		try{
			let htmlStr = `Dear ${name},<br><br>We are pleased to confirm your carwash booking. Your booking details are as follows:<br><br><b>Date: ${date} </b><br><b>Time: ${time}</b><br><b>Location: Purok 7, Brgy. Ariman, Gubat, Sorsogon</b><br><br>Please arrive on time for your appointment. If you are unable to make it, please let us know at least 24 hours in advance.<br><br>Please note that if you do not show up for your appointment in at least 24 hours in advance, it will be automatically cancelled. This is to ensure that we can accommodate other customers who are waiting in line. You can always book another appointment with us by visiting our <a href="https://km602.vercel.app/" target="_blank">website</a><br><br>We look forward to providing you with an excellent carwash service. If you have any questions or concerns, please do not hesitate to contact us.<br><br>Thank you for choosing our carwash service.<br><br>Best regards,<br><br><b>Km602 Carwash</b>`;
			const q = query(collection(db, 'bookings'), where('date', '==', date), where('time', '==', time), where('finish', '==', 'confirm'));
			const querySnapshot = await getDocs(q);
			// const bookings_on_date = querySnapshot.docs.map((doc) =>({...doc.data(), id: doc.id}));
			console.log(querySnapshot.size);

			if(querySnapshot.size < 5){
				await updateDoc(doc(db, 'bookings', id),{
					finish: 'confirm',
				});
				//send email
				const result = await sendEmail({
					to: email,
					subject: 'Carwash Booking Confirmed - Reminder on Cancellation Policy',
					html: htmlStr
        		});
			console.log(JSON.stringify(result));
			alert('Confirmed');

			}else{
				alert(date + ' at ' + time + ' time slot has already filled!');
			}
		}catch(error){
			console.log(error);
		}

	}



	//cacancel yung booking
	async function cancelBooking(id, name){
		if (confirm(`Are you sure you want to cancel the booking for ${name}?`)) {
			await deleteDoc(doc(db, 'bookings', id));
		}	
	}




	//pinass yung booking.price para mapass sa confirmworker
	let pass_transaction_details;
	function processWorker(id, name, vehicle, what, price, status){
		selectWorkerModal = true;
		
		// transaction ={id: id, price: price};
		pass_transaction_details = {
			id: id,
			name: name,
			vehicle: vehicle, 
			what: what,
			price: price,
			status: status,
			workers: selected,
			createdAt: formatDateTime(date, time)
		};
	}


	// issave yung mga nagwork sa booking
	// let transaction = {};
	async function confirmWorker(id, name, vehicle, what, price, status){
		let transaction = {
			name: name,
			vehicle: vehicle, 
			what: what,
			price: price,
			status: status,
			workers: selected,
			createdAt: formatDateTime(date, time)
		};
		let selected_workers = [];
		try{

			// const q = query(collection(db, 'employee'), where('name', 'in', selected));
			// const querySnapshot = await getDocs(q);
			// selected_workers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			console.log(selected);

			console.log(transaction, id);

			selectWorkerModal = false;
			await addDoc(collection(db, 'transactions'), transaction);
			await deleteDoc(doc(db, 'bookings', id));

			
			
		} catch(error){
			console.log(error);
		}
		
	}



	// ppass mga data sa view para maview sa transact modal
	// function processTransact(id, name, what, vehicle, price, workers){
	// 	transactModal = true;
	// 	view = {id:id, name:name, what: what, vehicle: vehicle, price:price, workers:workers};
	// 	console.log(view.workers.map(worker => worker.name).join(', '));
	// }


	// // process salary emp print receipt
	// async function print(id, workers) {
	// 	try {
	// 		const divisionOfPay = Number(parseFloat((view.price/2)/workers.length).toFixed(2));
	// 		const divisionOfTip = Number(parseFloat(tip/workers.length).toFixed(2));
	// 		let sumOfpay = 0;
	// 		let totalPay = 0;
	// 		let sumOfTip = 0;
			
	// 		workers.forEach(async (worker)=>{
	// 			sumOfpay = divisionOfPay + worker.pay;
	// 			sumOfTip = divisionOfTip + worker.tip;
	// 			totalPay = sumOfTip + sumOfpay;
	// 			console.log(totalPay, sumOfpay, sumOfTip);

	// 			await updateDoc(doc(db, 'employee', worker.id), {
	// 				pay: sumOfpay,
	// 				tip: sumOfTip,
	// 				total: totalPay
	// 			});
	// 		})

	// 		transactModal = false;
	// 		await updateDoc(doc(db, 'bookings', id),{
	// 			finish: 'done'
	// 		});
			
	// 		amount='';
	// 		change=0;
	// 	} catch (error) {
	// 		console.log(error);
	// 		alert(error);
	// 	}
	// }

</script>



<td class="px-3 py-3">{booking.name}</td>
<td class="px-3 py-3">{booking.email}</td>
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
			{#if booking.finish === 'confirm'}
				<li><button on:click={processWorker(booking.id, booking.name, booking.vehicle, booking.what, booking.price, 'on process')}
					>on process</button></li>
				<li><button on:click={cancelBooking(booking.id, booking.name)}
					>cancel</button></li>
			{:else if booking.finish === 'pending'}
				<li><button on:click={confirmBooking(booking.id, booking.date, booking.time, booking.name, booking.email)}
					>Confirm</button></li>
			{/if}
		</ul>
	</div>
	</div>
</td>



<!-- <input type="checkbox" class="modal-toggle" bind:checked={transactModal}/>
{#if transactModal}
<div class="modal">
  <div class="modal-box  w-11/12 max-w-xl">
    <h3 class="font-bold text-lg">Transaction Summary</h3>
    <hr class="my-2" />
	 <InputWorkers bind:selected/>
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
{/if} -->



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
			<button on:click={confirmWorker(pass_transaction_details.id, pass_transaction_details.name, pass_transaction_details.vehicle, pass_transaction_details.what, pass_transaction_details.price, 'on process')}
			class="btn btn-ghost bg-yellow-400 text-white rounded-full hover:bg-yellow-300 px-8">done</button>
	  	</div>
	</div>
</div>
{/if}