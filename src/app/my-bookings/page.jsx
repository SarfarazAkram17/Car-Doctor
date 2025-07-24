import { headers } from "next/headers";
import MyBookingsTable from "../components/table/MyBookingsTable";

const MyBookings = async () => {
  const fetchMyBookings = async () => {
    const res = await fetch("http://localhost:3000/api/service", {
      headers: await headers(),
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
