
import React from "react";
import { use } from "react";
import { useEffect } from "react";
import { useState } from "react";

import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthContext";
import axios from "axios";

const Overview = () => {
 
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
  // calculation for totalIncome,totalExpense,totalBalance
  const totalIncome = transactions.filter((t) => t.type.toLowerCase() === "income")
                       .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions.filter((t) => t.type.toLowerCase() === "expense")
  .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalBalance =totalIncome-totalExpense;

  return (
   <div>
    {
      user &&  <div className="w-11/12 mx-auto mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* TotalBalance Hishab */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center border border-gray-100 hover:shadow-lg transition duration-300">
        <FaWallet className="text-4xl text-blue-500 mb-2" />
        <h3 className="text-gray-700 font-semibold text-lg">Total Balance</h3>
        <p className="text-3xl font-bold text-gray-900 mt-1">
          ${totalBalance.toLocaleString()}
        </p>
      </div>

      {/* TotalIncome Hishab*/}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center border border-gray-100 hover:shadow-lg transition duration-300">
        <FaArrowUp className="text-4xl text-green-500 mb-2" />
        <h3 className="text-gray-700 font-semibold text-lg">Total Income</h3>
        <p className="text-3xl font-bold text-green-600 mt-1">
          ${totalIncome.toLocaleString()}
        </p>
      </div>

      {/* TotalExpense Hishav*/}
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
