"use client";
import logo from "../../../public/assets/logo.svg";
import { RxCross2 } from "react-icons/rx";
import { useState, useRef, useEffect } from "react";
import { RiMenu2Line } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoSearch } from "react-icons/go";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { status, data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = (
    <>
      <Link
        onClick={() => setIsOpen(false)}
        className="px-4 py-1 font-semibold rounded-full text-sm"
        href="/"
      >
        Home
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        className="px-4 py-1 font-semibold rounded-full text-sm"
        href="/my-bookings"
      >
        My Bookings
      </Link>
    </>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar sticky z-50 bg-base-100 py-3 px-6 shadow top-0">
      <div className="navbar-start">
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost">
            {isOpen ? <RxCross2 size={20} /> : <RiMenu2Line size={20} />}
          </button>
        </div>

        <Link href="/" className="ml-3">
          <Image
            src={logo}
            alt="Car Doctor Logo"
            className="h-10 sm:h-13 w-auto"
          />
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
        {status === "authenticated" ? (
          <>
            <img
              src={session.user.image}
              alt="Profile"
              className="rounded-full object-cover -mr-2 w-12 h-12"
            />
            <button
              onClick={() => signOut()}
              className="btn font-bold rounded-sm btn-error btn-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              onClick={() => setIsOpen(false)}
              className="font-semibold text-sm"
              href="/login"
            >
              Login
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              className="font-semibold text-sm"
              href="/register"
            >
              Register
            </Link>
          </>
        )}
        <HiOutlineShoppingBag
          size={20}
          className="cursor-pointer"
        ></HiOutlineShoppingBag>
        <GoSearch size={20} className="cursor-pointer"></GoSearch>
        <button className="btn btn-primary border-[1.5px] rounded-md hover:text-white btn-outline">
          Appointment
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full w-40 -mt-2 left-4 z-10 md:hidden bg-base-100 rounded-box p-2 place-items-center shadow"
        >
          <ul className="menu space-y-2 text-center">
            {navLinks}
            <Link
              onClick={() => setIsOpen(false)}
              className="px-4 py-1 font-semibold text-sm"
              href="/login"
            >
              Login
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              className="px-4 py-1 font-semibold text-sm"
              href="/register"
            >
              Register
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
