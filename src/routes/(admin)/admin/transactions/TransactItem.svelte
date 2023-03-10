<script>
    import NewTransaction from './NewTransaction.svelte';
    import { db } from '$lib/firebase';
    import { printPDF } from '$lib/utils';
	import { doc, updateDoc, where, query, collection, getDocs, addDoc } from 'firebase/firestore';

    export let transaction;

    let amount;
    let change = 0;
    let tip = 0;
    let payModal;
    let view = {};
    let show;


    // set pending to process
    async function setOnProcess(id){
        await updateDoc(doc(db, 'transactions', id),{
            status: 'on process',
        });
    }


    async function payment(id, name, vehicle, what, price, workers){
        payModal = true;
		view = {id: id, name:name, vehicle:vehicle, what:what, price:price, workers:workers};
    }

    async function print(id){
        console.log(view.workers);
        try{

            // get the select worker
            let selected_workers = [];
            const q = query(collection(db, 'employee'), where('name', 'in', view.workers));
            const querySnapshot = await getDocs(q);
            selected_workers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));


            // vars needed
            const divisionOfPay = Number(parseFloat((view.price/2)/view.workers.length).toFixed(2));
			const divisionOfTip = Number(parseFloat(tip/view.workers.length).toFixed(2));
			let sumOfpay = 0;
			let totalPay = 0;
			let sumOfTip = 0;
            console.log(view);

            // process emp salary
            selected_workers.forEach(async (worker)=>{
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
            amount='';
            change=0;

            payModal = false;
            
            printPDF(view);

            //get the reports
            try{
                let date = Intl.DateTimeFormat('en-PH', { dateStyle: 'full' }).format();
                const queryDateExist = query(collection(db, 'reports'), where('date', '==', date));
                const querySnapshot = await getDocs(queryDateExist);
                const date_exist = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
                

                if(date_exist.length === 0){
                    await addDoc(collection(db, 'reports'), {
                        date: date,
                        revenue: view.price,
                        expenses: 0,
                        profit: view.price
                    })
                }else{
                    let sumRevenue = view.price + date_exist[0].revenue;
                    await updateDoc(doc(db, 'reports', date_exist[0].id),{
                        revenue: sumRevenue,
                    });
                }

            }catch(error){
                console.log(error);
            }


            payModal = false;
            
            printPDF(view);
            location = location;
            await updateDoc(doc(db, 'transactions', id),{
                status: 'done'
            });



        }catch(error){
            console.log(error);
        }

    }


    // repeating transaction para di paulit ulit fill
    let fill={};
    function repeatTransaction(name, vehicle, what, price){
        show=true;
        fill = {
            name: name,
            vehicle: vehicle,
            what: what,
            price: price
        }
        console.log(fill);
    }
</script>


<td class="py-4 px-6 text-left text-sm">{transaction.name}</td>
<td class="py- px-6 text-left text-sm">
    {transaction.vehicle}
</td>
<td class="py-4 px-6 text-center text-sm">{transaction.createdAt}</td> 
<td class="py-4 px-6 text-left text-sm">₱ {parseFloat(transaction.price).toFixed(2)}</td>
<td class="py-4 px-6 text-center text-sm">
    <span class="{transaction.status==='pending'? 'bg-red-100 text-red-700' 
        : transaction.status === 'on process' ? 'bg-orange-100 text-orange-700'
        : 'bg-green-100 text-green-700'} 
        py-1 px-3 rounded-full text-xs font-bold">{transaction.status}</span>
</td>
<td class="px-4 py-3">
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
            {#if transaction.status === 'pending'}
                <li><button
                    on:click={setOnProcess(transaction.id)}
                    >on process</button></li>
            {:else if transaction.status === 'on process'}
                <li><button
                    on:click={payment(transaction.id, transaction.name, transaction.vehicle, transaction.what, transaction.price, transaction.workers)}
                    >Process Payment</button></li>
            {:else if transaction.status === 'done'}
                <li><button
                    on:click={()=>repeatTransaction(transaction.name, transaction.vehicle, transaction.what, transaction.price)}
                    >New Transaction</button></li>
            {/if}
        </ul>
    </div>
    </div>
</td>




<input type="checkbox" class="modal-toggle" bind:checked={payModal}/>
{#if payModal}
<div class="modal">
    <div class="modal-box  w-11/12 max-w-xl">
      <h3 class="font-bold text-lg">Transaction Summary</h3>
      <hr class="my-2" />
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
              {view.workers.join(', ')}
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
        <button on:click={()=>payModal=false} class="btn btn-ghost rounded-full">cancel</button>
        <button on:click={print(view.id)}
        class="btn btn-ghost bg-yellow-400 text-white rounded-full hover:bg-yellow-300 px-8">print</button>
      </div>
    </div>
  </div>
{/if}


<NewTransaction bind:show {fill} />