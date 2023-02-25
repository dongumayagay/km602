<script>
    import Chart from './Chart.svelte';
	import HistoryTable from './HistoryTable.svelte';
	import ProfitTable from './ProfitTable.svelte';

    let active_transact_history = true;
    let active_profit_loss = false;

    function btn_transact_history(){
        active_transact_history = true;
        active_profit_loss = false;
    }

    function btn_profit_loss(){
        active_transact_history = false;
        active_profit_loss = true;
    }
</script>

<div class="flex justify-between">
    <span class="font-semibold text-2xl mb-8">Reports</span>
    <input type="text" placeholder="Search here" class="input input-bordered w-full max-w-xs" />
</div>

<div class="tab">
    <button on:click={btn_transact_history}
    class="text-base font-semibold tab tab-bordered p-0 {active_transact_history ? 'tab-active' : ''} w-1/2">Transaction History</button>
    <button on:click={btn_profit_loss}
    class="text-base font-semibold tab tab-bordered p-0 {active_profit_loss ? 'tab-active' : ''} w-1/2">Profit Report</button> 
</div>

{#if active_transact_history}
<HistoryTable />
{:else}
<ProfitTable />
{/if}