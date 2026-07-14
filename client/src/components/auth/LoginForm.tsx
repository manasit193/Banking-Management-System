"use client";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock,Eye,EyeOff } from "lucide-react";
import { login } from "@/services/auth.service";
import { useState, type SubmitEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
 const router = useRouter();
 const searchParams = useSearchParams();
 const [email, setEmail] = useState("");
 const [password,setPassword] = useState("");
 const [loading,setLoading] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
 const handleSubmit = async (
  e: SubmitEvent<HTMLFormElement>
) => {
  e.preventDefault();

  try {
    setLoading(true);

    const data = await login({
      email,
      password,
      
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    toast.success("Login Successful ✅");

    const redirect = searchParams.get("redirect");
    const destination =
      redirect ||
      (data.user?.role === "Admin" ? "/admin" : "/dashboard");

    router.push(destination);
  } catch (error: any) {
    console.error(error);

    toast.error(
      error.response?.data?.message || "Login Failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <motion.div
      initial={false}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center p-10"
    >
      <div className="w-full max-w-md">

        <h2 className="text-4xl font-bold text-gray-800">
          Welcome Back
        </h2>

        <p className="mt-2 text-gray-500">
          Login to continue to your banking dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">

          <div>

            <label className="mb-2 block font-medium text-black">
              Email Address
            </label>

            <div className="relative">

              <Mail className="absolute left-4 top-4 text-gray-400" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-gray-700"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block font-medium text-black">
              Password
            </label>

            <div className="relative">

              <Lock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-gray-700"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-gray-700">
                {showPassword ? <EyeOff className="text-gray-700" size={20} /> : <Eye className="text-gray-700" size={20} />}
              </button>
            </div>

          </div>

          <div className="flex items-center justify-between">

            <label className="flex items-center gap-2 text-sm text-black">

              <input type="checkbox" />

              Remember Me

            </label>

            <Link
              href="/forgot-password"
              className="text-sm font-medium text-blue-700 hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-700 py-3 text-lg font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="mt-8 text-center text-gray-500">

          Don't have an account?{" "}

          <Link
            href="/register"
            className="font-semibold text-blue-700 hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </motion.div>
  );
}