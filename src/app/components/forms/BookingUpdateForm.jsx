"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const BookingUpdateForm = ({ booking }) => {
  const router = useRouter();

  const handleUpdateBooking = async (e) => {
    e.preventDefault();

    const form = e.target;
    const date = form.date.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const updatedBooking = {
      date,
      phone,
      address,
    };

    const res = await fetch(`https://car-doctor-snowy.vercel.app/api/my-bookings/${booking._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedBooking),
    });
    const postedResponse = await res.json();
    if (postedResponse.modifiedCount) {
      toast.success("You booking is updated successfully");
      form.reset();
      router.push('/my-bookings')
    }
  };

  return (
    <div className="my-10">
      <div className="w-11/12 mx-auto">
        <h2 className="text-center text-3xl mb-10">
          Book Service : {booking?.title}
        </h2>

        <form onSubmit={handleUpdateBooking}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                defaultValue={booking.customerName}
                readOnly
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered w-full block mt-2"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                defaultValue={booking.email}
                readOnly
                type="text"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full block mt-2"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due amount</span>
              </label>
              <input
                type="text"
                defaultValue={booking?.service_price}
                readOnly
                name="price"
                placeholder="Service price"
                className="input input-bordered w-full block mt-2"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="date"
                defaultValue={booking.date}
                name="date"
                required
                className="input input-bordered w-full block mt-2"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Your Phone"
                required
                defaultValue={booking.phone}
                className="input input-bordered w-full block mt-2"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Present Address</span>
              </label>
              <input
                type="text"
                name="address"
                placeholder="Your Address"
                required
                defaultValue={booking.address}
                className="input input-bordered w-full block mt-2"
              />
            </div>
          </div>
          <div className="form-control mt-10">
            <input
              className="btn btn-primary btn-block text-white rounded-lg"
              type="submit"
              value="Update Booking"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingUpdateForm;
