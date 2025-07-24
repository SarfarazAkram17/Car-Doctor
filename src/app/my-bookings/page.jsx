import { headers } from "next/headers";
import MyBookingsTable from "../components/table/MyBookingsTable";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const MyBookings = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const fetchMyBookings = async () => {
    const res = await fetch("https://car-doctor-snowy.vercel.app/api/service", {
      headers: new Headers(await headers()),
    });
    const bookings = await res.json();
    return bookings;
  };

  const bookings = await fetchMyBookings();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <MyBookingsTable bookings={bookings}></MyBookingsTable>
    </div>
  );
};

export default MyBookings;
