"use client";
import React from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // setError(null);
    setLoading(true);

    const result = await login({ email, password });
    if (result) {
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-5 w-full px-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* {error && <div className="text-sm text-red-600 text-center">{error}</div>} */}
      <Button
        className="mt-2 w-full"
        size="lg"
        type="submit"
        variant="solid"
        isDisabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
