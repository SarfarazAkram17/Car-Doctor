import Image from "next/image";
import React from "react";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold text-center my-8">Register</h1>
      <section className="container mx-auto grid grid-cols-12">
        {/* Left Section */}
        <div className="col-span-12 md:col-span-6 flex justify-center items-start">
          <Image
            className="hidden md:block"
            src={"/assets/images/login/login.svg"}
            width={350}
            height={400}
            alt={"Authentication Image"}
          />
        </div>

        {/* Right Section */}
        <div className="col-span-12 md:col-span-6 flex justify-center items-center">
          <RegisterForm />
        </div>
      </section>
    </div>
  );
}