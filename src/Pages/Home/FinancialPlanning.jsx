import React from "react";
import { PieChart, Goal, ShieldCheck } from "lucide-react";

const FinancialPlanning = () => {
  const reasons = [
    {
      icon: <PieChart className="w-10 h-10 text-primary" />,
      title: "Gain Clarity & Control",
      desc: "Understand where your money goes and make confident financial decisions using FinEase insights and reports.",
    },
    {
      icon: <Goal className="w-10 h-10 text-primary" />,
      title: "Achieve Your Goals",
      desc: "Whether it’s saving for education, a car, or your future — financial planning turns dreams into actionable steps.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      title: "Be Prepared for the Unexpected",
      desc: "Build emergency savings and financial resilience to handle life’s surprises without stress.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16 px-6 rounded-3xl">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          💰 Why <span className="text-primary">Financial Planning</span> Matters
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-12">
          Financial planning isn’t just about saving money — it’s about creating
          freedom, stability, and peace of mind. FinEase empowers you to plan your
          financial future with confidence.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-all"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinancialPlanning;
