"use client";
import { useState } from "react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("Yearly");

  const plans = [
    {
      name: "Starter",
      price: "$0.0",
      description: "/month",
      buttonText: "Sign up for free",
      buttonColor: "bg-[#0058be]",
      icon: "settings",
      features: [
        { text: "300 Credits/Month", included: true },
        { text: "10 Credits/day", included: true },
        { text: "Snaps & Chats", included: true },
        { text: "PDF Homework Help", included: true },
        { text: "Normal Response Time", included: true },
        { text: "Step-by-Step Video Explanation", included: false },
        { text: "Answer Accuracy", included: false },
        { text: "Focused AI", included: false },
        { text: "No Ads", included: false },
      ],
    },
    {
      name: "Pro",
      price: "$2.99",
      description: "/month Billed Yearly",
      billedYearly: "$35.88",
      originalPrice: "$5.99/month",
      originalTotal: "Billed Yearly $71.88",
      buttonText: "Choose Plan",
      buttonColor: "bg-[#f3bc20]", // Yellow color from image
      isPopular: true,
      discount: "50% OFF",
      icon: "bolt",
      features: [
        { text: "Unlimited Credits/Month", included: true },
        { text: "No daily limit", included: true },
        { text: "Snaps & Chats", included: true },
        { text: "PDF Homework Help", included: true },
        { text: "Priority Response Time", included: true },
        { text: "Step-by-Step Video Explanation", included: true },
        { text: "Answer Accuracy (Exceeds 90%)", included: true },
        { text: "Focused AI", included: true },
        { text: "No Ads", included: true },
      ],
    },
    {
      name: "Plus",
      price: "$1.99",
      description: "/month",
      billedYearly: "Billed Yearly $23.88",
      buttonText: "Choose Plan",
      buttonColor: "bg-[#0058be]",
      icon: "shield",
      features: [
        { text: "1000 Credits/Month", included: true },
        { text: "No daily limit", included: true },
        { text: "Snaps & Chats", included: true },
        { text: "PDF Homework Help", included: true },
        { text: "Priority Response Time", included: true },
        { text: "Step-by-Step Video Explanation", included: true },
        { text: "Answer Accuracy (Exceeds 90%)", included: true },
        { text: "Focused AI", included: true },
        { text: "No Ads", included: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-[#0058be] dark:text-blue-400 mb-10">
          Plans & Pricing
        </h1>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-black rounded-full p-1 flex items-center shadow-xl">
            {["Monthly", "Semester", "Yearly"].map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  billingCycle === cycle
                    ? "bg-[#0058be] text-white"
                    : "text-white hover:text-blue-300"
                }`}
              >
                {cycle}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-[2.5rem] p-8 transition-all flex flex-col ${
                plan.isPopular
                  ? "bg-[#0058be] text-white scale-105 shadow-2xl z-10 border-2 border-yellow-500"
                  : "bg-black text-white shadow-xl"
              }`}
            >
              {/* Badges for Pro Plan */}
              {plan.isPopular && (
                <div className="absolute -top-10 left-0 right-0 flex justify-center gap-2">
                  <span className="bg-yellow-500 text-black text-[10px] font-black px-4 py-1 rounded-full uppercase">
                    Popular
                  </span>
                  <span className="bg-red-500 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase">
                    {plan.discount}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-2xl">{plan.icon}</span>
                <h3 className="text-3xl font-bold tracking-tight">{plan.name}</h3>
              </div>

              <div className="mb-6 text-left">
                <div className="flex items-baseline gap-1">
                  <span className={`text-5xl font-black ${plan.isPopular ? 'text-yellow-500' : 'text-white'}`}>
                    {plan.price}
                  </span>
                  <span className="text-sm opacity-80">{plan.description}</span>
                </div>
                {plan.billedYearly && (
                  <p className="text-xs opacity-70 mt-1">{plan.billedYearly}</p>
                )}
                {plan.originalPrice && (
                    <div className="mt-2 opacity-60 text-xs line-through italic">
                        {plan.originalPrice} <br/> {plan.originalTotal}
                    </div>
                )}
              </div>

              <button
                className={`w-full py-4 rounded-xl font-black text-lg mb-8 transition-transform active:scale-95 ${
                  plan.buttonColor
                } ${plan.isPopular ? 'text-black' : 'text-white'}`}
              >
                {plan.buttonText}
              </button>

              <div className="space-y-4 text-left flex-1">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-3">
                    <span className={`material-symbols-outlined text-lg ${
                        feature.included 
                        ? (plan.isPopular ? 'text-white' : 'text-green-500') 
                        : 'text-red-500'
                    }`}>
                      {feature.included ? "check_circle" : "lock"}
                    </span>
                    <span className={`text-xs font-medium ${!feature.included && 'opacity-50'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}