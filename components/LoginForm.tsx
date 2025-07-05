"use client";
import React from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle login logic here
    const submit = await axios.post(
      `${process.env.BACKEND_URL}/api/v1/auth/login`,
      {
        email,
        password,
      }
    );
  };

  return (
    <form className="flex flex-col gap-5 w-full px-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        {/* <label htmlFor="email" className="text-sm font-medium">
          Email
        </label> */}
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
      <Button className="mt-2 w-full" size="lg" type="submit" variant="solid">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
