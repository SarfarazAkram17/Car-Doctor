import { authOptions } from "@/lib/authOptions";
import { collectionNames, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const session = await getServerSession(authOptions);
  if (session) {
    const email = session?.user?.email;
    const bookingsCollection = dbConnect(collectionNames.bookingsCollection);
    const result = await bookingsCollection.find({ email }).toArray();
    return NextResponse.json(result);
  }
};

export const POST = async (req) => {
  const booking = await req.json();

  const bookingsCollection = dbConnect(collectionNames.bookingsCollection);
  const result = await bookingsCollection.insertOne(booking);
  return NextResponse.json(result);
};
