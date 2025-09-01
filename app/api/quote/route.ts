import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://zenquotes.io/api/random");
    const data = await res.json();
    const quoteObj = data[0];

    return NextResponse.json({
      content: quoteObj.q,
      author: quoteObj.a,
    });
  } catch (error) {
    console.error("Quote fetch error:", error);
    return NextResponse.json(
      { content: "Failed to fetch quote.", author: "" },
      { status: 500 }
    );
  }
}
