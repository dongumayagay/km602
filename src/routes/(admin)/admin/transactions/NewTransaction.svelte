<script>
    import InputName from '../../../(client)/book/InputName.svelte';
    import InputService from '../../../(client)/book/InputService.svelte';
    import InputVehicle from '../../../(client)/book/InputVehicle.svelte';
    import InputWorkers from './InputWorkers.svelte';
    import { createEventDispatcher } from "svelte";
    import { formatDateTime, date, time } from '$lib/utils';
    import { db } from '$lib/firebase';
    import { addDoc, collection } from 'firebase/firestore';
	  import InputStatus from './InputStatus.svelte';

    export let show=false;
    let selected;

    export let fill = {
      name: '',
      vehicle: '',
      what: '',
      price: 0
    }

    let transaction = {
      name: fill.name,
      vehicle: fill.vehicle,
      what: fill.what,
      price: fill.price,
      status: 'pending',
      workers: null,
      createdAt: null
    }

    const dispatch = createEventDispatcher();

    $: {
      transaction = {...transaction, ...fill};
    }

    function updateFill() {
      fill = { ...fill, ...transaction };
      dispatch("fill-updated", fill);
    }

    async function submitHandler() {
      transaction.createdAt = formatDateTime(date, time);
      transaction.workers = selected;
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

          <InputName bind:name={transaction.name} on:input={updateFill}/>
          <InputVehicle bind:vehicleType={transaction.vehicle} on:input={updateFill}/>
          <InputService bind:what={transaction.what} bind:price={transaction.price} vehicleType={transaction.vehicle} on:input={updateFill}/>
          <InputStatus bind:status={transaction.status}/>
          <InputWorkers bind:selected/>

        <div class="modal-action col-span-2">
          <button 
          on:click={()=>show=false}
          class="btn btn-ghost capitalize rounded-full">cancel</button>

          <button 
          class="btn btn-info capitalize rounded-full text-white">Confirm
          {#if transaction.price}
					<span class="ml-2"
						>- {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(
							transaction.price
						)}</span
					>
				{/if}
        </button>
        </div>
      </form>
  </div>
</div>
{/if}