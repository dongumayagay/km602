<script>
	import { onMount } from "svelte";


    function createchart(){
        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
            label: 'total profit',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
            }]
        },
        options: {
            scales: {
            y: {
                beginAtZero: true
            }
            }
        }
        });
    }

    onMount(createchart);
</script>

<div class="bg-base-100 mt-6 rounded-xl shadow-md card-body">
    <div class="">
        <h1 class="font-semibold text-2xl">Monthly Profit Report</h1>
        <div class=" mt-4 mb-4 flex justify-between">
            <select class="border-2">
                <option>Monthly</option>
                <option>Yearly</option>
            </select>
            <div class="flex">
                <p class="pr-2">From:</p>
                <select class="border-2 mr-8">
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                </select>
                <p class="pr-2">To:</p>
                <select class="border-2">
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                </select>
            </div>
        </div>
        <div class="flex gap-8">
            <div>
                <p class="text-sm font-semibold text-gray-500">Date of Highest Profit:
                <br>
                <span class="text-2xl font-normal text-gray-900">January 3, 2022</span><br><span class="text-xs font-normal">1200 PHP Gained profit</span></p>
            </div>
            <div>
                <p class="text-sm font-semibold text-gray-500">Today's Total Profit
                <br>
                <span class="text-2xl font-normal text-gray-900">1200 PHP</span><br><span class="text-xs font-normal">November 3, 2022 Thursday</span></p>
            </div>
        </div>
        
    </div>

    <div>
        <canvas id="myChart"></canvas>
      </div>
</div>