import CheckoutForm from "@/app/components/forms/CheckoutForm";

const Checkout = async ({ params }) => {
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

      <CheckoutForm service={service}></CheckoutForm>
    </div>
  );
};

export default Checkout;
