<script>
	import EmployeeTable from './EmployeeTable.svelte';
	import NewEmployee from './NewEmployee.svelte';
  import EmployeeReport from './EmployeeReport.svelte';


  let show;

</script>

<svelte:head>
	<title>Employee | km602</title>
</svelte:head>

<div class="flex justify-between">
    <span class="font-semibold text-2xl mb-8">Employee</span>
    
      <!-- open modal -->
    <button 
      on:click={()=>show = true}
      class="btn gap-2 w-32 btn-outline rounded-full">New
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
</div>




<!-- <EmployeeReport /> -->
<EmployeeTable />
<NewEmployee bind:show/>