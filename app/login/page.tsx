"use client";

import { motion } from "framer-motion";
import React from "react";
import { Link } from "@heroui/link";
import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center transition-colors duration-500 px-2">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md flex flex-col items-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-3xl font-extrabold mb-2 mt-8 tracking-tight text-gray-900 dark:text-white text-center"
        >
          Login
        </motion.h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
          Welcome back! Please enter your credentials.
        </p>
        <div className="flex flex-col items-center gap-4 w-full">
          <LoginForm />
          <div className="mt-4 w-full flex flex-col items-center gap-2">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline focus:underline transition-colors outline-none"
              tabIndex={0}
            >
              Forgot Password?
            </Link>
            <Link
              href="/signup"
              className="text-sm text-violet-600 dark:text-violet-400 hover:underline focus:underline transition-colors outline-none"
              tabIndex={0}
            >
              Don&apos;t have an account?{" "}
              <span className="font-semibold">Sign Up</span>
            </Link>
          </div>
        </div>
      </motion.div>
      <style jsx global>{`
        body {
          transition: background 0.5s;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
