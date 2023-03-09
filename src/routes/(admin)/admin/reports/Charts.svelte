<script>
	import { onMount } from "svelte";
    import { db } from '$lib/firebase.js';
    import { collection, query, onSnapshot, updateDoc, doc, getDocs } from 'firebase/firestore';


    let expense_categ ={
        'Payroll' : 0,
        'Supplies': 0,
        'Utilities': 0,
        'Maintenance': 0,
        'Others': 0
    }

    const categ = Object.keys(expense_categ);

    async function createExpensechart(){

        const q = query(collection(db, 'expenses'));
		const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (snapshot) => {
            const data = snapshot.data();
            if(data.categories === 'Payroll'){
                expense_categ['Payroll'] += data.amount;
            }else if(data.categories === 'Supplies'){
                expense_categ['Supplies'] += data.amount;
            }else if(data.categories === 'Utilities'){
                expense_categ['Utilities'] += data.amount;
            }else if(data.categories === 'Maintenance'){
                expense_categ['Maintenance'] += data.amount;
            }else{
                expense_categ['Others'] += data.amount;
            }
        });
        // console.log(expense_categ);

        const ctx = document.getElementById('expensesChart');

        new Chart(ctx, {
        type: 'pie',
        data: {
        labels: [
            categ[0],
            categ[1],
            categ[2],
            categ[3],
            categ[4]
        ],
        datasets: [{
            label: 'Expenses Categories',
            data: [expense_categ.Payroll, expense_categ.Supplies, expense_categ.Utilities, expense_categ.Maintenance, expense_categ.Others],
            backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(132 204 22)',
            'rgb(249 115 22)'
            ],
            hoverOffset: 4
        }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            width: 1000,
            height: 1000
        }


        });
    }




    let months = {
        'January': 0,
        'February': 0,
        'March': 0,
        'April': 0,
        'May': 0,
        'June': 0,
        'July': 0,
        'August': 0,
        'September': 0,
        'October': 0,
        'November': 0,
        'December': 0
    }

    const month = Object.keys(months);
    async function createProfitchart(){

        const q = query(collection(db, 'reports'));
		const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (snapshot) => {
            const data = snapshot.data();
            const date = new Date(data.date).toLocaleString('default', {month: 'long'});
            if(date === 'January'){
                months['January'] += data.profit;
            }else if(date === 'February'){
                months['February'] += data.profit;
            }else if(date === 'March'){
                months['March'] += data.profit;
            }else if(date === 'April'){
                months['April'] += data.profit;
            }else if(date === 'May'){
                months['May'] += data.profit;
            }else if(date === 'June'){
                months['June'] += data.profit;
            }else if(date === 'July'){
                months['July'] += data.profit;
            }else if(date === 'August'){
                months['August'] += data.profit;
            }else if(date === 'September'){
                months['September'] += data.profit;
            }else if(date === 'October'){
                months['October'] += data.profit;
            }else if(date === 'November'){
                months['November'] += data.profit;
            }else{
                months['December'] += data.profit;
            }
        });
        console.log(months);
        
        const ctx = document.getElementById('profitChart');
        new Chart(ctx, {
        type: 'line',
        data: {
            labels: [month[0], month[1], month[2], month[3], month[4], month[5], month[6], month[7], month[8], month[9], month[10], month[11]],
            datasets: [{
                label: 'Profit Report',
                data: [months.January, months.February, months.March, months.April, months.May, months.June, months.July, months.August, months.September, months.October, months.November, months.December],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
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

    onMount(() => {
        createExpensechart();
        createProfitchart();
    });
</script>


<span class="text-center font-bold">Profit Report</span>
<div>
    <label class="font-medium" for="cars">Select Year:</label>

    <select name="year">
    <option value="2023">2023</option>
    </select>
</div>



<div>
    <canvas id="profitChart"></canvas>
</div>


<span class="my-6"></span>
<!-- Second chart -->
<span class="text-center font-bold">Expenses Categories</span>
<div>
    <canvas id="expensesChart"></canvas>
</div>

