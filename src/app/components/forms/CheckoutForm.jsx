"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CheckoutForm = ({ service }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleBookService = async (e) => {
    e.preventDefault();

    if (status !== "authenticated") {
      toast.warn("Login first");
      router.push("/login");
      return;
    }

    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const email = form.email.value;
    const bookingPayload = {
      // Session
      customerName: name,
      email,

      // User Inputs
      date,
      phone,
      address,

      // Extra information
      service_id: service._id,
      service_name: service.title,
      service_img: service.img,
      service_price: service.price,
    };

    const res = await fetch("http://localhost:3000/api/service", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingPayload),
    });
    const postedResponse = await res.json();
    if (postedResponse.insertedId) {
      toast.success("You booking is done");
      form.reset()
    }
    console.log("POSTED service", postedResponse);
  };

  return (
    <div className="my-10">
      <div className="w-11/12 mx-auto">
        <h2 className="text-center text-3xl mb-10">
          Book Service : {service?.title}
        </h2>
        <form onSubmit={handleBookService}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                defaultValue={session?.user?.name}
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
                defaultValue={session?.user?.email}
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
                defaultValue={service?.price}
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
              <input type="date" name="date" required className="input input-bordered w-full block mt-2" />
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
                className="input input-bordered w-full block mt-2"
              />
            </div>
          </div>
          <div className="form-control mt-10">
            <input
              className="btn btn-primary btn-block text-white rounded-lg"
              type="submit"
              value="Order Confirm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
