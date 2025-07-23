"use server";
import bcrypt from "bcrypt";
import { collectionNames, dbConnect } from "@/lib/dbConnect";

export const registerUser = async (payload) => {
  const usersCollection = dbConnect(collectionNames.usersCollection);

  const { name, email, password, photo } = payload;
  if (!name || !email || !photo || !password) {
    return null;
  }

  const user = await usersCollection.findOne({ email });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10)
    payload.password = hashedPassword
    const res = await usersCollection.insertOne(payload);
    res.insertedId = res.insertedId.toString()
    return res;
  }

  return {message: 'You already register with this account'};
};
