import { NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import mongoose from "mongoose";

// Define a schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Create a model (check if it exists first)
const User = mongoose.models.User || mongoose.model("User", userSchema);

export async function POST(request: Request) {
  try {
    // Connect to DB
    await connect();

    // Create a new user
    const { name, email } = await request.json();
    const newUser = new User({ name, email });
    await newUser.save();

    return NextResponse.json(
      { message: "User created", data: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}