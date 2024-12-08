import { NextRequest, NextResponse } from "next/server";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phoneNumber } = body;

    // Validate phone number
    console.log("phoneNumber", phoneNumber);
    const phoneNo = parsePhoneNumberFromString(phoneNumber, "LK");
    if (!phoneNo?.isValid()) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    const locationData = {
      location: "Colombo, Sri Lanka",
    };

    return NextResponse.json(locationData, { status: 200 });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
