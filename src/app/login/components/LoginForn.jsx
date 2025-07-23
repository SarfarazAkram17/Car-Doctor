"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SocialLogin from "./SocialLogin";
import { toast } from "react-toastify";

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });
      if (response?.ok) {
        router.push("/");
        toast.success("Logged In successfully");
        form.reset();
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-8">
      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text font-bold mb-2 text-sm">Email</span>
        </div>
        <input
          type="text"
          name="email"
          placeholder="Type here"
          className="input input-bordered w-full mb-2"
        />
      </label>
      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text font-bold mb-2 text-sm">Password</span>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Type here"
          className="input input-bordered w-full mb-2"
        />
      </label>
      <button className="btn btn-primary btn-outline w-full rounded-lg hover:text-white mt-2">
        Login
      </button>
      <div className="divider mb-8">Or Sign In with</div>
      <SocialLogin />
      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/register"
          className="text-primary font-bold hover:underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
}
