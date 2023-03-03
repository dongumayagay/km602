<script>
	import ExpensesTable from "./ExpensesTable.svelte";
import NewExpenses from "./NewExpenses.svelte";


  let show;
  let expenses;
  function add(){
    show = true;
    expenses = {
        date: '',
        description: '',
        categories: '',
        amount: 0
    }
  }

</script>

<div class="flex justify-between">
    <span class="font-semibold text-2xl mb-8">Expenses</span>
    
      <!-- open modal -->
    <button 
      on:click={add}
      class="btn gap-2 w-32 btn-outline rounded-full">Add
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
</div>


<NewExpenses bind:show bind:expenses />
<ExpensesTable />