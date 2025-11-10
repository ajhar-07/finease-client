// import { useLoaderData } from "react-router";




// const Overview = () => {
//  const overview=useLoaderData()
 
//  console.log(overview);
 
//     return (
//      <div>

        
//           {
//             overview.map(view=> <div className='grid md:grid-cols-3 gap-8 mx-auto'>
//          <div className='w-full h-[250px] bg-blue-200 rounded-2xl'>
//            <div className='flex items-center justify-center'>
//              <p className='my-8 text-2xl font-bold'>Total Balance</p>
//             <p>{view.amount}</p>
//            </div>
//          </div>
//          <div className='w-full h-[250px] bg-blue-200 rounded-2xl'>
//             <p>Income</p>
//             <p>{view.income}</p>
//          </div>
//          <div className='w-full h-[250px] bg-blue-200 rounded-2xl'>
//             <p>Expense</p>
//          </div>
       
        
//         </div>  )
//           }
       
//      </div>
//     );
// };

// export default Overview;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";

// const Overview = () => {
//   const [overview, setOverview] = useState({
//   });

//   useEffect(() => {
//     // Fetch data from backend
//     axios
//       .get("http://localhost:3000/add-transaction") // 👈 Replace with your real API route
//       .then((res) => {
//         setOverview(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching overview:", err);
//       });
//   }, []);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
//       {/* Total Balance */}
//       <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center border border-gray-100">
//         <FaWallet className="text-4xl text-blue-500 mb-2" />
//         <h3 className="text-gray-700 font-semibold text-lg">Total Balance</h3>
//         <p className="text-2xl font-bold text-gray-900 mt-1">
//           ${overview.amount}
//         </p>
//       </div>

//       {/* Total Income */}
//       <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center border border-gray-100">
//         <FaArrowUp className="text-4xl text-green-500 mb-2" />
//         <h3 className="text-gray-700 font-semibold text-lg">Total Income</h3>
//         <p className="text-2xl font-bold text-gray-900 mt-1">
//           ${overview.amount}
//         </p>
//       </div>

//       {/* Total Expense */}
//       <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center border border-gray-100">
//         <FaArrowDown className="text-4xl text-red-500 mb-2" />
//         <h3 className="text-gray-700 font-semibold text-lg">Total Expenses</h3>
//         <p className="text-2xl font-bold text-gray-900 mt-1">
//           ${overview.amount}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Overview;


// Overview.jsx
// Overview.jsx
import React from "react";
import { use } from "react";
import { useEffect } from "react";
import { useState } from "react";
// import { useLoaderData } from "react-router";
import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthContext";
import axios from "axios";

const Overview = () => {
  // const transactions = useLoaderData();
  const {user}=use(AuthContext)
const [transactions,setTransactions]=useState([])
useEffect(()=>{
axios.get(`http://localhost:3000/add-transaction?email=${user?.email}`)
.then(data=>{console.log(data.data)
  setTransactions(data.data)
}

).catch(error=>{console.log(error);
})

},[user])
  // Calculate totals based on backend data
  const totalIncome = transactions.filter((t) => t.type.toLowerCase() === "income")
                       .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions.filter((t) => t.type.toLowerCase() === "expense")
  .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  return (
   <div>
    {
      user &&  <div className="w-11/12 mx-auto mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Total Balance */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center border border-gray-100 hover:shadow-lg transition duration-300">
        <FaWallet className="text-4xl text-blue-500 mb-2" />
        <h3 className="text-gray-700 font-semibold text-lg">Total Balance</h3>
        <p className="text-3xl font-bold text-gray-900 mt-1">
          ${totalBalance.toLocaleString()}
        </p>
      </div>

      {/* Total Income */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center border border-gray-100 hover:shadow-lg transition duration-300">
        <FaArrowUp className="text-4xl text-green-500 mb-2" />
        <h3 className="text-gray-700 font-semibold text-lg">Total Income</h3>
        <p className="text-3xl font-bold text-green-600 mt-1">
          ${totalIncome.toLocaleString()}
        </p>
      </div>

      {/* Total Expense */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center border border-gray-100 hover:shadow-lg transition duration-300">
        <FaArrowDown className="text-4xl text-red-500 mb-2" />
        <h3 className="text-gray-700 font-semibold text-lg">Total Expense</h3>
        <p className="text-3xl font-bold text-red-600 mt-1">
          ${totalExpense.toLocaleString()}
        </p>
      </div>
    </div>
    }
   </div>
  );
};

export default Overview;
