"use client";

import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
  };

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
          Sign Up
        </motion.h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
          Create your account to get started.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full px-4"
        >
          <Input
            label="Name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="w-full"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            placeholder="••••••••"
            className="w-full"
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
            placeholder="••••••••"
            className="w-full"
          />
          <Button
            type="submit"
            className="mt-2 w-full"
            variant="solid"
            size="lg"
          >
            Sign Up
          </Button>
        </form>
        <div className="mt-4 w-full flex flex-col items-center gap-2">
          <Link
            href="/login"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline focus:underline transition-colors outline-none"
            tabIndex={0}
          >
            Already have an account?{" "}
            <span className="font-semibold">Login</span>
          </Link>
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

export default SignupPage;
