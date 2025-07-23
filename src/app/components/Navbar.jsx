"use client";
import logo from "../../../public/assets/logo.svg";
import { RxCross2 } from "react-icons/rx";
import { useState, useRef, useEffect } from "react";
import { RiMenu2Line } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoSearch } from "react-icons/go";

const Navbar = () => {
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
        href="/about"
      >
        About
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        className="px-4 py-1 font-semibold rounded-full text-sm"
        href="/services"
      >
        Services
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        className="px-4 py-1 font-semibold rounded-full text-sm"
        href="/blog"
      >
        Blog
      </Link>
      <Link
        onClick={() => setIsOpen(false)}
        className="px-4 py-1 font-semibold rounded-full text-sm"
        href="/contact"
      >
        Contact
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

      {/* <div className="navbar-end">
        {user ? (
          <>
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="rounded-full object-cover w-13 mr-2 h-13 cursor-pointer"
                />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 w-56 rounded-box z-10 mt-1 space-y-2 text-center shadow"
              >
                <li className="text-xs">Hi, {user.displayName}</li>
                <li className="text-xs">{userEmail}</li>
                <Link
                  className="px-4 py-1 font-semibold rounded-full text-sm"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm font-bold w-[50%] mx-auto btn-error"
                >
                  Logout
                </button>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="btn bg-primary text-white border-2 border-primary hover:bg-transparent hover:text-primary mr-2">
                Login
              </button>
            </Link>
            <Link to="/register" className="hidden md:inline">
              <button className="btn bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white">
                Register
              </button>
            </Link>
          </>
        )}
      </div> */}
      <div className="navbar-end flex items-center gap-4">
        <HiOutlineShoppingBag size={20} className="cursor-pointer"></HiOutlineShoppingBag>
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
            {/* {!user && (
              <Link href="/register" onClick={() => setIsOpen(false)}>
                <button className="btn bg-transparent w-full text-primary border-2 border-primary hover:bg-primary hover:text-white">
                  Register
                </button>
              </Link>
            )} */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
