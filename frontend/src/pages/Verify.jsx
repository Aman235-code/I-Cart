import React from "react";

const Verify = () => {
  return (
    <div className="relative w-full h-190 overflow-hidden">
      <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold text-green-500 mb-4">
            ✅ Check Your Email
          </h2>
          <p className="text-gray-400 text-sm">
            We have sent you an email to verify your account. Please check your
            inbox and click the verification link
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
