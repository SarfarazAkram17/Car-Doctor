import { authOptions } from "@/lib/authOptions";
import { collectionNames, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  const bookingsCollection = dbConnect(collectionNames.bookingsCollection);
  const booking = await bookingsCollection.findOne({ _id: new ObjectId(id) });

  if (session?.user?.email === booking.email) {
    return NextResponse.json(booking);
  } else {
    return NextResponse.json(
      { message: "Forbidden Update action" },
      {
        status: 403,
      }
    );
  }
};

export const PATCH = async (req, { params }) => {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  
  const bookingsCollection = dbConnect(collectionNames.bookingsCollection);
  const booking = await bookingsCollection.findOne({ _id: new ObjectId(id) });

  if (session?.user?.email === booking.email) {
    const body = await req.json();
    const updatedDoc = {
      $set: {
        address: body.address,
        phone: body.phone,
        date: body.date,
      },
    };

    const result = await bookingsCollection.updateOne(
      { _id: new ObjectId(id) },
      updatedDoc
    );
    revalidatePath("/my-bookings");
    return NextResponse.json(result);
  } else {
    return NextResponse.json(
      { message: "Forbidden Update action" },
      {
        status: 403,
      }
    );
  }
};
