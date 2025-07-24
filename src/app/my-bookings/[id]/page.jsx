import { headers } from "next/headers";
import BookingUpdateForm from "../../components/forms/BookingUpdateForm";
import React from "react";

const UpdateBooking = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`https://car-doctor-snowy.vercel.app/api/my-bookings/${id}`, {
    headers: new Headers(await headers()),
  });
  const booking = await res.json();

  return (
    <div>
      <BookingUpdateForm booking={booking}></BookingUpdateForm>
    </div>
  );
};

export default UpdateBooking;
