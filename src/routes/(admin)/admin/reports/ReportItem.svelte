<script>
    import { date, time } from '$lib/utils.js'
    import { db } from '$lib/firebase.js';
    import { collection, query, where, getDocs, doc, updateDoc, addDoc, setDoc } from 'firebase/firestore';
    import * as XLSX from 'xlsx';


    export let report;


    async function download(date, revenue, expenses, profit){
        const formatrevenue = parseFloat(revenue).toFixed(2);
        const formatexpenses = parseFloat(expenses).toFixed(2);
        const formatprofit = parseFloat(profit).toFixed(2);


        const transactArr = [];
        try{
            //get transact
            const q = query(collection(db, 'transactions'), where('status', '==', 'done') );
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach((doc) => {
                const data = {id: doc.id, ...doc.data()};
                const formatDate = new Date(data.createdAt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
                
                if(date === formatDate){
                    transactArr.push(data);
                }
                
            })
        }catch(error){
            console.log(error);
        }
        

        //get expenses
        const q = query(collection(db, 'expenses'), where('date', '==', date) );
        const querySnapshot = await getDocs(q);
        const expensesArr = querySnapshot.docs.map((doc) =>({...doc.data(), id: doc.id}));



        //pass the data
        const data = [['TRANSACTION', '' ,''], ['ID', 'Date and Time', 'Amount']];
        Object.values(transactArr).forEach(transact => {
          const row = [transact.id, transact.createdAt, transact.price];
          data.push(row);
        });

        data.push([]);
        data.push(['TOTAL TRANSACTION', formatrevenue]);
        data.push([], []);

        data.push(['EXPENSES', '', ''], ['Description', 'Category', 'Amount'])
        Object.values(expensesArr).forEach(expenses => {
            const row = [expenses.description, expenses.categories, expenses.amount];
            data.push(row);
        })

        data.push([]);
        data.push(['TOTAL EXPENSES', formatexpenses]);
        data.push([],[]);
        data.push(['EARNED PROFIT', formatprofit]);
        data.push([]);

        data.push(['DATE', date]);
        data.push(['TIME', time]);

        console.log(data);


        try{

             //   data to excel file download
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet(data);
            worksheet['!cols'] = [{ wpx: 300 }, { wpx: 300 }, { wpx: 100 }];
            XLSX.utils.book_append_sheet(workbook, worksheet, 'full_report');
            XLSX.writeFile(workbook, `${date}_Full_Report.xlsx`);

        }catch(error){

        }

    }
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
        <li><button on:click={download(report.date, report.revenue, report.expenses, report.profit)}>Download</button></li>
        <!-- <li><button>Delete</button></li> -->
        </ul>
    </div>
    </div>
</td>