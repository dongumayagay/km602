<script>
    import { date, time } from '$lib/utils.js'
    import { db } from '$lib/firebase.js';
    import { collection, query, where, getDocs, doc, updateDoc, addDoc, setDoc } from 'firebase/firestore';
    import * as XLSX from 'xlsx';

    async function generateReport(){
    try{

    //get the emp with salary
      const q = query(collection(db, 'employee'), where('total', '>', 0));
      const querySnapshot = await getDocs(q);
      const emp_with_salary = querySnapshot.docs.map((doc) =>({...doc.data(), id: doc.id}));
      console.log(emp_with_salary);


    //   update worker data set to zero
    if(querySnapshot.size != 0){

      //para sa expenses
      let total = 0;
      const date = new Date().toLocaleDateString('en-PH', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
      emp_with_salary.forEach((emp)=>{
        total += emp.pay
      })

      let expenses = {
        date: date,
        description: 'Employees payout',
        categories: 'Payroll',
        amount: total
      }

      //get the reports
      try{
          let date = Intl.DateTimeFormat('en-PH', { dateStyle: 'full' }).format();
          const queryDateExist = query(collection(db, 'reports'), where('date', '==', date));
          const querySnapshot = await getDocs(queryDateExist);
          const date_exist = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
          

          if(date_exist.length === 0){
              await addDoc(collection(db, 'reports'), {
                  date: date,
                  revenue: 0,
                  expenses: expenses.amount,
                  profit: 0
              })
          }else{
              let sumExpenses = expenses.amount + date_exist[0].expenses;
              await updateDoc(doc(db, 'reports', date_exist[0].id),{
                  expenses: sumExpenses,
              });
          }

      }catch(error){
          console.log(error);
      }
      
      try{

        console.log(date, total);
        await addDoc(collection(db, 'expenses'), expenses);

          await updateDoc(doc(db, 'reports', ),{
            status: 'done'
        });

      }catch(error){
        console.log(error);
      }


      //  pass to the data
      const data = [['Name', 'Salary']];
      Object.values(emp_with_salary).forEach(emp => {
          const row = [emp.name, emp.pay];
          data.push(row);
      });


      data.push([]);
      data.push(['DATE', date]);
      data.push(['TIME', time]);


    //   data to excel file download
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      worksheet['!cols'] = [{ wpx: 100 }];
      XLSX.utils.book_append_sheet(workbook, worksheet, 'emp_report');
      XLSX.writeFile(workbook, `${date}_Emp_Report.xlsx`);

        emp_with_salary.forEach(async (worker)=>{
            await updateDoc(doc(db, 'employee', worker.id), {
                pay: 0,
                tip: 0,
                total: 0
            });
        })

    }else{
        alert('Generate Report is not applicable at this moment');   
    }



    }catch(error){
      console.log(error);
      alert(error);
    }
  }
</script>


<!-- generate report and search -->
<div class="flex justify-between">
    <div>
        
      <button on:click={generateReport}
       class="btn capitalize">Generate Report
       <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 ml-3"
                >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
        </svg>

    </button> 
    </div>
    
    <input type="text" placeholder="Search here" class="input input-bordered w-full max-w-xs" />
</div>