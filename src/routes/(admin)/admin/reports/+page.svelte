<script>
    import Chart from './Chart.svelte';
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

<span class="font-semibold text-2xl mb-8">Reports</span>

<div class="tab">
    <button on:click={btn_transact_history}
    class="text-base font-semibold tab tab-bordered p-0 {active_transact_history ? 'tab-active' : ''} w-1/2">Transaction History</button>
    <button on:click={btn_profit_loss}
    class="text-base font-semibold tab tab-bordered p-0 {active_profit_loss ? 'tab-active' : ''} w-1/2">Profit Report</button> 
</div>

{#if active_transact_history}
<table class="min-w-max w-full table-auto shadow-lg my-6">
    <thead class="">
        <tr class="text-gray-700 uppercase text-xs leading-normal" style="background-color: #f2f2f2;">
            <th class="rounded-tl-lg"></th>
            <th class="py-4 px-6 text-left">ID</th>
            <th class="py-4 px-6 text-left">Customer</th>
            <th class="py-4 px-6 text-center">Date & Time</th>
            <th class="rounded-tr-lg py-3 px-6 text-left">Amount</th>
            <th class="py-4 px-6 text-center">Status</th>
            <th class="rounded-tr-lg py-3 px-6 text-left"></th>
        </tr>
    </thead>
    <tbody>
        <tr class="border-b border-gray-200 bg-base-100 hover:bg-gray-200">
            <td class="py-4 px-6 text-left font-bold text-sm">1</td>
            <td class="py-4 px-6 text-left text-sm">id</td>
            <td class="py- px-6 text-left text-sm">name</td>
            <td class="py-4 px-6 text-center text-sm">date and time</td> 
            <td class="py-4 px-6 text-left text-sm">₱ 0.00</td>
            <td class="py-4 px-6 text-center text-sm">
                <span class="bg-orange-100 text-orange-600 py-1 px-3 rounded-full text-xs font-bold">status</span>
            </td>
            <td class="px-4 py-3">
                <div  class="flex items-center space-x-4 text-sm">
                <div class="dropdown dropdown-end">
                    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                    <label for='' tabindex="0" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="currentColor" class="w-5 h-5">
                        <path d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
                    </svg>
                    </label>
                    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><button>More details</button></li>
                    </ul>
                </div>
                </div>
            </td>
        </tr>
    </tbody>
</table>
{:else}
<Chart />
{/if}