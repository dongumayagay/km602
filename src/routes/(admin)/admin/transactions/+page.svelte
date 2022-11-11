<script>
  import NewTransaction from './NewTransaction.svelte';
  import TransactTable from './TransactTable.svelte';

  let show;
  let payModal;
</script>


<div class="flex justify-between">
  <span class="font-semibold text-2xl mb-8">Transactions</span>
    <!-- open modal -->
  <button 
    on:click={()=>show = true}
    class="btn gap-2 w-32 btn-outline rounded-full">New
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </button>
</div>


<TransactTable bind:payModal />
<NewTransaction bind:show/>