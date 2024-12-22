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

    // const locationData = {
    //   location: "Colombo, Sri Lanka",
    // };

    const locationData = createRandomLocation();

    return NextResponse.json(locationData, { status: 200 });
  } catch (error) {

    console.error("Error in API:", error);
    return NextResponse.json({ error }, { status: 400 });
    
  }
}


function createRandomLocation(){
  const latMin = 5.8; // Sri Lanka latitude range
  const latMax = 9.9;
  const lonMin = 79.7; // Sri Lanka longitude range
  const lonMax = 81.9;

  const latitude = (Math.random() * (latMax - latMin) + latMin).toFixed(6);
  const longitude = (Math.random() * (lonMax - lonMin) + lonMin).toFixed(6);

  return { latitude, longitude };
}
