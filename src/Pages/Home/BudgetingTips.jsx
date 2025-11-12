import React from "react";
import { Lightbulb, Wallet, TrendingUp } from "lucide-react";

const BudgetingTips = () => {
  const tips = [
    {
      icon: <Wallet className="w-10 h-10 text-primary" />,
      title: "Track Every Expense",
      desc: "Record each transaction — even small ones — to truly understand your spending patterns and avoid unnecessary leaks.",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-primary" />,
      title: "Set Realistic Budgets",
      desc: "Use FinEase to set monthly limits that align with your income and goals. Staying consistent matters more than perfection.",
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-primary" />,
      title: "Review Regularly",
      desc: "Check your financial summaries and adjust your budgets when needed. Small adjustments lead to big improvements.",
    },
  ];

  return (
    <section className=" py-16 px-6">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          💡 Smart <span className="text-primary">Budgeting Tips</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-12">
          Master your money habits with simple but powerful budgeting strategies.
          FinEase helps you plan smarter, save better, and reach your goals faster.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="text-black p-6 rounded-2xl shadow hover:shadow-lg bg-white transition-all"
            >
              <div className="flex justify-center mb-4">{tip.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
              <p className="text-gray-600">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BudgetingTips;
