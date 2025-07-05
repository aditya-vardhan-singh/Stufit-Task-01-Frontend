"use client";

import React, { useState } from "react";
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Logic to handle password reset request
  };

  return (
    <div className="container mx-auto max-w-md pt-16 px-6">
      <h1 className="text-3xl font-semibold mb-4">Forgot Password</h1>
      <p className="mb-6">Enter your email to receive a password reset link.</p>
      <ForgotPasswordForm
        email={email}
        setEmail={setEmail}
      />
    </div>
  );
};

export default ForgotPasswordPage;
