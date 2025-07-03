"use client";
import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full px-4">
      <div className="flex flex-col gap-1">
        {/* <label htmlFor="email" className="text-sm font-medium">
          Email
        </label> */}
        <Input label="Email" type="email" />
        {/* <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full"
        /> */}
      </div>
      <div className="flex flex-col gap-1">
        <Input label="Password" type="password" />
        {/* <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full"
        /> */}
      </div>
      <Button type="submit" className="mt-2 w-full" variant="solid" size="lg">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
