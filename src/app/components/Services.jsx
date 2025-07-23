import { collectionNames, dbConnect } from "@/lib/dbConnect";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const Services = async () => {
  const serviceCollection = dbConnect(collectionNames.servicesCollection);
  const services = await serviceCollection.find().toArray();

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-center font-bold text-primary mb-2">Service</h2>
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-6">
        Our Service Area
      </h2>
      <p className="text-center text-sm max-w-xl mx-auto text-gray-600 mb-10">
        the majority have suffered alteration in some form, by injected humour,
        or randomised words which don't look even slightly believable.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
        {services?.map((service) => (
          <div
            key={service._id}
            className="rounded-lg border-2 border-base-300 p-3 space-y-4"
          >
            <img
              src={service.img}
              className="h-60 sm:h-72 md:h-52 rounded-md w-full"
            />
            <h3 className="font-bold text-lg sm:text-xl text-secondary">
              {service.title}
            </h3>
            <div className="flex items-center justify-between">
              <h5 className="font-semibold text-primary">
                Price: ${service.price}
              </h5>
              <Link href={`/services/${service._id}`}>
              <FaArrowRight size={18} className="text-primary" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
