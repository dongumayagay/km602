<script>
    // import Chart from './Chart.svelte';
	// import ExpenseTracking from './ExpenseTracking.svelte';
	// import HistoryTable from './HistoryTable.svelte';
	// import ProfitTable from './ProfitTable.svelte';
import ReportTable from './ReportTable.svelte';


    // let expense_tracking = true;
    // let expense_categories = false;
    // let report = false;
    
    // let tracking_tab = 'tab-active';
    // let categories_tab;
    // let report_tab;

    // function btn_tracking(){
    //     expense_tracking = true;
    //     expense_categories = false;
    //     report = false;

    //     tracking_tab = 'tab-active';
    //     categories_tab = '';
    //     report_tab = '';
    // }

    // function btn_categories(){
    //     expense_tracking = false;
    //     expense_categories = true;
    //     report = false;

    //     tracking_tab = '';
    //     categories_tab = 'tab-active';
    //     report_tab = '';
    // }

    // function btn_report(){
    //     expense_tracking = false;
    //     expense_categories = false;
    //     report = true;

    //     tracking_tab = '';
    //     categories_tab = '';
    //     report_tab = 'tab-active';
    // }

</script>

<svelte:head>
	<title>Reports | km602</title>
</svelte:head>

<div class="flex justify-between">
    <span class="font-semibold text-2xl mb-8">Reports</span>
    <input type="text" placeholder="Search here" class="input input-bordered w-full max-w-xs" />
</div>

<!-- <div class="tab">
    <button on:click={btn_tracking}
    class="text-base font-semibold tab tab-bordered p-0 {tracking_tab} w-1/3">Expense Tracking</button>
    <button on:click={btn_categories}
    class="text-base font-semibold tab tab-bordered p-0 {categories_tab} w-1/3">Expense Categories</button>
    <button on:click={btn_report}
    class="text-base font-semibold tab tab-bordered p-0 {report_tab} w-1/3">Report</button> 
</div> -->

<!-- {#if expense_tracking}
<ExpenseTracking />
{:else if expense_categories}
<ProfitTable />
{:else if report}
<ReportTable />
{/if} -->

<ReportTable />

<!-- <PieChart /> -->
<!-- <Chart /> -->