import React from 'react';
import { use } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Link } from 'react-router';

const Report = () => {
    const {user}=use(AuthContext)
    const [transactions,setTransactions]=useState([])


    useEffect(()=>{

        if(user?.email){
            axios.get(`https://fin-ease-api-server-9lq391k9f-fahim-ajhars-projects.vercel.app/add-transaction?email=${user.email}`)
            .then(data=>{console.log(data.data)
                setTransactions(data.data)
            })
            .catch(error=>{console.log(error.message);
            })
        }
    },[user])


    if(!transactions.length){
        return <div className="flex flex-col items-center justify-center min-h-[200px] rounded-xl shadow-md p-6 space-y-4">
  <p className="text-gray-600 text-lg font-medium">
    No Data Added For Reporting.
  </p>
  <Link
    to={'/add-transaction'}
    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
  >
    Add Transaction
  </Link>
</div>

    }

    const categorydata=transactions.filter((tr)=>tr.type==="Expense")
    .reduce((acc,cur)=>{
        const amount=parseFloat(cur.amount)
        const rslt=acc.find((itm) => itm.name === cur.category);
        if (rslt) {
        rslt.value += amount;
      } 
      else {
        acc.push({ name: cur.category, value: amount });
    }
return acc
 }, []);


 const monthlydata=transactions.reduce((acc,cur)=>{
     const month = new Date(cur.date).toLocaleString("default", { month: "short" });
    const amount = parseFloat(cur.amount)
    const rslt = acc.find((itm) => itm.month === month)
    if (rslt) {
      rslt[cur.type] = (rslt[cur.type] || 0) + amount;
    } else {
      acc.push({ month, [cur.type]: amount });
    }
    return acc;
  }, []);
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D93654", "#A78BFA"];

    
    return (
      <div className="text-black max-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">Financial Report</h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* ===== Pie Chart ===== */}
        <div className=" outline-2 bg-blue-100 outline-primary p-4 rounded-xl">
          <h3 className="text-xl font-semibold mb-4 text-center">Expense by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categorydata}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {categorydata.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ===== Bar Chart ===== */}
        <div className="outline-2 bg-blue-100 outline-primary p-4 rounded-xl">
          <h3 className="text-xl font-semibold mb-4 text-center">Monthly Income vs Expense</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlydata}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Income" fill="#4CAF50" />
              <Bar dataKey="Expense" fill="#F87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    );
};

export default Report;