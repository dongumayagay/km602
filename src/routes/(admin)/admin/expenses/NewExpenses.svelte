<script>
	import InputDate from "../../../(client)/book/InputDate.svelte";
    import { db } from '$lib/firebase';
    import { updateDoc, doc, addDoc, collection } from 'firebase/firestore';
	import InputDesc from "./InputDesc.svelte";
	import InputCateg from "./InputCateg.svelte";
	import InputAmount from "./InputAmount.svelte";

    export let show = false;
    export let update = false;

    export let expenses = {
        date: '',
        description: '',
        categories: '',
        amount: 0
    };

    async function submitHandler(){
        try{
            show=false;
            
            console.log(expenses);
            if(update){
                await updateDoc(doc(db, 'expenses', expenses.id),expenses);
                update=false;
            }else{
                await addDoc(collection(db, 'expenses'), expenses);
            }
            console.log(expenses);
            

        }catch(error){
            console.log(error);
        }
    }
</script>

<input type="checkbox" class="modal-toggle" bind:checked={show}/>
{#if show}
<div class="modal">
  <div class="modal-box gap-4 w-11/12 max-w-xl">
    <h3 class="font-bold text-lg pb-4 col-span-2">Add Expenses</h3>

      <form on:submit|preventDefault={submitHandler}>
          <InputDate bind:date={expenses.date} />
          <InputDesc bind:desc={expenses.description}/>
          <InputCateg bind:categ={expenses.categories} />
          <InputAmount bind:amount={expenses.amount} />
        <div class="modal-action col-span-2">
          <button 
          on:click={()=>show=false}
          class="btn btn-ghost capitalize rounded-full">cancel</button>

          <button 
          class="btn btn-info capitalize rounded-full text-white">Confirm</button>
        </div>
      </form>
  </div>
</div>
{/if}