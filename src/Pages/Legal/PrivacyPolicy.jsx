import React from "react";
import useHelmet from "../../Hooks/useHelmet";

const PrivacyPolicy = () => {
  return (
    <div className="bg-surface min-h-screen py-16">
      {useHelmet("Privacy Policy")}
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12 border border-slate-100">
          <h1 className="text-4xl font-heading font-bold text-slate-800 mb-6">Privacy Policy</h1>
          <p className="text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Information We Collect</h2>
              <p>We collect information that you provide directly to us, including your name, email address, shipping address, and payment information when you register or make a purchase on Medicaid.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to process transactions, manage your account, communicate with you about orders, and improve our services.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Data Security</h2>
              <p>We implement strict security measures to protect your personal information. All payment transactions are encrypted and processed securely. We do not store your full credit card details on our servers.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Sharing Your Information</h2>
              <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except trusted third parties who assist us in operating our website, conducting our business, or servicing you.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at support@medicaid.com.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
