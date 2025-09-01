import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/lib/models/message";

// GET → fetch all messages
export async function GET() {
  await connectDB();
  const messages = await Message.find({}).sort({ createdAt: -1 });
  return NextResponse.json(messages);
}

// POST → add new message
export async function POST(req: Request) {
  try {
    const { name, text } = await req.json();

    if (!name || !text) {
      return NextResponse.json({ error: "Name and text are required" }, { status: 400 });
    }

    await connectDB();
    const newMessage = await Message.create({ user: name, text });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

