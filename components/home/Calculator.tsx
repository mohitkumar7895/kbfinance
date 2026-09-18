"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function Calculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(10.5);
  const [tenure, setTenure] = useState(5);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const p = amount;
    const r = rate / 12 / 100;
    const n = tenure * 12;
    
    if (n === 0 || r === 0) {
      setEmi(n === 0 ? 0 : p / n);
      setTotalInterest(0);
      setTotalPayment(p);
      return;
    }

    const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaymentValue = emiValue * n;
    const totalInterestValue = totalPaymentValue - p;

    setEmi(Math.round(emiValue));
    setTotalPayment(Math.round(totalPaymentValue));
    setTotalInterest(Math.round(totalInterestValue));
  }, [amount, rate, tenure]);

  const data = [
    { name: "Principal Amount", value: amount, color: "#1952B3" },
    { name: "Total Interest", value: totalInterest, color: "#D4AF37" },
  ];

  const formatRupee = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F8FAFC] to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-6">
              Calculate Your Loan EMI
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Use our interactive EMI calculator to plan your finances better. Get an estimate of your monthly payments instantly.
            </p>

            <div className="space-y-8">
              {/* Amount Slider */}
              <div>
                <div className="flex justify-between mb-4">
                  <label className="font-semibold text-[#0A2540]">Loan Amount</label>
                  <span className="font-bold text-[#1952B3] text-xl">{formatRupee(amount)}</span>
                </div>
                <Slider
                  min={10000}
                  max={5000000}
                  step={10000}
                  value={[amount]}
                  onValueChange={(val: any) => {
                    const v = Array.isArray(val) ? val[0] : val;
                    if (!isNaN(Number(v))) setAmount(Number(v));
                  }}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>₹10,000</span>
                  <span>₹50,00,000</span>
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div>
                <div className="flex justify-between mb-4">
                  <label className="font-semibold text-[#0A2540]">Interest Rate (p.a.)</label>
                  <span className="font-bold text-[#1952B3] text-xl">{rate}%</span>
                </div>
                <Slider
                  min={1}
                  max={25}
                  step={0.1}
                  value={[rate]}
                  onValueChange={(val: any) => {
                    const v = Array.isArray(val) ? val[0] : val;
                    if (!isNaN(Number(v))) setRate(Number(v));
                  }}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>1%</span>
                  <span>25%</span>
                </div>
              </div>

              {/* Tenure Slider */}
              <div>
                <div className="flex justify-between mb-4">
                  <label className="font-semibold text-[#0A2540]">Loan Tenure</label>
                  <span className="font-bold text-[#1952B3] text-xl">{tenure} Years</span>
                </div>
                <Slider
                  min={1}
                  max={30}
                  step={1}
                  value={[tenure]}
                  onValueChange={(val: any) => {
                    const v = Array.isArray(val) ? val[0] : val;
                    if (!isNaN(Number(v))) setTenure(Number(v));
                  }}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>1 Yr</span>
                  <span>30 Yrs</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-2xl border-none bg-gradient-to-br from-[#0A2540] to-[#1952B3] text-white">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <p className="text-blue-200 mb-2 font-medium">Equated Monthly Installment (EMI)</p>
                  <h3 className="text-4xl md:text-5xl font-bold text-[#D4AF37]">
                    {formatRupee(emi)}
                  </h3>
                </div>

                <div className="h-48 md:h-64 mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => formatRupee(Number(value))}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#1952B3]"></span>
                      <span className="text-blue-100">Principal Amount</span>
                    </div>
                    <span className="font-semibold">{formatRupee(amount)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#D4AF37]"></span>
                      <span className="text-blue-100">Total Interest</span>
                    </div>
                    <span className="font-semibold">{formatRupee(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Total Amount Payable</span>
                    <span className="font-bold text-xl">{formatRupee(totalPayment)}</span>
                  </div>
                </div>

                <Link href="/contact" className="block w-full">
                  <Button size="lg" className="w-full bg-[#D4AF37] hover:bg-[#C19B2E] text-[#0A2540] font-bold text-lg h-14 rounded-full">
                    Apply Now
                  </Button>
                </Link>
                <p className="text-center text-xs text-white/50 mt-4">
                  *This is an estimate. Actual terms may vary based on eligibility.
                </p>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
