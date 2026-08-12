import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

interface EnquiryRecord {
  _id: string;
  _type: string;
  name: string;
  age: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  program: string;
  status: string;
  createdAt: string;
}

// Shared in-memory store for fallback admin dashboard display
declare global {
  // eslint-disable-next-line no-var
  var globalEnquiryStore: EnquiryRecord[] | undefined;
}

if (!global.globalEnquiryStore) {
  global.globalEnquiryStore = [];
}

const enquiriesStore = global.globalEnquiryStore;

function buildGoogleCalendarUrl(data: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  program: string;
}) {
  const dateStr = data.date.replace(/-/g, "");

  let startHour = 10;
  let startMin = 0;
  let endHour = 11;
  let endMin = 0;

  if (data.time.includes("11:30 AM")) {
    startHour = 11; startMin = 30; endHour = 12; endMin = 30;
  } else if (data.time.includes("02:00 PM")) {
    startHour = 14; startMin = 0; endHour = 15; endMin = 0;
  } else if (data.time.includes("04:00 PM")) {
    startHour = 16; startMin = 0; endHour = 17; endMin = 0;
  } else if (data.time.includes("06:00 PM")) {
    startHour = 18; startMin = 0; endHour = 19; endMin = 0;
  }

  const formatTime = (h: number, m: number) =>
    `${h.toString().padStart(2, "0")}${m.toString().padStart(2, "0")}00`;

  const startFormatted = `${dateStr}T${formatTime(startHour, startMin)}`;
  const endFormatted = `${dateStr}T${formatTime(endHour, endMin)}`;
  const dates = `${startFormatted}/${endFormatted}`;

  const title = `PerpeX HR Course: ${data.name}`;
  const details = `PerpeX HR Course - Student Interview & Consultation Slot\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nProgram: ${data.program}\nPreferred Time: ${data.time}`;
  const location = `PerpeX Online / Campus`;

  const adminEmail = process.env.PERPEX_ADMIN_EMAIL || "salah.perpex@gmail.com";
  const guests = [data.email, adminEmail].filter(Boolean).join(",");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${dates}&details=${encodeURIComponent(
    details
  )}&location=${encodeURIComponent(location)}&add=${encodeURIComponent(
    guests
  )}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, age, phone, email, date, time, program } = body;

    if (!name || !phone || !email || !date) {
      return NextResponse.json(
        { error: "Required fields are missing." },
        { status: 400 }
      );
    }

    const newEnquiry = {
      _id: `enquiry-${Date.now()}`,
      _type: "enquiry",
      name,
      age: age || "N/A",
      phone,
      email,
      preferredDate: date,
      preferredTime: time || "10:00 AM - 11:00 AM",
      program: program || "Practical HR Management",
      status: "new",
      createdAt: new Date().toISOString()
    };

    // 1. Save to in-memory store
    enquiriesStore.unshift(newEnquiry);

    // 2. Try saving to Sanity CMS if write token exists
    const writeToken = process.env.SANITY_API_WRITE_TOKEN;
    if (writeToken && client.config().projectId !== "your-project-id") {
      try {
        const writeClient = client.withConfig({ token: writeToken, useCdn: false });
        await writeClient.create(newEnquiry);
      } catch (sanityErr) {
        console.warn("Sanity create failed, fallback to memory store:", sanityErr);
      }
    }

    // 3. Generate Google Calendar URL
    const calendarUrl = buildGoogleCalendarUrl({
      name,
      email,
      phone,
      date,
      time: time || "10:00 AM",
      program: program || "Practical HR Management"
    });

    return NextResponse.json({
      success: true,
      enquiryId: newEnquiry._id,
      calendarUrl
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error.";
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    enquiries: enquiriesStore
  });
}
