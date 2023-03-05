<script>
    export let report;
</script>


<td class="py-4 px-6 text-left text-sm"><span>{report.date}</span></td>
<td class="py- px-6 text-left text-sm">₱{parseFloat(report.revenue).toFixed(2)}</td>
<td class="py-4 px-6 text-center text-sm">₱{parseFloat(report.expenses).toFixed(2)}</td>
<td class="py-4 px-6 text-center text-sm">₱{parseFloat(report.profit).toFixed(2)}</td>
<td class=" py-3">
    <div  class="flex items-center space-x-2 text-sm">
    <div class="dropdown dropdown-end">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <label for='' tabindex="0" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="currentColor" class="w-5 h-5">
            <path d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
        </svg>
        </label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <!-- <li><button on:click={paymentStatus(emp.id, emp.status)}>Pay</button></li> -->
        <li><button>Download</button></li>
        <!-- <li><button>Delete</button></li> -->
        </ul>
    </div>
    </div>
</td>