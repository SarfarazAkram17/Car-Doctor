"use client";
import React from "react";
import Link from "next/link";
import SocialLogin from "@/app/login/components/SocialLogin";
import { registerUser } from "@/app/actions/registerUser";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const res = await registerUser({ name, photo, email, password });
    if (res) {
      if (res?.insertedId) {
        toast.success("You registered successfully");
      }
      toast.warn(res.message);
    } else {
      toast.error("You can't registered");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-8">
        <label className="form-control w-full">
          <div className="label w-full">
            <span className="label-text font-bold text-sm mb-2">Name</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full mb-4"
            name="name"
          />
        </label>
        <label className="form-control w-full">
          <div className="label w-full">
            <span className="label-text font-bold text-sm mb-2">Photo URL</span>
          </div>
          <input
            type="url"
            placeholder="Type here"
            className="input input-bordered w-full mb-4"
            name="photo"
          />
        </label>
        <label className="form-control w-full">
          <div className="label w-full">
            <span className="label-text font-bold text-sm mb-2">Email</span>
          </div>
          <input
            type="text"
            name="email"
            placeholder="Type here"
            className="input input-bordered w-full mb-4"
          />
        </label>
        <label className="form-control w-full">
          <div className="label w-full">
            <span className="label-text font-bold text-sm mb-2">Password</span>
          </div>
          <input
            type="password"
            name="password"
            placeholder="Type here"
            className="input input-bordered w-full mb-4"
          />
        </label>
        <button className="btn btn-primary border-[1.5px] w-full mt-2 rounded-lg btn-outline hover:text-white">
          Register
        </button>
      </form>
      <div className="divider my-8">Or Sign In with</div>
      <SocialLogin />
      <p className="text-center text-sm mt-4">
        Don't Have an account?{" "}
        <Link href="/login" className="text-primary font-bold hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
