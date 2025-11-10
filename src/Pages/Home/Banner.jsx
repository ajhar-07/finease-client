import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  const taglines = [
    "Take Control of Your Finances Today!",
    "Track. Save. Grow. – Your Journey to Financial Freedom.",
    "Every Taka Counts. Manage It with FinEase.",
    "Smart Budgets. Smarter Future.",
    "Visualize. Plan. Prosper. With FinEase."
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center rounded-3xl">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        Welcome to <span className="text-yellow-300">FinEase</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="max-w-3xl mx-auto text-lg md:text-xl text-gray-100 mb-8"
      >
        FinEase helps you manage your income, expenses, and savings goals. Record
        your transactions, set monthly budgets, and view insightful charts to
        understand your financial journey.
      </motion.p>

      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {taglines.map((line, i) => (
          <p
            key={i}
            className="text-lg md:text-xl italic text-yellow-200 font-medium"
          >
            “{line}”
          </p>
        ))}
      </motion.div>
    </div>
  );
};

export default Banner;
