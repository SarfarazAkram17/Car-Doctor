"use client";
import { FaGithub } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default function SocialLogin() {
//   const router = useRouter();
//   const session = useSession();

//   const handleSocialLogin = (providerName) => {
//     signIn(providerName);
//   };

//   useEffect(() => {
//     if (session?.status == "authenticated") {
//       router.push("/");
//       toast("Successfully Logged IN");
//     }
//   }, [session?.status]);

  return (
    <div className="flex justify-center gap-4">
      <button
        // onClick={() => handleSocialLogin("google")}
        className="bg-slate-200 rounded-full p-3 btn"
      >
        <FaGoogle type="button" size={18} />
      </button>
      <button
        // onClick={() => handleSocialLogin("github")}
        className="bg-slate-200 rounded-full p-3 btn"
      >
        <FaGithub type="button" size={22} />
      </button>
    </div>
  );
}