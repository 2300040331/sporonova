import { NextResponse } from "next/server";
import { getCMSData, saveCMSData, ContactSubmission } from "@/lib/cms-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, inquiryType, title, message } = body;

    if (!name || !email || !inquiryType || !message) {
      return NextResponse.json(
        { error: "Name, email, inquiry type, and message are required." },
        { status: 400 }
      );
    }

    const currentData = await getCMSData();
    const existingContacts = Array.isArray(currentData.contacts) ? currentData.contacts : [];

    const newSubmission: ContactSubmission = {
      id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : "",
      inquiryType: String(inquiryType).trim(),
      title: title ? String(title).trim() : String(inquiryType).trim(),
      message: String(message).trim(),
      createdAt: new Date().toISOString(),
      status: "New",
    };

    const updatedContacts = [newSubmission, ...existingContacts];
    const updatedData = { ...currentData, contacts: updatedContacts };
    await saveCMSData(updatedData);

    return NextResponse.json(
      { success: true, submission: newSubmission },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("Failed to process contact submission:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save contact submission" },
      { status: 500 }
    );
  }
}
