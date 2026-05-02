import React from "react";
import useHelmet from "../../Hooks/useHelmet";

const RefundPolicy = () => {
  return (
    <div className="bg-surface min-h-screen py-16">
      {useHelmet("Refund Policy")}
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12 border border-slate-100">
          <h1 className="text-4xl font-heading font-bold text-slate-800 mb-6">Refund Policy</h1>
          <p className="text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Return Window</h2>
              <p>You have 14 days from the date of delivery to request a return or refund for eligible items. Due to the sensitive nature of pharmaceutical products, strict conditions apply.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Eligible Items</h2>
              <p>To be eligible for a return, the medicine must be unused, in the same condition that you received it, and in its original, unopened packaging. Prescription medications are strictly non-refundable.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Refund Process</h2>
              <p>Once your return is received and inspected, we will send you an email to notify you of the approval or rejection of your refund. If approved, your refund will be processed to your original method of payment within 5-7 business days.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Damaged or Incorrect Items</h2>
              <p>If you receive a damaged or incorrect item, please contact our support team within 24 hours of delivery. We will arrange a replacement or a full refund at no additional cost to you.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
