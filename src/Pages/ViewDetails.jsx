
import { useLocation, Link } from "react-router";
import { FaArrowLeft, FaDollarSign, FaCalendarAlt, FaUser, FaTag, FaAlignLeft } from "react-icons/fa";
import { number } from "framer-motion";

const ViewDetails = () => {
  const location = useLocation();
  const {transaction,allTransaction}= location.state || {}

  if (!transaction) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <p className="text-3xl">No transaction data found.</p>
        <Link to="/my-transaction" className="text-blue-600 underline">
          Back to My Transactions
        </Link>
      </div>
    );
  }

 const categorytotal=allTransaction?allTransaction.filter((tn) =>tn.category === transaction.category)
  .reduce((acc,tn)=>acc+Number(tn.amount),0):transaction.amount;

  return (
    <div className="max-w-3xl my-10 mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-xl mt-12">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8 tracking-wide">
        Transaction Details
      </h2>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-5 transition-all duration-300 hover:shadow-xl">
        <div className="flex justify-between border-b border-purple-600 pb-3">
          <span className="text-gray-600 font-semibold flex items-center gap-2">
            <FaTag className="text-blue-500" /> Type
          </span>
          <span className="text-gray-800 font-medium capitalize">{transaction.type}</span>
        </div>

        <div className="flex justify-between border-b border-purple-600 pb-3">
          <span className="text-gray-600 font-semibold flex items-center gap-2">
            <FaAlignLeft className="text-pink-500" /> Category
          </span>
          <span className="text-gray-800 font-medium">{transaction.category}</span>
        </div>

        <div className="flex justify-between border-b border-purple-600 pb-3">
          <span className="text-gray-600 font-semibold flex items-center gap-2">
            <FaDollarSign className="text-green-500" /> Amount
          </span>
          <span className="text-gray-800 font-bold text-lg">${transaction.amount}</span>
        </div>
        <div className="flex justify-between border-b border-purple-600 pb-3">
          <span className="text-gray-600 font-semibold flex items-center gap-2">
            <FaDollarSign className="text-green-500" /> Category Total
          </span>
          <span className="text-gray-800 font-bold text-lg">${categorytotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between border-b border-purple-600 pb-3">
          <span className="text-gray-600 font-semibold flex items-center gap-2">
            <FaCalendarAlt className="text-orange-400" /> Date
          </span>
          <span className="text-gray-800 font-medium">{transaction.date}</span>
        </div>

        <div className="flex justify-between border-b border-purple-600 pb-3">
          <span className="text-gray-600 font-semibold flex items-center gap-2">
            <FaUser className="text-purple-500" /> Name
          </span>
          <span className="text-gray-800 font-medium">{transaction.name}</span>
        </div>

        <div className="flex justify-between border-b border-purple-600 pb-3">
          <span className="text-gray-600 font-semibold flex items-center gap-2">
            <FaUser className="text-cyan-600" /> Email
          </span>
          <span className="text-gray-800 font-medium">{transaction.email}</span>
        </div>

        <div className="mt-4">
          <span className="block text-gray-600 font-semibold mb-1 flex items-center gap-2">
            <FaAlignLeft className="text-indigo-400" /> Description
          </span>
          <p className="bg-gray-50 p-3 rounded-md border border-purple-600 text-gray-700 italic">
            {transaction.description || "No description provided."}
          </p>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/my-transaction"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-medium shadow transition-all duration-300 hover:scale-105"
        >
          <FaArrowLeft /> Back to My Transactions
        </Link>
      </div>
    </div>
  );
};

export default ViewDetails;
