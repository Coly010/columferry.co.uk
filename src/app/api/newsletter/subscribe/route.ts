import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Newsletter service is not configured." },
      { status: 500 },
    );
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const email = body.email?.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const response = await fetch("https://api.buttondown.com/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_address: email }),
  });

  if (response.ok) {
    return NextResponse.json({ success: true });
  }

  if (response.status === 409) {
    return NextResponse.json({ success: true });
  }

  const errorData = await response.json().catch(() => null);
  let message = "Something went wrong. Please try again.";
  if (typeof errorData?.detail === "string") {
    message = errorData.detail;
  } else if (Array.isArray(errorData?.detail)) {
    message = errorData.detail
      .map((e: { msg?: string }) => (typeof e?.msg === "string" ? e.msg : ""))
      .filter(Boolean)
      .join(", ") || message;
  } else if (Array.isArray(errorData)) {
    message = errorData
      .map((e: { msg?: string }) => (typeof e?.msg === "string" ? e.msg : ""))
      .filter(Boolean)
      .join(", ") || message;
  }
  return NextResponse.json({ error: message }, { status: response.status });
}
