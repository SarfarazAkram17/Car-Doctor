import Link from "next/link";

const ServiceDetails = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`https://car-doctor-snowy.vercel.app/api/service/${id}`);
  const service = await res.json();

  return (
    <div className="max-w-5xl px-4 mx-auto py-10">
      <section className="flex justify-center rounded-lg overflow-hidden mb-16">
        <figure className="relative">
          <img
            className="w-full"
            src="https://i.ibb.co/1Y3CP07h/checkout.png"
            alt={"banner"}
          />
          <div className="transparent-layer overlay-bg absolute w-full h-full top-0">
            <div className="w-full h-full font-bold text-2xl flex items-center ps-16">
              <div>
                <h1 className="text-white text-2xl">{service?.title}</h1>
              </div>
            </div>
          </div>
        </figure>
      </section>
      <section className="container mx-auto grid grid-cols-12 gap-4 mt-4">
        {/* Left Side */}
        <div className="col-span-9 space-y-4">
          <img
            className="w-full rounded-lg"
            src={service?.img}
            alt={service?.title}
          />
          <h1 className="font-bold text-3xl">{service?.title}</h1>
          <p className="text-justify">{service?.description}</p>
        </div>
        {/* Right Side */}
        <div className="col-span-3 space-y-4">
          <p className="text-center text-xl font-bold">
            Price: $ {service?.price}
          </p>
          <Link href={`/checkout/${service?._id}`}>
            <button className="btn btn-primary w-full rounded-md text-white">
              Checkout
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetails;
