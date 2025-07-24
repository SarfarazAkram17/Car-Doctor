import DeleteBookingButton from "../../my-bookings/components/DeleteBookingButton";
import Image from "next/image";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

const MyBookingsTable = ({ bookings }) => {
  return (
    <div className="my-8">
      <h1 className="text-center font-bold text-3xl mb-6">My All Bookings</h1>
      <div className="overflow-x-auto rounded-box border border-base-content/5">
        <table className="w-full text-center table table-zebra table-sm">
          <thead className="border">
            <tr>
              <th>Service Image</th>
              <th>Service Name</th>
              <th>Service Date</th>
              <th>Service Price</th>
              <th>Phone</th>
              <th>Address</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking) => {
              return (
                <tr key={booking._id} className="border">
                  <td className="flex justify-center">
                    <Image
                      src={booking.service_img}
                      alt={booking.service_name}
                      width={100}
                      height={70}
                      className="rounded-md"
                    />
                  </td>
                  <td>{booking.service_name}</td>
                  <td>{booking.date}</td>
                  <td>{booking.service_price}</td>
                  <td>{booking.phone}</td>
                  <td
                    className="truncate max-w-[100px]"
                    title={booking.address}
                  >
                    {booking.address}
                  </td>
                  <td>
                    <Link href={`/my-bookings/${booking._id}`}>
                      <FaRegEdit size={20} className="cursor-pointer" />
                    </Link>
                  </td>

                  <td>
                    <DeleteBookingButton id={booking._id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookingsTable;
