import React, { useRef } from "react";
import { use } from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ViewDetails from "./ViewDetails";
import { useLoaderData, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
const MyTransaction = () => {
 const {user}=use(AuthContext)
 const[mytransaction,setMytransaction]=useState([]) 
 const myref=useRef(null)
  // const transaction=useLoaderData()
//added
const [type, setType] = useState("Income");
  const [category, setCategory] = useState("Salary");

  const incomeCategories = ["Salary", "Bonus", "Investment", "Freelance", "Other"];
  const expenseCategories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];

//new added 
const [selectedTransaction, setSelectedTransaction] = useState(null);

 console.log(user);
 const handlemodal=(transaction)=>{
   setSelectedTransaction(transaction);
   setType(transaction.type);
  setCategory(transaction.category);
  myref.current.showModal()
 }
  const handleupdateTansaction = (e) =>{
 e.preventDefault()
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
 axios.patch(`http://localhost:3000/transactions/${selectedTransaction._id}`, newTransaction)
.then(data=>{console.log(data.data);
  toast.success("New Transaction Added")
   setMytransaction(old =>
        old.map(t => t._id === selectedTransaction._id ? { ...t, ...newTransaction } : t)
      );
      myref.current.close();
})
.catch(error=>{
  console.log(error.message);
  toast.error(error.message)
  
})

  }
  const handleDelete = (id) =>{
   axios.delete(`http://localhost:3000/transactions/${id}`)
   .then(data=>{
    console.log(data.data);
    if (data.data.deletedCount) {
        const remainingTransaction = mytransaction.filter((t) => t._id !== id); 
        setMytransaction(remainingTransaction);
      }
    })
   


  }
//   const handleView = (id) => {
//   axios.get(`http://localhost:3000/transactions/${id}`)
//     // .then(res => {
//     //   setDetails(res.data); 
//     //   console.log(res.data);
//     // })
//     // .catch(error => {
//     //   console.log(error.message);
//     // });
// };



const navigate = useNavigate();

const handleView = (id) => {
  navigate(`/transactions/${id}`);
};
  
  useEffect(()=>{
 axios.get(`http://localhost:3000/add-transaction?email=${user?.email}`)
 .then(data=>{console.log(data.data);
    setMytransaction(data.data)
 })

  },[user])






  return (
    <div className="p-6 w-full mx-auto ">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        My Transactions-({mytransaction.length})
      </h2>
    
    {/* <p>{details?.data?.email}</p> */}
   
      <div className="space-y-4">
        {mytransaction.map((t) => (
          <div
            key={t._id}
            className="flex flex-row-reverse items-center justify-between  rounded-lg shadow-md bg-blue-100 p-4 hover:shadow-md transition"
          >
            {/* Left: Buttons */}
            <div className="flex  gap-2">
              <button
                onClick={()=>handlemodal(t)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
              >
                <FaEdit /> Update
              </button>

              <button
                onClick={() => handleDelete(t._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
              >
                <FaTrashAlt /> Delete
              </button>

              <button
                onClick={() => handleView(t._id)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
              >
                <FaEye /> View
              </button>
            </div>

            {/* Right: Transaction Info */}
            <div className="flex-1 ml-6 grid grid-cols-3 gap-x-6 gap-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Type:</span> {t.type}
              </p>
              <p>
                <span className="font-semibold">Category:</span> {t.category}
              </p>
              <p>
                <span className="font-semibold">Amount:</span> ${t.amount}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {t.date}
                
              </p>
              <p>
                <span className="font-semibold">Name:</span> {t.name}
                
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

<dialog ref={myref} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    
  {/* update form */}
 <form onSubmit={handleupdateTansaction} className="space-y-4">

        {/* Type - Radio buttons */}
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

        {/* Category - Dynamic Dropdown */}
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

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            defaultValue={selectedTransaction?.amount || ""}
            name="amount"
            placeholder="Enter amount"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            defaultValue={selectedTransaction?.description || ""}
            placeholder="Enter description"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Date */}
        <div>
          <label defaultValue={selectedTransaction?.date || ""} className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* User Info */}
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

        {/* Submit */}
        <div className="text-center pt-3">
          <button
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md transition duration-200"
          >
            Update
          </button>
          <div className="modal-action ">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md transition duration-200">Close</button>
      </form>
    </div>
        </div>
      </form>



   
  </div>
</dialog>
<Toaster/>
    </div>
  );
};

export default MyTransaction;
