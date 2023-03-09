<script>
import ReportTable from './ReportTable.svelte';

</script>

<svelte:head>
	<title>Reports | km602</title>
</svelte:head>

<div class="flex justify-between">
    <span class="font-semibold text-2xl mb-8">Reports</span>
    <input type="text" placeholder="Search here" class="input input-bordered w-full max-w-xs" />
</div>


<ReportTable />