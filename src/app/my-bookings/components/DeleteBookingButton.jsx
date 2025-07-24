"use client";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const DeleteBookingButton = ({ id }) => {
    const router = useRouter()

  const handleDelete = async (id) => {
    const res = await fetch(`https://car-doctor-snowy.vercel.app/api/service/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    toast.success("You booking deleted successfully");

    router.refresh();
  };

  return (
    <MdDelete
      onClick={() => handleDelete(id)}
      size={25}
      className="text-red-500 cursor-pointer"
    />
  );
};

export default DeleteBookingButton;
