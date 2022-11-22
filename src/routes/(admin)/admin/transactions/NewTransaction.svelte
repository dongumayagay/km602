<script>
    import InputName from '../../../(client)/book/InputName.svelte';
    import InputService from '../../../(client)/book/InputService.svelte';
    import InputVehicle from '../../../(client)/book/InputVehicle.svelte';
    import InputWorkers from './InputWorkers.svelte';
    import { db } from '$lib/firebase';
    import { addDoc, collection } from 'firebase/firestore';

    export let show=false;
    let vehicleType = '';
	  let price = '';
    let selected;


    async function submitHandler(event) {
		const formData = new FormData(event.target);
		const transaction = Object.fromEntries(formData);
      transaction.price = Number(price);
      transaction.createdAt = Intl.DateTimeFormat('en-PH', { dateStyle: 'full', timeStyle: 'short' }).format();
      transaction.status = 'unpaid';
      transaction.workers = selected;
      console.log(transaction);
      show=false;

      try {
          await addDoc(collection(db, 'transactions'), transaction);
      } catch (error) {
          console.log(error);
          alert(error);
      }
	}
</script>

<input type="checkbox" class="modal-toggle" bind:checked={show}/>
{#if show}
<div class="modal">
  <div class="modal-box gap-4 w-11/12 max-w-xl">
    <h3 class="font-bold text-lg pb-4 col-span-2">New Transaction</h3>    
      <form on:submit|preventDefault={submitHandler}>
          <InputName />
          <InputVehicle bind:vehicleType/>
          <InputService bind:price {vehicleType}/>
          <InputWorkers bind:selected/>

        <div class="modal-action col-span-2">
          <button 
          on:click={()=>show=false}
          class="btn btn-ghost rounded-full">cancel</button>

          <button 
          class="btn btn-info rounded-full text-white">Done</button>
        </div>
      </form>
  </div>
</div>
{/if}