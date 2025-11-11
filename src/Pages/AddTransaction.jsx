import React, { use, useState } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router';

const AddTransaction = () => {
  const { user } = use(AuthContext);
  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("Salary");

  const incomeCategories = ["Salary", "Bonus", "Investment", "Freelance", "Other"];
  const expenseCategories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];

  const handleAddtransaction = (e) => {
    e.preventDefault(); 

    const form = e.target; 
    const newTransaction = {
      type,
      category: form.category.value,
      amount: form.amount.value,
      description: form.description.value,
      date: form.date.value,
      email: form.email.value,
      name: form.name.value,
    };

axios.post('http://localhost:3000/add-transaction',newTransaction)
.then(data=>{console.log(data.data);
  toast.success("New Transaction Added")
})
.catch(error=>{
  console.log(error.message);
  toast.error(error.message)
  
})


    console.log(newTransaction);

    setType("Income");
    setCategory("");
    form.reset();
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Add Transaction
      </h2>

      
      <form onSubmit={handleAddtransaction} className="space-y-4">

        {/* type er dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="Income"
                checked={type === "Income"}
                onChange={() => setType("Income")}
                className="text-blue-500 focus:ring-blue-400"
              />
              <span>Income</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="Expense"
                checked={type === "Expense"}
                onChange={() => setType("Expense")}
                className="text-blue-500 focus:ring-blue-400"
              />
              <span>Expense</span>
            </label>
          </div>
        </div>

        {/* Categories  */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Category</option>
            {(type === "Income" ? incomeCategories : expenseCategories).map((ctg, i) => (
              <option key={i} value={ctg}>
                {ctg}
              </option>
            ))}
          </select>
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="Enter description"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User Email
          </label>
          <input
            type="email"
            name="email"
            value={user?.email || ""}
            readOnly
            className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User Name
          </label>
          <input
            type="text"
            name="name"
            value={user?.displayName || user?.name || ""}
            readOnly
            className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 text-gray-600 cursor-not-allowed"
          />
        </div>

       
        <div className="text-center pt-3">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md transition duration-200"
          >
            Add Transaction
          </button>
        </div>
      </form>
      <Toaster/>
    </div>
  );
};

export default AddTransaction;
