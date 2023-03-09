<script>
	import InputDate from "../../../(client)/book/InputDate.svelte";
    import { db } from '$lib/firebase';
    import { updateDoc, doc, addDoc, collection, where, query, getDocs } from 'firebase/firestore';
	import InputDesc from "./InputDesc.svelte";
	import InputCateg from "./InputCateg.svelte";
	import InputAmount from "./InputAmount.svelte";

    export let show = false;
    export let update = false;

    export let expenses = {
        description: '',
        categories: '',
        amount: 0
    };

    async function submitHandler(){
        try{
            
            expenses.date = Intl.DateTimeFormat('en-PH', { dateStyle: 'full' }).format();
            show=false;
            
            console.log(expenses);
            if(update){
                await updateDoc(doc(db, 'expenses', expenses.id),expenses);
                update=false;
            }else{
                await addDoc(collection(db, 'expenses'), expenses);
            }


            //get the reports
            try{
                let date = Intl.DateTimeFormat('en-PH', { dateStyle: 'full' }).format();
                const queryDateExist = query(collection(db, 'reports'), where('date', '==', date));
                const querySnapshot = await getDocs(queryDateExist);
                const date_exist = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
                

                if(date_exist.length === 0){
                    await addDoc(collection(db, 'reports'), {
                        date: date,
                        revenue: 0,
                        expenses: expenses.amount,
                    })
                }else{
                    let sumExpenses = expenses.amount + date_exist[0].expenses;
                    await updateDoc(doc(db, 'reports', date_exist[0].id),{
                        expenses: sumExpenses,
                    });
                }

            }catch(error){
                console.log(error);
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