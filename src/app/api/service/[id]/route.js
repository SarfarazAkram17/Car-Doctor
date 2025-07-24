import { authOptions } from "@/lib/authOptions";
import { collectionNames, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const { id } = await params;
  const bookingsCollection = dbConnect(collectionNames.bookingsCollection);
  const booking = await bookingsCollection.findOne({ _id: new ObjectId(id) });

  const session = await getServerSession(authOptions);
  if (session?.user?.email === booking.email) {
    const result = await bookingsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    revalidatePath('/my-bookings')
    return NextResponse.json(result);
  } else {
    return NextResponse.json(
      { success: false, message: "Forbidden Action" },
      { status: 403 }
    );
  }
};

export const GET = async (req, { params }) => {
  const { id } = await params;
  const servicesCollection = dbConnect(collectionNames.servicesCollection);
  const service = await servicesCollection.findOne({ _id: new ObjectId(id) });
  return NextResponse.json(service);
};
